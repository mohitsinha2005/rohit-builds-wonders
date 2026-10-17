import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Galaxy() {
  const ref = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const count = 6000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const inner = new THREE.Color("#9fd3ff");
    const outer = new THREE.Color("#1e40af");
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 9;
      const branch = ((i % 4) / 4) * Math.PI * 2;
      const spin = r * 0.9;
      const rand = () => Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.6 * (1 + r * 0.15);
      positions[i * 3] = Math.cos(branch + spin) * r + rand();
      positions[i * 3 + 1] = rand() * 0.4;
      positions[i * 3 + 2] = Math.sin(branch + spin) * r + rand();
      const c = inner.clone().lerp(outer, r / 9);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += Math.min(d, 0.05) * 0.06;
  });
  return (
    <points ref={ref} position={[2, -2.2, -6]} rotation={[0.45, 0, 0.15]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function Planet() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += Math.min(d, 0.05) * 0.15;
  });
  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={ref} position={[-4.2, 2.2, -3]}>
        <mesh>
          <sphereGeometry args={[0.9, 64, 64]} />
          <meshStandardMaterial color="#2a5bd7" roughness={0.6} metalness={0.2} emissive="#0b1e5c" />
        </mesh>
        <mesh rotation={[1.2, 0, 0.3]}>
          <ringGeometry args={[1.25, 1.75, 96]} />
          <meshBasicMaterial color="#8ec5ff" transparent opacity={0.35} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </Float>
  );
}

function ShootingStar({ delay }: { delay: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const m = ref.current;
    if (!m) return;
    const t = ((clock.elapsedTime + delay) % 7) / 7;
    m.position.set(8 - t * 22, 5 - t * 9, -5);
    (m.material as THREE.MeshBasicMaterial).opacity = t < 0.3 ? Math.sin((t / 0.3) * Math.PI) : 0;
  });
  return (
    <mesh ref={ref} rotation={[0, 0, 0.39]}>
      <planeGeometry args={[1.6, 0.025]} />
      <meshBasicMaterial color="#e0f0ff" transparent opacity={0} />
    </mesh>
  );
}

function Rig() {
  useFrame(({ camera, pointer }, d) => {
    const k = 1 - Math.exp(-2 * Math.min(d, 0.05));
    camera.position.x += (pointer.x * 1.2 - camera.position.x) * k;
    camera.position.y += (pointer.y * 0.7 - camera.position.y) * k;
    camera.position.z = 8 - Math.min(window.scrollY / 400, 3);
    camera.lookAt(0, 0, -3);
  });
  return null;
}

export default function Scene3D() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas gl={{ alpha: true }} dpr={[1, 1.75]} camera={{ position: [0, 0, 8], fov: 55 }}>
        <ambientLight intensity={0.25} />
        <directionalLight position={[6, 3, 5]} intensity={2.2} color="#cfe0ff" />
        <Stars radius={60} depth={40} count={4000} factor={3} saturation={0} fade speed={1} />
        <Galaxy />
        <Planet />
        <ShootingStar delay={0} />
        <ShootingStar delay={3.5} />
        <Rig />
      </Canvas>
    </div>
  );
}
