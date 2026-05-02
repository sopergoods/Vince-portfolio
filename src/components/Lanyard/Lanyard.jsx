/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer, Decal } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { useThree } from '@react-three/fiber';

// Import assets
import cardGLB from './card.glb';
import lanyardTexture from './lanyard.png';
import portraitImage from '../../assets/pic4.png';
import backswapImage from '../../assets/pic4.png';

import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true, theme = 'light' }) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="lanyard-wrapper" style={{ opacity: scrolled ? 0 : 1, transition: 'opacity 0.4s ease', pointerEvents: scrolled ? 'none' : undefined }}>
      <Canvas
        style={{ pointerEvents: 'none' }}
        eventSource={document.getElementById('root')}
        eventPrefix="client"
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={theme === 'dark' ? Math.PI * 3 : Math.PI} />
        {theme === 'dark' && <directionalLight position={[0, 10, 20]} intensity={2.5} color="white" />}
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} theme={theme} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false, theme = 'light' }) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 6, linearDamping: 6 };
  const { nodes, materials } = useGLTF(cardGLB);
  const texture = useTexture(lanyardTexture);
  
  const coloredTexture = useMemo(() => {
    if (!texture || !texture.image) return texture;
    const canvas = document.createElement('canvas');
    canvas.width = texture.image.width;
    canvas.height = texture.image.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(texture.image, 0, 0);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      // Ignore transparent pixels
      if (data[i + 3] === 0) continue;
      
      // If pixel is dark (black ribbon background)
      if (data[i] < 100 && data[i + 1] < 100 && data[i + 2] < 100) {
        data[i] = 160;     // Red
        data[i + 1] = 0;   // Green
        data[i + 2] = 0;   // Blue
      }
    }
    ctx.putImageData(imgData, 0, 0);
    const newTex = new THREE.CanvasTexture(canvas);
    newTex.wrapS = newTex.wrapT = THREE.RepeatWrapping;
    return newTex;
  }, [texture]);

  const { width, height } = useThree((state) => state.size);

  const frontTexture = useTexture(portraitImage);
  const backTexture = useTexture(backswapImage);

  useEffect(() => {
    if (frontTexture) {
      frontTexture.generateMipmaps = false;
      frontTexture.minFilter = THREE.LinearFilter;
      frontTexture.needsUpdate = true;
    }
  }, [frontTexture]);


  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 2.0]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 2.0]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 2.0]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 8.13, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      // Connect to the top of the card where the clip is (not through the middle)
      // Use j3's position which is connected to the card at the top via spherical joint
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group>
        <RigidBody position={[15, 4.65, 0]} ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[15, 2.65, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[15, 0.65, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[15, -1.35, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[15, -9.48, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[1.522, 2.125, 0.016]} />
          <group
            scale={[8.567, 8.5, 8.5]}
            position={[0, -1.5, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            )}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                color="#ffffff"
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
                side={THREE.DoubleSide}
              />
              <Decal
                position={[0, 0.44, 0.05]}
                rotation={[0, 0, 0]}
                scale={[0.695, 1.191, 1]}
                map={frontTexture}
              />
            </mesh>
            <mesh geometry={nodes.card.geometry} position={[0, 0, -0.002]} rotation={[0, Math.PI, 0]}>
              <meshPhysicalMaterial
                color="#1a1a1a"
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
                side={THREE.DoubleSide}
              />
            </mesh>

            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap={true}
          map={theme === 'dark' ? coloredTexture : texture}
          repeat={[-2, 1]}
          lineWidth={2.5}
        />
      </mesh>
    </>
  );
}
