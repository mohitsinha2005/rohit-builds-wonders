import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshTransmissionMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const GRID = 90;
const SPACING = 0.32;

function Wave() {
  const ref = useRef<THREE.Points>(null);
  const base = useMemo(() => {
    const arr = new Float32Array(GRID * GRID * 3);
    let i = 0;
    for (let x = 0; x < GRID; x++)
      for (let z = 0; z < GRID; z++) {
        arr[i++] = (x - GRID / 2) * SPACING;
        arr[i++] = 0;
        arr[i++] = (z - GRID / 2) * SPACING;
      }
    return arr;
  }, []);
  const positions = useMemo(() => base.slice(), [base]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.6;
    const g = ref.current?.geometry.attributes.position;
    if (!g) return;
    const a = g.array as Float32Array;
    for (let i = 0; i < a.length; i += 3) {
      const x = base[i]!, z = base[i + 2]!;
      a[i + 1] = Math.sin(x * 0.45 + t) * 0.45 + Math.cos(z * 0.35 + t * 0.8) * 0.45;
    }
    g.needsUpdate = true;
  });
  return (
    <points ref={ref} position={[0, -3, -4]} rotation={[0.15, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#5b9dff" transparent opacity={0.85} sizeAttenuation />
    </points>
  );
}

function Rig() {
  useFrame(({ camera, pointer }, d) => {
    const k = 1 - Math.exp(-2 * Math.min(d, 0.05));
    camera.position.x += (pointer.x * 1.2 - camera.position.x) * k;
    camera.position.y += (1 + pointer.y * 0.6 - camera.position.y) * k;
    camera.position.z = 9 - Math.min(window.scrollY / 400, 3);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Shapes() {
  return (
    <>
      <Float speed={1.3} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh position={[3, 0.8, 0]}>
          <torusGeometry args={[1.1, 0.42, 64, 128]} />
          <MeshTransmissionMaterial color="#9cc4ff" thickness={0.6} roughness={0.08} transmission={1} ior={1.4} chromaticAberration={0.05} backside />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={1.6} floatIntensity={2}>
        <mesh position={[-3.6, 1.6, -2]}>
          <icosahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial color="#2563eb" metalness={0.85} roughness={0.2} flatShading />
        </mesh>
      </Float>
      <Float speed={1.6} rotationIntensity={2} floatIntensity={1.4}>
        <mesh position={[-1.5, -1.2, 1]}>
          <octahedronGeometry args={[0.45]} />
          <meshStandardMaterial color="#7dd3fc" metalness={0.5} roughness={0.3} wireframe />
        </mesh>
      </Float>
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas gl={{ alpha: true }} dpr={[1, 1.75]} camera={{ position: [0, 1, 9], fov: 50 }}>
        <fog attach="fog" args={["#0b1224", 7, 20]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} color="#cfe0ff" />
        <Environment>
          <Lightformer intensity={2.5} position={[0, 5, 0]} scale={[10, 10, 1]} />
          <Lightformer intensity={1.5} color="#3b82f6" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} />
          <Lightformer intensity={1.5} color="#7dd3fc" position={[5, -1, 1]} rotation-y={-Math.PI / 2} scale={[20, 1, 1]} />
        </Environment>
        <Shapes />
        <Wave />
        <Rig />
      </Canvas>
    </div>
  );
}
