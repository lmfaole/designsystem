import type { Light } from "./light"
import { type Mat4, multiply, perspective, rotationPart, rotationX, rotationY, translation } from "./mat4"
import type { Rgb } from "./palette"

/**
 * An album's sleeve in 3D: a thin slab of plastic-wrapped cover with a record pulled half out of it, that tilts toward the page's light (`lib/light.ts`) and catches it. The cover is whole and upright on the
 * front face, with the plastic's glint moving across it as the angle changes, because a viewer at a point sees a flat shiny face lit differently across it. The record is plain black vinyl with a label of the
 * cover's own colour and the same two bands of reflected light as the disc. A box, a quad, one texture: no library. Drawn when the light changes and at no other time, so nothing loops.
 */

/** The scene is 1.46 wide and 1 high: a sleeve of 1 and a record of 0.92 with half of it out. */
export const SLEEVE_ASPECT = 1.46

const SLEEVE_VERTEX = `attribute vec3 p;attribute vec3 n;attribute vec2 t;attribute float f;
uniform mat4 mvp;uniform mat4 model;uniform mat3 rot;
varying vec3 vN;varying vec3 vW;varying vec2 vT;varying float vF;
void main(){vN=rot*n;vW=(model*vec4(p,1.)).xyz;vT=t;vF=f;gl_Position=mvp*vec4(p,1.);}`

const SLEEVE_FRAGMENT = `precision highp float;
varying vec3 vN;varying vec3 vW;varying vec2 vT;varying float vF;
uniform sampler2D cover;uniform vec2 light;
void main(){
  vec3 N=normalize(vN);
  vec3 L=normalize(vec3(light.x,-light.y,1.2));
  vec3 V=normalize(vec3(0.,0.,3.)-vW);
  vec3 H=normalize(L+V);
  float nh=max(dot(N,H),0.);
  vec3 base=vF>.5?texture2D(cover,vT).rgb:vec3(.5,.48,.44);
  float edge=min(min(vT.x,1.-vT.x),min(vT.y,1.-vT.y));
  vec3 col=base*(.62+.38*max(dot(N,L),0.));
  if(vF>.5){
    col*=.8+.2*smoothstep(0.,.03,edge);
    // The plastic's gleam is light on top of the cover, so it shows less on pale art than on dark (a pale cover has no more to give).
    float lum=dot(base,vec3(.299,.587,.114));
    col+=(pow(nh,120.)*.42+pow(nh,14.)*.07)*(1.-.65*lum);
  }
  gl_FragColor=vec4(col,1.);
}`

const DISC_VERTEX = `attribute vec2 p;uniform mat4 mvp;varying vec2 v;void main(){v=p;gl_Position=mvp*vec4(p,0.,1.);}`

const DISC_FRAGMENT = `precision highp float;
varying vec2 v;uniform vec3 label;uniform vec2 light;
vec3 hue(float h){return clamp(abs(mod(h*6.+vec3(0.,4.,2.),6.)-3.)-1.,0.,1.);}
void main(){
  float r=length(v);
  float edge=1.-smoothstep(.975,1.,r);
  if(edge<=0.){gl_FragColor=vec4(0.);return;}
  float a=atan(v.y,v.x);
  float la=a-atan(-light.y,light.x);
  vec3 col=vec3(.045)+(.5+.5*sin(r*340.))*.02*smoothstep(.36,.46,r);
  if(r<.34){col=label*(.85+.15*cos(2.*a));if(r<.05)col=vec3(.02);}
  float wedge=pow(max(cos(2.*la),0.),12.)*(.25+.75*max(cos(la),0.));
  float fall=smoothstep(.34,.55,r)*(1.-.25*smoothstep(.85,1.,r));
  vec3 rain=hue(fract(r*2.4+dot(light,vec2(.3,.2))));
  col+=wedge*fall*(.5+.6*rain)*.9;
  col*=1.-.3*smoothstep(.93,1.,r);
  gl_FragColor=vec4(col*edge,edge);
}`

export interface SleeveRenderer {
  draw(light: Light): void
  /** Sets the size of the drawing in device pixels (the width is `SLEEVE_ASPECT` times the height). */
  resize(height: number): void
  dispose(): void
}

function compile(gl: WebGLRenderingContext, kind: number, source: string): WebGLShader | null {
  const shader = gl.createShader(kind)
  if (shader === null) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) === true ? shader : null
}

function program(gl: WebGLRenderingContext, vertex: string, fragment: string): WebGLProgram | null {
  const [v, f, p] = [compile(gl, gl.VERTEX_SHADER, vertex), compile(gl, gl.FRAGMENT_SHADER, fragment), gl.createProgram()]
  if (v === null || f === null || p === null) return null
  gl.attachShader(p, v)
  gl.attachShader(p, f)
  gl.linkProgram(p)
  return gl.getProgramParameter(p, gl.LINK_STATUS) === true ? p : null
}

