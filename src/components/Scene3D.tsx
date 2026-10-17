import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const LAYERS = [6, 9, 9, 5];

function useNetwork() {
  return useMemo(() => {
    const nodes: THREE.Vector3[][] = LAYERS.map((n, li) =>
      Array.from({ length: n }, (_, i) =>
        new THREE.Vector3((li - (LAYERS.length - 1) / 2) * 3.2, (i - (n - 1) / 2) * 0.85, (Math.random() - 0.5) * 2.5),
      ),
    );
    const edges: [THREE.Vector3, THREE.Vector3][] = [];
    for (let l = 0; l < nodes.length - 1; l++)
      for (const a of nodes[l]!) for (const b of nodes[l + 1]!) if (Math.random() < 0.55) edges.push([a, b]);
    const linePos = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => linePos.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6));
    return { nodes: nodes.flat(), edges, linePos };
  }, []);
}

function Network() {
  const group = useRef<THREE.Group>(null);
  const nodeRefs = useRef<THREE.Mesh[]>([]);
  const pulses = useRef<THREE.InstancedMesh>(null);
  const { nodes, edges, linePos } = useNetwork();
  const PULSES = 40;
  const seeds = useMemo(() => Array.from({ length: PULSES }, () => ({ e: Math.floor(Math.random() * edges.length), o: Math.random() })), [edges.length]);
  const tmp = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }, d) => {
    const t = clock.elapsedTime;
    if (group.current) group.current.rotation.y = Math.sin(t * 0.15) * 0.5 + 0.3;
    nodeRefs.current.forEach((m, i) => m && m.scale.setScalar(1 + Math.sin(t * 2 + i) * 0.25));
    const im = pulses.current;
    if (!im) return;
    seeds.forEach((s, i) => {
      s.o += Math.min(d, 0.05) * 0.5;
      if (s.o > 1) { s.o = 0; s.e = Math.floor(Math.random() * edges.length); }
      const [a, b] = edges[s.e]!;
      tmp.position.lerpVectors(a, b, s.o);
      tmp.updateMatrix();
      im.setMatrixAt(i, tmp.matrix);
    });
    im.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={group} position={[2.5, 0, -3]} scale={0.95}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.18} />
      </lineSegments>
      {nodes.map((p, i) => (
        <mesh key={i} position={p} ref={(m) => { if (m) nodeRefs.current[i] = m; }}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshBasicMaterial color={i % 5 === 0 ? "#7dd3fc" : "#60a5fa"} />
        </mesh>
      ))}
      <instancedMesh ref={pulses} args={[undefined, undefined, PULSES]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#e0f2fe" />
      </instancedMesh>
    </group>
  );
}

function DataCloud() {
  const ref = useRef<THREE.Points>(null);
  const pos = useMemo(() => {
    const a = new Float32Array(1200 * 3);
    for (let i = 0; i < 1200; i++) {
      const x = (Math.random() - 0.5) * 14;
      a[i * 3] = x;
      a[i * 3 + 1] = x * 0.35 + (Math.random() - 0.5) * 1.6 - 2.5; // regression-like scatter
      a[i * 3 + 2] = (Math.random() - 0.5) * 6 - 6;
    }
    return a;
  }, []);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += Math.min(d, 0.05) * 0.04; });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#38bdf8" transparent opacity={0.55} depthWrite={false} />
    </points>
  );
}

function Rig() {
  useFrame(({ camera, pointer }, d) => {
    const k = 1 - Math.exp(-2 * Math.min(d, 0.05));
    camera.position.x += (pointer.x * 1.2 - camera.position.x) * k;
    camera.position.y += (pointer.y * 0.7 - camera.position.y) * k;
    camera.position.z = 9 - Math.min(window.scrollY / 400, 3);
    camera.lookAt(0, 0, -3);
  });
  return null;
}

export default function Scene3D() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas gl={{ alpha: true }} dpr={[1, 1.75]} camera={{ position: [0, 0, 9], fov: 55 }}>
        <Stars radius={60} depth={40} count={2500} factor={2.5} saturation={0} fade speed={0.6} />
        <DataCloud />
        <Network />
        <Rig />
      </Canvas>
    </div>
  );
}
