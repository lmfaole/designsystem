import type { Light } from "./light"
import type { Rgb } from "./palette"

/**
 * The backdrop of a page's head: four soft pools of the picture's own colours, and a light that moves them. It is drawn only when the light changes (nothing here loops), at low resolution, since it is
 * a blur: the browser stretches it smooth. The picture itself is never drawn, only four colours taken from it, so a source whose terms forbid altering its pictures is not altered.
 */

const VERTEX = `attribute vec2 p;varying vec2 v;void main(){v=p;gl_Position=vec4(p,0.,1.);}`

const FRAGMENT = `precision mediump float;
varying vec2 v;
uniform vec3 c0;uniform vec3 c1;uniform vec3 c2;uniform vec3 c3;
uniform vec2 light;
uniform float aspect;
void main(){
  vec2 uv=vec2(v.x*aspect,v.y)*.5+vec2(aspect*.5,.5);
  vec2 s=vec2(light.x,-light.y);
  vec2 p0=vec2(aspect*.12,.85)+s*vec2(.14,.1);
  vec2 p1=vec2(aspect*.88,.78)-s*vec2(.12,.1);
  vec2 p2=vec2(aspect*.22,.18)-s*vec2(.1,.12);
  vec2 p3=vec2(aspect*.8,.2)+s*vec2(.12,.12);
  float w0=exp(-dot(uv-p0,uv-p0)*(3.2/aspect));
  float w1=exp(-dot(uv-p1,uv-p1)*(3.2/aspect));
  float w2=exp(-dot(uv-p2,uv-p2)*(3.2/aspect));
  float w3=exp(-dot(uv-p3,uv-p3)*(3.2/aspect));
  vec3 col=(c0*w0+c1*w1+c2*w2+c3*w3)/(w0+w1+w2+w3+1e-4);
  vec2 lp=vec2(aspect*.5,.5)+s*vec2(aspect*.42,.4);
  col+=exp(-dot(uv-lp,uv-lp)*(7./aspect))*.16;
  float g=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453);
  col+=(g-.5)/128.;
  gl_FragColor=vec4(col,1.);
}`

export interface AmbientRenderer {
  draw(light: Light): void
  /** Sets the size of the drawing in pixels (the page stretches it to the size of the head). */
  resize(width: number, height: number): void
  dispose(): void
}

function compile(gl: WebGLRenderingContext, kind: number, source: string): WebGLShader | null {
  const shader = gl.createShader(kind)
  if (shader === null) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) === true ? shader : null
}

/** A renderer for the canvas with the four colours, or `null` where WebGL is not there. */
export function createAmbientRenderer(canvas: HTMLCanvasElement, palette: readonly [Rgb, Rgb, Rgb, Rgb]): AmbientRenderer | null {
  const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" })
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
  palette.forEach(([r, g, b], index) => gl.uniform3f(gl.getUniformLocation(program, `c${index}`), r / 255, g / 255, b / 255))
  const lightAt = gl.getUniformLocation(program, "light")
  const aspectAt = gl.getUniformLocation(program, "aspect")
  return {
    draw(light) {
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(lightAt, light.x, light.y)
      gl.uniform1f(aspectAt, canvas.width / Math.max(1, canvas.height))
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    },
    resize(width, height) {
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
    },
    dispose() {
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    },
  }
}
