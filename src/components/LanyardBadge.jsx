import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Text } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

// Lanyard strap with clips
function LanyardStrap() {
  return (
    <group position={[0, 4, 0]}>
      {/* Top clip */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.15, 16]} />
        <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Strap segments */}
      {[0, 1, 2].map((i) => (
        <group key={i} position={[0, -i * 1.2, 0]}>
          {/* Black strap */}
          <mesh>
            <cylinderGeometry args={[0.05, 0.05, 1.2, 8]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          
          {/* Metal clip decoration */}
          <mesh position={[0, 0.5, 0]}>
            <torusGeometry args={[0.12, 0.03, 8, 16]} />
            <meshStandardMaterial color="#aaa" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}
      
      {/* Bottom attachment hook */}
      <mesh position={[0, -3.8, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.2, 8]} />
        <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

// ID Badge Card
function BadgeCard() {
  const cardRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Subtle swinging animation
  useFrame((state) => {
    if (cardRef.current) {
      const time = state.clock.getElapsedTime();
      cardRef.current.rotation.z = Math.sin(time * 0.5) * 0.05;
      cardRef.current.position.x = Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <group ref={cardRef} position={[0, 0, 0]}>
      {/* Main white card */}
      <RoundedBox
        args={[2.5, 3.5, 0.08]}
        radius={0.15}
        smoothness={4}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={hovered ? "#f5f5f5" : "#ffffff"} 
          metalness={0.1}
          roughness={0.3}
        />
      </RoundedBox>

      {/* Card shadow/back */}
      <RoundedBox
        args={[2.5, 3.5, 0.08]}
        radius={0.15}
        smoothness={4}
        position={[0, 0, -0.05]}
      >
        <meshStandardMaterial color="#ddd" />
      </RoundedBox>

      {/* Logo/Icon - Simple atom-like design */}
      <group position={[0, 0.3, 0.05]}>
        {/* Center dot */}
        <mesh>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        
        {/* Orbits */}
        {[0, 60, 120].map((angle) => (
          <mesh key={angle} rotation={[0, 0, (angle * Math.PI) / 180]}>
            <torusGeometry args={[0.5, 0.05, 8, 32]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        ))}
      </group>

      {/* Name */}
      <Text
        position={[0, -1, 0.05]}
        fontSize={0.25}
        color="#1a1a1a"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        VINCE TIMOTHY
      </Text>

      {/* Title */}
      <Text
        position={[0, -1.4, 0.05]}
        fontSize={0.15}
        color="#666"
        anchorX="center"
        anchorY="middle"
      >
        Computer Science Student
      </Text>

      {/* University */}
      <Text
        position={[0, -1.7, 0.05]}
        fontSize={0.12}
        color="#888"
        anchorX="center"
        anchorY="middle"
      >
        Manuel S. Enverga University
      </Text>

      {/* Hole punch at top */}
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  );
}

// Main Lanyard Component
export default function LanyardBadge() {
  return (
    <div style={{ 
      width: '100%', 
      height: '500px',
      background: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.3} />
        <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.3} penumbra={1} />
        
        <LanyardStrap />
        <BadgeCard />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
