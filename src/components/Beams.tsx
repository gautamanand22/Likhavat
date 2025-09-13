import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

type BeamsProps = {
  beamWidth?: number;
  beamHeight?: number;
  beamNumber?: number;
  lightColor?: string;
  speed?: number;
  noiseIntensity?: number;
  scale?: number;
  rotation?: number;
};


const Beam = ({
  beamWidth = 0.2,
  beamHeight = 5,
  lightColor = "#ffffff",
  speed = 1,
}: BeamsProps) => {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[beamWidth, beamWidth, beamHeight, 32]} />
      <meshStandardMaterial
        emissive={lightColor}
        emissiveIntensity={2}
        color={lightColor}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
};

const Beams = ({
  beamWidth = 0.2,
  beamHeight = 5,
  beamNumber = 12,
  lightColor = "#ffffff",
  speed = 1,
}: BeamsProps) => {
  const beams = Array.from({ length: beamNumber });

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {beams.map((_, i) => (
        <group
          key={i}
          rotation={[0, (i / beamNumber) * Math.PI * 2, 0]}
          position={[0, 0, 0]}
        >
          <Beam
            beamWidth={beamWidth}
            beamHeight={beamHeight}
            lightColor={lightColor}
            speed={speed}
          />
        </group>
      ))}
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

export default Beams;
