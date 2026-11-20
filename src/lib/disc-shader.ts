import { discMesh } from "./disc-geometry"
import type { Light } from "./light"
import { type Mat4, multiply, perspective, rotationPart, rotationX, rotationY, translation } from "./mat4"
import type { CoverTraits } from "./palette"

/**
 * A record, in 3D: a face with the cover printed on it, a thick edge that catches light and a deep hole (`lib/disc-geometry.ts`), seen from a little above and tilted a little toward the page's light, so that the edge shows.
 * The cover turns with the disc and the light does not: the grooves are round, so a reflection does not turn with the disc. Two things are reflected. The grooves reflect the light in two opposite bands with the spectrum
 * spread along them (anisotropic: the bands stand where the reflection is across the grooves, so they move with the light and with the angle, as on a real disc). And the surface reflects a studio around it (the light itself,
 * a soft box, a cool sky over a dark floor), more at a glancing angle (Fresnel), so the face, the edge and the wall of the hole shine as lacquer and chrome do. The cover shapes it: a vivid cover gives tighter bands, a dark
 * one shines and a pale one washes out, and its hue sets where the spectrum starts. A mesh, one program, one texture: no library.
 */

const VERTEX = `attribute vec3 p;attribute vec3 n;attribute vec2 t;attribute float k;
uniform mat4 mvp;uniform mat4 model;uniform mat3 rot;
varying vec3 vW;varying vec3 vN;varying vec2 vT;varying float vK;
void main(){vW=(model*vec4(p,1.)).xyz;vN=rot*n;vT=t;vK=k;gl_Position=mvp*vec4(p,1.);}`

const FRAGMENT = `precision highp float;
varying vec3 vW;varying vec3 vN;varying vec2 vT;varying float vK;
uniform sampler2D cover;uniform float turn;uniform vec3 light;uniform vec3 trait;uniform vec3 cam;
vec3 hue(float h){return clamp(abs(mod(h*6.+vec3(0.,4.,2.),6.)-3.)-1.,0.,1.);}
// The studio around the record: a cool sky over a dark floor, the light itself, a soft glow round it and a strip softbox to the right.
vec3 env(vec3 d){
  vec3 c=mix(vec3(.025,.028,.035),vec3(.30,.34,.42),smoothstep(-.35,.85,d.y));
  float k=max(dot(d,light),0.);
  c+=vec3(1.,.97,.9)*pow(k,70.)*1.7+vec3(.9,.92,1.)*pow(k,6.)*.16;
  c+=vec3(.6,.7,1.)*smoothstep(.86,.97,dot(d,normalize(vec3(.9,.25,.5))))*.45;
  return c;
}
void main(){
  vec3 N=normalize(vN);
  vec3 V=normalize(cam-vW);
  vec3 H=normalize(light+V);
  float fres=.05+.95*pow(1.-max(dot(N,V),0.),5.);
  if(vK>1.5){
    gl_FragColor=vec4(vec3(.03)+env(reflect(-V,N))*.12,1.);
    return;
  }
  if(vK>.5){
    // The edge: lacquer over chrome, a bright catch-light where it faces the light.
    vec3 c=vec3(.07)+env(reflect(-V,N))*.95+pow(max(dot(N,H),0.),24.)*.8;
    gl_FragColor=vec4(c*(.75+.25*fres*4.),1.);
    return;
  }
  float r=length(vT);
  float c0=cos(turn),s0=sin(turn);
  vec2 q=mat2(c0,-s0,s0,c0)*vT;
  vec3 col=texture2D(cover,vec2(q.x*.5+.5,.5-q.y*.5)).rgb;
  float lum=dot(col,vec3(.299,.587,.114));
  float gloss=mix(1.3,.55,smoothstep(.15,.85,lum));
  float fall=smoothstep(.3,.5,r)*(1.-.25*smoothstep(.8,1.,r));
  // The grooves are round: their direction at a point is across the radius. The reflection is bright where the half vector lies along the radius.
  vec3 radial=normalize(vec3(vT,0.));
  vec3 T=normalize(cross(N,vec3(radial.xy,0.)));
  float th=dot(T,H);
  float aniso=pow(sqrt(max(1.-th*th,0.)),mix(16.,44.,trait.y));
  float side=.25+.75*max(dot(radial.xy,normalize(light.xy+1e-4)),0.);
  vec3 rain=hue(fract(r*2.2+trait.x+th*.4));
  rain=mix(rain,clamp(col/max(max(col.r,max(col.g,col.b)),.2),0.,1.),.45*trait.y);
  vec3 outc=col*(.84+.16*max(dot(N,light),0.));
  outc+=aniso*side*fall*gloss*(.5+.5*rain)*.95;
  // Lacquer: the studio in the face, strongest at a glancing angle, and not on the printed label.
  float lacquer=smoothstep(.3,.42,r);
  outc+=env(reflect(-V,N))*(.04+fres*.32)*gloss*lacquer*(1.-.45*lum);
  outc+=(.014+.03*(1.-lum))*sin(r*340.)*fall;
  // The chamfer where the face meets the edge catches a thin line of light.
  outc+=smoothstep(.955,.99,r)*(.12+.5*max(dot(radial.xy,normalize(light.xy+1e-4)),0.));
  gl_FragColor=vec4(outc,1.);
}`

