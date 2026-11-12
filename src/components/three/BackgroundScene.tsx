"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme, type Theme } from "@/components/providers/theme";

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Inputs {
  pointer: { x: number; y: number };
  scroll: number;
  reduced: boolean;
}

const particleVertex = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute float aKind;
  uniform vec3 uCyan;
  uniform vec3 uOrange;
  uniform vec3 uWhite;
  uniform float uTime;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float tw = 0.65 + 0.35 * sin(uTime * 1.4 + aPhase);
    gl_PointSize = aSize * uPixelRatio * tw * (60.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
    vColor = aKind < 0.5 ? uCyan : aKind < 1.5 ? uOrange : uWhite;
    vAlpha = tw * smoothstep(120.0, 20.0, -mv.z);
  }
`;

const particleFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  uniform float uAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    gl_FragColor = vec4(vColor, a * vAlpha * uAlpha);
  }
`;

function Particles({ count, inputs, theme }: { count: number; inputs: Inputs; theme: Theme }) {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const gl = useThree((s) => s.gl);

  const geometry = useMemo(() => {
    const rnd = mulberry32(1337);
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const phase = new Float32Array(count);
    const kind = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rnd() - 0.5) * 70;
      pos[i * 3 + 1] = (rnd() - 0.2) * 40;
      pos[i * 3 + 2] = -rnd() * 70 + 8;
      size[i] = 0.6 + rnd() * 1.8;
      phase[i] = rnd() * Math.PI * 2;
      const r = rnd();
      kind[i] = r < 0.55 ? 0 : r < 0.65 ? 1 : 2;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    g.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));
    g.setAttribute("aKind", new THREE.BufferAttribute(kind, 1));
    return g;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
      uCyan: { value: new THREE.Color("#22d3ee") },
      uOrange: { value: new THREE.Color("#fb923c") },
      uWhite: { value: new THREE.Color("#e6edf9") },
      uAlpha: { value: 1 },
    }),
    [],
  );

  useEffect(() => {
    const light = theme === "light";
    if (matRef.current) {
      const u = matRef.current.uniforms;
      u.uCyan.value.set(light ? "#0891b2" : "#22d3ee");
      u.uOrange.value.set(light ? "#ea580c" : "#fb923c");
      u.uWhite.value.set(light ? "#64748b" : "#e6edf9");
      u.uAlpha.value = light ? 0.7 : 1;
      matRef.current.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
      matRef.current.needsUpdate = true;
    }
  }, [theme]);

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = inputs.reduced
        ? 0
        : state.clock.elapsedTime;
      matRef.current.uniforms.uPixelRatio.value = gl.getPixelRatio();
    }
    if (ref.current && !inputs.reduced) {
      ref.current.rotation.y = inputs.scroll * 0.6 + state.clock.elapsedTime * 0.01;
      ref.current.rotation.x = inputs.scroll * 0.15;
    }
  });

  return (
    <points ref={ref} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        vertexShader={particleVertex}
        fragmentShader={particleFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

const gridVertex = /* glsl */ `
  varying vec3 vWorld;
  void main() {
    vec4 w = modelMatrix * vec4(position, 1.0);
    vWorld = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;

const gridFragment = /* glsl */ `
  varying vec3 vWorld;
  uniform vec3 uColor;
  uniform vec3 uCamPos;
  uniform float uTime;
  uniform float uLight;
  uniform float uIntensity;
  float gridLine(vec2 p, float size) {
    vec2 g = abs(fract(p / size - 0.5) - 0.5) / fwidth(p / size);
    return 1.0 - min(min(g.x, g.y), 1.0);
  }
  void main() {
    vec2 p = vWorld.xz + vec2(0.0, uTime * 0.6);
    float line = gridLine(p, 2.0) * 0.9 + gridLine(p, 10.0) * 0.6;
    float dist = distance(vWorld.xz, uCamPos.xz);
    float fade = 1.0 - smoothstep(10.0, 55.0, dist);
    gl_FragColor = vec4(uLight > 0.5 ? uColor : uColor * line, line * fade * uIntensity);
  }
`;

function GridFloor({ inputs, theme }: { inputs: Inputs; theme: Theme }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color("#22d3ee") },
      uCamPos: { value: new THREE.Vector3() },
      uTime: { value: 0 },
      uLight: { value: 0 },
      uIntensity: { value: 0.55 },
    }),
    [],
  );
  useEffect(() => {
    const light = theme === "light";
    if (matRef.current) {
      const u = matRef.current.uniforms;
      u.uColor.value.set(light ? "#0e7490" : "#22d3ee");
      u.uLight.value = light ? 1 : 0;
      u.uIntensity.value = light ? 0.3 : 0.55;
      matRef.current.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
      matRef.current.needsUpdate = true;
    }
  }, [theme]);
  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uCamPos.value.copy(state.camera.position);
    matRef.current.uniforms.uTime.value = inputs.reduced
      ? 0
      : state.clock.elapsedTime;
  });
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -6, -20]} frustumCulled={false}>
      <planeGeometry args={[200, 200]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={gridVertex}
        fragmentShader={gridFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function Shapes({ inputs, theme }: { inputs: Inputs; theme: Theme }) {
  const light = theme === "light";
  const ico = useRef<THREE.Mesh>(null);
  const knot = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (inputs.reduced) return;
    if (ico.current) {
      ico.current.rotation.x += dt * 0.12;
      ico.current.rotation.y += dt * 0.18;
    }
    if (knot.current) {
      knot.current.rotation.x -= dt * 0.1;
      knot.current.rotation.z += dt * 0.14;
    }
  });
  return (
    <>
      <mesh ref={ico} position={[-17, 3, -26]}>
        <icosahedronGeometry args={[3.2, 1]} />
        <meshBasicMaterial color={light ? "#0e7490" : "#22d3ee"} wireframe transparent opacity={light ? 0.1 : 0.18} />
      </mesh>
      <mesh position={[-17, 3, -26]} scale={0.98}>
        <icosahedronGeometry args={[3.2, 1]} />
        <meshBasicMaterial color={light ? "#0e7490" : "#22d3ee"} transparent opacity={light ? 0.03 : 0.04} />
      </mesh>
      <mesh ref={knot} position={[19, 4, -32]}>
        <torusKnotGeometry args={[2.6, 0.7, 140, 16]} />
        <meshBasicMaterial color={light ? "#c2410c" : "#fb923c"} wireframe transparent opacity={light ? 0.07 : 0.14} />
      </mesh>
    </>
  );
}

function Rig({ inputs }: { inputs: Inputs }) {
  const cur = useRef({ x: 0, y: 0, s: 0 });
  useFrame((state, dt) => {
    const k = 1 - Math.exp(-dt * 3);
    cur.current.x += (inputs.pointer.x - cur.current.x) * k;
    cur.current.y += (inputs.pointer.y - cur.current.y) * k;
    const target = inputs.reduced ? 0 : inputs.scroll;
    cur.current.s += (target - cur.current.s) * (1 - Math.exp(-dt * 4));
    const s = cur.current.s;
    const cam = state.camera;
    cam.position.set(
      cur.current.x * 1.2,
      2 - s * 5 + cur.current.y * 0.8,
      12 - s * 14,
    );
    cam.lookAt(cur.current.x * 0.6, 0.5 - s * 3, -20 - s * 10);
  });
  return null;
}

const inputs: Inputs = { pointer: { x: 0, y: 0 }, scroll: 0, reduced: false };

function Fog({ theme }: { theme: Theme }) {
  const scene = useThree((s) => s.scene);
  useEffect(() => {
    if (scene.fog) scene.fog.color.set(theme === "light" ? "#f3f6fc" : "#050a18");
  }, [scene, theme]);
  return <fog attach="fog" args={["#050a18", 25, 80]} />;
}

export default function BackgroundScene() {
  const theme = useTheme();
  // Scene is client-only (dynamic ssr:false), so window is available here.
  const [count] = useState(() => (window.innerWidth < 768 ? 1200 : 3500));

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      inputs.reduced = mq.matches;
    };
    syncMotion();
    mq.addEventListener("change", syncMotion);

    const onMove = (e: PointerEvent) => {
      if (inputs.reduced) return;
      inputs.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      inputs.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      inputs.scroll = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    };
    onScroll();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      mq.removeEventListener("change", syncMotion);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 2, 12], fov: 60, near: 0.1, far: 150 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Fog theme={theme} />
      <Rig inputs={inputs} />
      <GridFloor inputs={inputs} theme={theme} />
      <Particles count={count} inputs={inputs} theme={theme} />
      <Shapes inputs={inputs} theme={theme} />
    </Canvas>
  );
}
