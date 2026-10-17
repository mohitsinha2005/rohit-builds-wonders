import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(1500 * 3);
    for (let i = 0; i < arr.length; i++) arr[i] = (Math.random() - 0.5) * 30;
    return arr;
  }, []);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += Math.min(d, 0.05) * 0.03;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#e8c27a" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function Rig() {
  useFrame(({ camera, pointer }, d) => {
    const k = 1 - Math.exp(-2 * Math.min(d, 0.05));
    camera.position.x += (pointer.x * 1.2 - camera.position.x) * k;
    camera.position.y += (pointer.y * 0.8 - camera.position.y) * k;
    camera.position.z = 8 - Math.min(window.scrollY / 400, 3);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Shapes() {
  return (
    <>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh position={[2.6, 0.3, 0]}>
          <icosahedronGeometry args={[1.5, 32]} />
          <MeshDistortMaterial color="#c99a4a" metalness={0.9} roughness={0.18} distort={0.35} speed={1.5} />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[-3.4, 1.8, -2]}>
          <torusKnotGeometry args={[0.55, 0.18, 160, 24]} />
          <meshStandardMaterial color="#6fb3c2" metalness={0.8} roughness={0.25} />
        </mesh>
      </Float>
      <Float speed={1.7} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[-2, -2.2, -1]}>
          <octahedronGeometry args={[0.7]} />
          <meshStandardMaterial color="#e8dcc6" metalness={0.6} roughness={0.3} wireframe />
        </mesh>
      </Float>
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 8], fov: 50 }}>
        <color attach="background" args={["#14171d"]} />
        <fog attach="fog" args={["#14171d", 8, 22]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.6} />
        <Environment>
          <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} />
          <Lightformer intensity={1.2} color="#8bc" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} />
          <Lightformer intensity={1.2} color="#fc9" position={[5, -1, 1]} rotation-y={-Math.PI / 2} scale={[20, 1, 1]} />
        </Environment>
        <Shapes />
        <Particles />
        <Rig />
      </Canvas>
    </div>
  );
}