export interface DiscRenderer {
  /** Draws one frame: the disc turned `turn` radians, lit from `light`. */
  draw(turn: number, light: Light): void
  /** Sets the size of the drawing, in device pixels. */
  resize(pixels: number): void
  dispose(): void
}

function compile(gl: WebGLRenderingContext, kind: number, source: string): WebGLShader | null {
  const shader = gl.createShader(kind)
  if (shader === null) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) === true ? shader : null
}

/** How far the record is seen from above when the light is in the middle, and how far it tilts toward the light at the edge of the screen, in radians: enough that its edge shows, never enough to make it an ellipse. */
const VIEW = { above: 0.15, towardX: 0.17, towardY: 0.13 }
const DISTANCE = 6.6

/** A renderer for the canvas with the cover as its texture (and what the cover is like, `coverTraits`, which shapes its reflections), or `null` where WebGL is not there, the shader does not compile, or the picture may not be read (no CORS). */
export function createDiscRenderer(canvas: HTMLCanvasElement, cover: TexImageSource, traits: CoverTraits): DiscRenderer | null {
  const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: true, powerPreference: "low-power" })
  if (gl === null) return null
  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX)
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT)
  const program = gl.createProgram()
  if (vertex === null || fragment === null || program === null) return null
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  if (gl.getProgramParameter(program, gl.LINK_STATUS) !== true) return null
  gl.useProgram(program)
  const { vertices, indices } = discMesh()
  const vertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
  const indexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)
  const stride = 9 * 4
  for (const [name, size, offset] of [["p", 3, 0], ["n", 3, 3], ["t", 2, 6], ["k", 1, 8]] as const) {
    const location = gl.getAttribLocation(program, name)
    gl.enableVertexAttribArray(location)
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, stride, offset * 4)
  }
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  try {
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cover)
  } catch {
    return null
  }
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  const at = (name: string) => gl.getUniformLocation(program, name)
  const [mvpAt, modelAt, rotAt, turnAt, lightAt, traitAt, camAt, coverAt] = ["mvp", "model", "rot", "turn", "light", "trait", "cam", "cover"].map(at)
  gl.uniform3f(traitAt ?? null, traits.hue, traits.saturation, traits.lightness)
  gl.uniform3f(camAt ?? null, 0, 0, DISTANCE)
  gl.uniform1i(coverAt ?? null, 0)
  const camera = multiply(perspective((17 * Math.PI) / 180, 1, 1, 20), translation(0, 0, -DISTANCE))
  gl.enable(gl.DEPTH_TEST)
  gl.clearColor(0, 0, 0, 0)
  return {
    draw(turn, light) {
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      // The record is seen a little from above and tilts toward the light: the light's y runs down the screen, the scene's up.
      const model = multiply(rotationY(light.x * VIEW.towardX), rotationX(VIEW.above - light.y * VIEW.towardY))
      const toLight = [light.x, -light.y, 1.2]
      const length = Math.hypot(toLight[0] ?? 0, toLight[1] ?? 0, toLight[2] ?? 0)
      gl.uniformMatrix4fv(mvpAt ?? null, false, multiply(camera, model) satisfies Mat4)
      gl.uniformMatrix4fv(modelAt ?? null, false, model)
      gl.uniformMatrix3fv(rotAt ?? null, false, rotationPart(model))
      gl.uniform1f(turnAt ?? null, turn)
      gl.uniform3f(lightAt ?? null, (toLight[0] ?? 0) / length, (toLight[1] ?? 0) / length, (toLight[2] ?? 0) / length)
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0)
    },
    resize(pixels) {
      if (canvas.width !== pixels || canvas.height !== pixels) {
        canvas.width = pixels
        canvas.height = pixels
      }
    },
    dispose() {
      gl.deleteTexture(texture)
      gl.deleteBuffer(vertexBuffer)
      gl.deleteBuffer(indexBuffer)
      gl.deleteProgram(program)
    },
  }
}
