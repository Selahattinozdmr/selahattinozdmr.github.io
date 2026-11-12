"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { allSkills } from "@/content/skills";
import { useTheme, type Theme } from "@/components/providers/theme";

const RADIUS = 3;
const CYAN = "#22d3ee";
const ORANGE = "#fb923c";
const WHITE = "#e6edf9";

function fibonacciSphere(n: number, r: number): THREE.Vector3[] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const theta = golden * i;
    return new THREE.Vector3(
      Math.cos(theta) * rad * r,
      y * r,
      Math.sin(theta) * rad * r,
    );
  });
}

function Label({
  text,
  position,
  index,
  theme,
}: {
  text: string;
  position: THREE.Vector3;
  index: number;
  theme: Theme;
}) {
  const [hovered, setHovered] = useState(false);
  const light = theme === "light";
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!hovered) return;
    document.body.style.cursor = "pointer";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered]);

  useFrame((state, dt) => {
    const g = groupRef.current;
    if (!g) return;
    g.quaternion.copy(state.camera.quaternion);
    const target = hovered ? 1.45 : 1;
    const s = g.scale.x + (target - g.scale.x) * (1 - Math.exp(-dt * 12));
    g.scale.setScalar(s);
  });

  return (
    <group position={position}>
      <group ref={groupRef}>
        <Text
          fontSize={0.36}
          anchorX="center"
          anchorY="middle"
          color={
            light
              ? hovered
                ? "#ea580c"
                : index % 3 === 0
                  ? "#0b1530"
                  : "#0e7490"
              : hovered
                ? ORANGE
                : index % 3 === 0
                  ? WHITE
                  : CYAN
          }
          outlineWidth={0.012}
          outlineColor={light ? "#f3f6fc" : "#050a18"}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
        >
          {text}
        </Text>
      </group>
    </group>
  );
}

function Globe({ reduced, theme }: { reduced: boolean; theme: Theme }) {
  const points = useMemo(() => fibonacciSphere(allSkills.length, RADIUS), []);
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current && !reduced) ref.current.rotation.y += dt * 0.12;
  });
  return (
    <group ref={ref}>
      {allSkills.map((s, i) => (
        <Label key={s} text={s} position={points[i]} index={i} theme={theme} />
      ))}
      <mesh>
        <sphereGeometry args={[RADIUS * 0.97, 24, 18]} />
        <meshBasicMaterial
          color={theme === "light" ? "#0891b2" : CYAN}
          wireframe
          transparent
          opacity={theme === "light" ? 0.12 : 0.07}
        />
      </mesh>
    </group>
  );
}

// Keep the whole globe (plus label overhang) inside narrow/tall canvases.
function FitCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const aspect = size.width / Math.max(size.height, 1);
    const halfFov = THREE.MathUtils.degToRad(cam.fov / 2);
    const needed = (RADIUS * 1.45) / (Math.tan(halfFov) * Math.min(1, aspect));
    cam.position.setLength(Math.max(9.5, needed));
    cam.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

function Glow({ theme }: { theme: Theme }) {
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const ctx = c.getContext("2d");
    if (ctx) {
      const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, "rgba(34,211,238,0.55)");
      g.addColorStop(0.5, "rgba(34,211,238,0.12)");
      g.addColorStop(1, "rgba(34,211,238,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 128, 128);
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  useEffect(() => () => tex.dispose(), [tex]);
  return (
    <sprite scale={[RADIUS * 2.4, RADIUS * 2.4, 1]}>
      <spriteMaterial
        map={tex}
        opacity={theme === "light" ? 0.18 : 1}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </sprite>
  );
}

export default function SkillsGlobeScene({ active }: { active: boolean }) {
  const [reduced, setReduced] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 9.5], fov: 45 }}
      style={{ touchAction: "pan-y" }}
    >
      <FitCamera />
      <Glow theme={theme} />
      <Globe reduced={reduced} theme={theme} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.6}
        enableDamping
        minPolarAngle={Math.PI * 0.25}
        maxPolarAngle={Math.PI * 0.75}
      />
    </Canvas>
  );
}
