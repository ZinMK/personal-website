import { Component, Suspense, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import { AboutLaptop } from "@/components/AboutLaptop";

const LINKTREE_URL = "https://linktr.ee/zinkhant";

function Lid({
  open,
  onClick,
}: {
  open: boolean;
  onClick: (e: unknown) => void;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    const target = open ? -0.16 : -Math.PI / 2;
    group.current.rotation.x +=
      (target - group.current.rotation.x) * Math.min(delta * 6, 1);
  });

  return (
    <group ref={group} position={[0, -0.84, -1.02]} rotation={[-Math.PI / 2, 0, 0]}>
      {/* lid body */}
      <RoundedBox
        args={[3.0, 1.92, 0.07]}
        radius={0.03}
        position={[0, 0.96, 0]}
        onClick={onClick}
      >
        <meshStandardMaterial color="#1b1b1a" metalness={0.4} roughness={0.35} />
      </RoundedBox>
      {/* screen face */}
      <RoundedBox
        args={[2.82, 1.72, 0.02]}
        radius={0.02}
        position={[0, 0.96, 0.045]}
      >
        <meshBasicMaterial color="#0e0e0d" />
      </RoundedBox>
      {/* name */}
      <Text
        position={[0, 1.18, 0.07]}
        fontSize={0.24}
        color="#f2f1ed"
        anchorX="center"
        anchorY="middle"
        font={undefined}
      >
        Zin Khant
      </Text>
      {/* linktree */}
      <Text
        position={[0, 0.78, 0.07]}
        fontSize={0.15}
        color="#ff5500"
        anchorX="center"
        anchorY="middle"
        font={undefined}
        onClick={(e) => {
          e.stopPropagation();
          window.open(LINKTREE_URL, "_blank", "noopener,noreferrer");
        }}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      >
        linktr.ee/zinkhant ↗
      </Text>
    </group>
  );
}

function Scene() {
  const [open, setOpen] = useState(false);

  return (
    <group position={[0, -0.5, 0]}>
      {/* base */}
      <RoundedBox
        args={[3.3, 0.12, 2.1]}
        radius={0.04}
        position={[0, -0.9, 0]}
        onClick={() => setOpen((v) => !v)}
      >
        <meshStandardMaterial color="#2a2a28" metalness={0.5} roughness={0.4} />
      </RoundedBox>
      {/* keyboard hint */}
      <RoundedBox
        args={[2.2, 0.02, 1.3]}
        radius={0.01}
        position={[0, -0.83, 0.05]}
      >
        <meshStandardMaterial color="#151514" metalness={0.3} roughness={0.6} />
      </RoundedBox>

      <Lid open={open} onClick={() => setOpen((v) => !v)} />
    </group>
  );
}

class WebGLErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {}
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function Laptop3D() {
  return (
    <div
      style={{
        width: "min(640px, 100%)",
        height: 420,
        margin: "0 auto",
        position: "relative",
      }}
    >
      <WebGLErrorBoundary fallback={<AboutLaptop />}>
        <Canvas
          camera={{ position: [0, 0, 6.6], fov: 38 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={1.1} />
          <directionalLight position={[5, 6, 5]} intensity={1.2} />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
      <span
        className="zk-laptop-hint"
        style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}
      >
        click the laptop to open
      </span>
    </div>
  );
}

export default Laptop3D;
