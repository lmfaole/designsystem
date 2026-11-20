import type { Light } from "./light"
import type { CoverTraits } from "./palette"

/**
 * The shader of a record: the cover turns with the disc, and the light stays where it is. The grooves are round, so a reflection does not turn with the disc: it stands in two
 * opposite bands on the line from the light through the middle, with the spectrum spread along the radius, and it moves when the light does (`lib/light.ts`). A fine ring of grooves,
 * a dark hole in the middle and a soft edge. No library: a quad, one texture, a few uniforms.
 */

const VERTEX = `attribute vec2 p;varying vec2 v;void main(){v=p;gl_Position=vec4(p,0.,1.);}`

const FRAGMENT = `precision highp float;
varying vec2 v;
uniform sampler2D cover;
uniform float turn;
uniform vec2 light;
uniform vec3 trait;
vec3 hue(float h){return clamp(abs(mod(h*6.+vec3(0.,4.,2.),6.)-3.)-1.,0.,1.);}
void main(){
  float r=length(v);
  float edge=1.-smoothstep(.975,1.,r);
  if(edge<=0.||r<.22){gl_FragColor=vec4(0.);return;}
  float a=atan(v.y,v.x);
  float c=cos(turn),s=sin(turn);
  vec2 q=mat2(c,-s,s,c)*v;
  vec3 col=texture2D(cover,vec2(q.x*.5+.5,.5-q.y*.5)).rgb;
  float la=a-atan(light.y,light.x);
  float lum=dot(col,vec3(.299,.587,.114));
  float power=mix(.6,1.,min(length(light),1.));
  // The cover shapes what its reflections do: a vivid cover gives tighter bands, a dark one shines and a bright one washes out, and its hue sets where the spectrum starts and how much of the cover's own colour is in it.
  float wedge=pow(max(cos(2.*la),0.),mix(9.,20.,trait.y))*(.25+.75*max(cos(la),0.));
  float fall=smoothstep(.22,.5,r)*(1.-.3*smoothstep(.8,1.,r));
  float gloss=mix(1.3,.55,smoothstep(.15,.85,lum));
  vec3 rain=hue(fract(r*2.2+trait.x+dot(light,vec2(.3,.2))+.15*sin(2.*la)));
  rain=mix(rain,clamp(col/max(max(col.r,max(col.g,col.b)),.2),0.,1.),.45*trait.y);
  vec3 outc=col*(.86+.14*cos(2.*la));
  outc+=wedge*fall*power*gloss*(.55+.5*rain);
  outc+=rain*pow(max(cos(2.*la),0.),5.)*.16*fall*power*gloss;
  outc+=(.014+.03*(1.-lum))*sin(r*260.)*fall;
  outc*=1.-.22*smoothstep(.93,1.,r);
  outc*=1.-.5*(1.-smoothstep(.22,.26,r));
  gl_FragColor=vec4(outc*edge,edge);
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

/** A renderer for the canvas with the cover as its texture (and what the cover is like, `coverTraits`, which shapes its reflections), or `null` where WebGL is not there, the shader does not compile, or the picture may not be read (no CORS). */
export function createDiscRenderer(canvas: HTMLCanvasElement, cover: TexImageSource, traits: CoverTraits): DiscRenderer | null {
  const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: "low-power" })
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
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
  const position = gl.getAttribLocation(program, "p")
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
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
  const turnAt = gl.getUniformLocation(program, "turn")
  const lightAt = gl.getUniformLocation(program, "light")
  gl.uniform3f(gl.getUniformLocation(program, "trait"), traits.hue, traits.saturation, traits.lightness)
  gl.clearColor(0, 0, 0, 0)
  return {
    draw(turn, light) {
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(turnAt, turn)
      // The light's y runs down the screen, the shader's up.
      gl.uniform2f(lightAt, light.x, -light.y)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    },
    resize(pixels) {
      if (canvas.width !== pixels || canvas.height !== pixels) {
        canvas.width = pixels
        canvas.height = pixels
      }
    },
    dispose() {
      gl.deleteTexture(texture)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    },
  }
}
