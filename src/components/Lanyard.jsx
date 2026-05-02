import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, RoundedBox } from '@react-three/drei';
import { useRef, useState } from 'react';

function IDCard() {
  const cardRef = useRef();
  const [hovered, setHovered] = useState(false);

  return (
    <group ref={cardRef}>
      {/* Main Card Body */}
      <RoundedBox
        args={[3, 4, 0.1]}
        radius={0.2}
        smoothness={4}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={hovered ? "#1a1a1a" : "#0d0d0d"} 
          metalness={0.5}
          roughness={0.2}
        />
      </RoundedBox>

      {/* Red Header Strip */}
      <RoundedBox
        args={[3, 0.6, 0.11]}
        radius={0.2}
        smoothness={4}
        position={[0, 1.7, 0]}
      >
        <meshStandardMaterial color="#ff3c3c" metalness={0.8} roughness={0.1} />
      </RoundedBox>

      {/* Name */}
      <Text
        position={[0, 1.7, 0.06]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        VINCE TIMOTHY
      </Text>

      {/* Role/Title */}
      <Text
        position={[0, 0.8, 0.06]}
        fontSize={0.2}
        color="#ff4747"
        anchorX="center"
        anchorY="middle"
      >
        Computer Science Student
      </Text>

      {/* Skills */}
      <Text
        position={[0, 0.2, 0.06]}
        fontSize={0.15}
        color="#c0c0c0"
        anchorX="center"
        anchorY="middle"
      >
        JavaScript • PHP • Java
      </Text>

      <Text
        position={[0, -0.1, 0.06]}
        fontSize={0.15}
        color="#c0c0c0"
        anchorX="center"
        anchorY="middle"
      >
        Web Development • C++
      </Text>

      {/* University */}
      <Text
        position={[0, -0.8, 0.06]}
        fontSize={0.13}
        color="#888"
        anchorX="center"
        anchorY="middle"
      >
        Manuel S. Enverga
      </Text>

      <Text
        position={[0, -1.05, 0.06]}
        fontSize={0.13}
        color="#888"
        anchorX="center"
        anchorY="middle"
      >
        University Foundation
      </Text>

      {/* Contact Info */}
      <Text
        position={[0, -1.6, 0.06]}
        fontSize={0.11}
        color="#ff6b6b"
        anchorX="center"
        anchorY="middle"
      >
        github.com/sopergoods
      </Text>
    </group>
  );
}

export default function Lanyard() {
  return (
    <div style={{ 
      width: '100%', 
      height: '500px', 
      borderRadius: '12px',
      border: '1px solid rgba(255, 60, 60, 0.2)',
      overflow: 'visible',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff3c3c" />
        <IDCard />
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={1.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
