const VERTEX = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`

const fragment = (octaves) => `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < ${octaves}; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec2 m = (uPointer - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  vec2 toM = p - m;
  p += toM * 0.35 * exp(-dot(toM, toM) * 5.0);

  float t = uTime;
  vec2 q = vec2(
    fbm(p * 1.5 + vec2(0.0, t * 0.45)),
    fbm(p * 1.5 + vec2(5.2, -t * 0.38))
  );
  vec2 r = vec2(
    fbm(p * 1.7 + 3.2 * q + vec2(1.7, 9.2) + t * 0.6),
    fbm(p * 1.7 + 3.2 * q + vec2(8.3, 2.8) - t * 0.52)
  );
  float f = fbm(p * 1.3 + 2.6 * r);

  vec3 navy = vec3(0.02, 0.03, 0.09);
  vec3 blue = vec3(0.09, 0.24, 1.0);
  vec3 cyan = vec3(0.24, 0.88, 1.0);
  vec3 magenta = vec3(1.0, 0.16, 0.78);

  float pulse = 0.5 + 0.5 * sin(t * 0.9);
  vec3 col = mix(navy, blue, smoothstep(0.2, 0.75, f));
  col = mix(col, magenta, smoothstep(0.5, 0.95, r.x) * (0.55 + 0.4 * pulse));
  col = mix(col, cyan, smoothstep(0.35, 0.8, q.y * f * 1.9));
  col *= 0.55 + 0.75 * f;

  float glow = exp(-dot(toM, toM) * 9.0);
  col += cyan * glow * 0.18;

  vec2 vc = (uv - vec2(0.64, 0.5)) * vec2(1.25, 1.0);
  col *= mix(0.2, 1.0, smoothstep(1.0, 0.2, length(vc)));
  col *= mix(0.4, 1.0, smoothstep(0.0, 0.6, uv.x));

  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export default function neonWarp({ canvas, mobile }) {
  const gl = canvas.getContext("webgl", { antialias: false, depth: false, alpha: false })
  if (!gl) return null

  const vs = compile(gl, gl.VERTEX_SHADER, VERTEX)
  const fs = compile(gl, gl.FRAGMENT_SHADER, fragment(mobile ? 3 : 5))
  if (!vs || !fs) return null
  const program = gl.createProgram()
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null
  gl.useProgram(program)

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const aPos = gl.getAttribLocation(program, "aPos")
  gl.enableVertexAttribArray(aPos)
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

  const uRes = gl.getUniformLocation(program, "uRes")
  const uTime = gl.getUniformLocation(program, "uTime")
  const uPointer = gl.getUniformLocation(program, "uPointer")

  let time = 7
  let mx = 0.72
  let my = 0.5

  const render = () => {
    gl.uniform1f(uTime, time)
    gl.uniform2f(uPointer, mx, my)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  return {
    maxDpr: mobile ? 0.75 : 1.25,
    resize() {
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    },
    frame(t, dt, input) {
      time += dt * (1 + Math.min(3, Math.abs(input.scrollVel) * 0.03))
      const tx = input.active ? input.x : 0.72 + 0.1 * Math.sin(t * 0.4)
      const ty = input.active ? 1 - input.y : 0.5 + 0.18 * Math.cos(t * 0.33)
      const ease = Math.min(1, dt * 4)
      mx += (tx - mx) * ease
      my += (ty - my) * ease
      render()
    },
    still() {
      time = 11
      render()
    },
    destroy() {
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    },
  }
}