/** The slab: 24 vertices of position, normal, texture coordinate and «front» (1 for the face the cover is on), and the triangles of its six faces. */
function slab(depth: number): { vertices: Float32Array; indices: Uint16Array } {
  const [hw, hh, hd] = [0.5, 0.5, depth / 2]
  const faces: { n: [number, number, number]; corners: [number, number, number][]; front: number }[] = [
    { n: [0, 0, 1], corners: [[-hw, -hh, hd], [hw, -hh, hd], [hw, hh, hd], [-hw, hh, hd]], front: 1 },
    { n: [0, 0, -1], corners: [[hw, -hh, -hd], [-hw, -hh, -hd], [-hw, hh, -hd], [hw, hh, -hd]], front: 0 },
    { n: [1, 0, 0], corners: [[hw, -hh, hd], [hw, -hh, -hd], [hw, hh, -hd], [hw, hh, hd]], front: 0 },
    { n: [-1, 0, 0], corners: [[-hw, -hh, -hd], [-hw, -hh, hd], [-hw, hh, hd], [-hw, hh, -hd]], front: 0 },
    { n: [0, 1, 0], corners: [[-hw, hh, hd], [hw, hh, hd], [hw, hh, -hd], [-hw, hh, -hd]], front: 0 },
    { n: [0, -1, 0], corners: [[-hw, -hh, -hd], [hw, -hh, -hd], [hw, -hh, hd], [-hw, -hh, hd]], front: 0 },
  ]
  const uvs: [number, number][] = [[0, 1], [1, 1], [1, 0], [0, 0]]
  const vertices: number[] = []
  const indices: number[] = []
  faces.forEach((face, index) => {
    face.corners.forEach((corner, at) => vertices.push(...corner, ...face.n, ...(uvs[at] ?? [0, 0]), face.front))
    const first = index * 4
    indices.push(first, first + 1, first + 2, first, first + 2, first + 3)
  })
  return { vertices: new Float32Array(vertices), indices: new Uint16Array(indices) }
}

const scaling = (s: number): Mat4 => new Float32Array([s, 0, 0, 0, 0, s, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])

/** How far the scene tilts toward the light, in radians for a light at the edge of the screen. */
const TILT = { y: 0.34, x: 0.24 }

/** A renderer for the canvas with the cover on the sleeve and the record's label in `label`, or `null` where WebGL is not there or the cover may not be read (no CORS). */
export function createSleeveRenderer(canvas: HTMLCanvasElement, cover: TexImageSource, label: Rgb): SleeveRenderer | null {
  const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: true, powerPreference: "low-power" })
  if (gl === null) return null
  const sleeve = program(gl, SLEEVE_VERTEX, SLEEVE_FRAGMENT)
  const disc = program(gl, DISC_VERTEX, DISC_FRAGMENT)
  if (sleeve === null || disc === null) return null
  const { vertices, indices } = slab(0.07)
  const vertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
  const indexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)
  const quad = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, quad)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
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
  const at = (p: WebGLProgram, name: string) => gl.getUniformLocation(p, name)
  const sleeveUniforms = { mvp: at(sleeve, "mvp"), model: at(sleeve, "model"), rot: at(sleeve, "rot"), light: at(sleeve, "light"), cover: at(sleeve, "cover") }
  const discUniforms = { mvp: at(disc, "mvp"), label: at(disc, "label"), light: at(disc, "light") }
  const camera = multiply(perspective((22.5 * Math.PI) / 180, SLEEVE_ASPECT, 0.5, 10), translation(0, 0, -3))
  gl.enable(gl.DEPTH_TEST)
  gl.clearColor(0, 0, 0, 0)
  return {
    draw(light) {
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      // The scene turns about its middle toward the light: the right side comes forward when the light is to the right.
      const turn = multiply(rotationY(light.x * TILT.y), rotationX(light.y * TILT.x))
      const group = multiply(turn, translation(-0.23, 0, 0))
      const lightForShader: [number, number] = [light.x, light.y]
      // The record first, behind: its half inside the sleeve is hidden by the sleeve's front by depth.
      gl.useProgram(disc)
      gl.bindBuffer(gl.ARRAY_BUFFER, quad)
      const discPosition = gl.getAttribLocation(disc, "p")
      gl.enableVertexAttribArray(discPosition)
      gl.vertexAttribPointer(discPosition, 2, gl.FLOAT, false, 0, 0)
      gl.uniformMatrix4fv(discUniforms.mvp, false, multiply(camera, multiply(group, multiply(translation(0.5, 0, 0), scaling(0.46)))))
      gl.uniform3f(discUniforms.label, label[0] / 255, label[1] / 255, label[2] / 255)
      gl.uniform2f(discUniforms.light, lightForShader[0], lightForShader[1])
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      gl.useProgram(sleeve)
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
      const stride = 9 * 4
      for (const [name, size, offset] of [["p", 3, 0], ["n", 3, 3], ["t", 2, 6], ["f", 1, 8]] as const) {
        const location = gl.getAttribLocation(sleeve, name)
        gl.enableVertexAttribArray(location)
        gl.vertexAttribPointer(location, size, gl.FLOAT, false, stride, offset * 4)
      }
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.uniform1i(sleeveUniforms.cover, 0)
      gl.uniformMatrix4fv(sleeveUniforms.mvp, false, multiply(camera, group))
      gl.uniformMatrix4fv(sleeveUniforms.model, false, group)
      gl.uniformMatrix3fv(sleeveUniforms.rot, false, rotationPart(group))
      gl.uniform2f(sleeveUniforms.light, lightForShader[0], lightForShader[1])
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0)
    },
    resize(height) {
      const width = Math.round(height * SLEEVE_ASPECT)
      if (canvas.height !== height || canvas.width !== width) {
        canvas.height = height
        canvas.width = width
      }
    },
    dispose() {
      gl.deleteTexture(texture)
      gl.deleteBuffer(vertexBuffer)
      gl.deleteBuffer(indexBuffer)
      gl.deleteBuffer(quad)
      gl.deleteProgram(sleeve)
      gl.deleteProgram(disc)
    },
  }
}
