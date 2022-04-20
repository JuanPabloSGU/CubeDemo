import React, {useRef} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { softShadows, MeshWobbleMaterial, OrbitControls } from "@react-three/drei";

import './App.scss';
import Header from "./components/header";

const Cube = ({position, color, speed}) => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += speed));

  return (
    <mesh castShadow position={position} ref={mesh}>
      <boxBufferGeometry attach='geometry' args = {[1,1,1]} />
      <MeshWobbleMaterial attach="material" color={color} speed={1} factor={0.3}/>
    </mesh>
  );
};

const SpinningCircle = ({position, color, speed}) => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.y = mesh.current.rotation.x += speed));

  return (
    <mesh castShadow position={position} ref ={mesh}>
      <sphereBufferGeometry attach="geometry" args={[1, 50]} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  );
};

softShadows();

function App() {
  return (
    <>
      <Header></Header>
      <Canvas shadows camera={{position:[0,0,5], fov: 80}}>
        <ambientLight intensity={0.5} />

        <directionalLight 
          castShadow
          position={[0, 15, 0]}
          intensity={0.7}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        <pointLight position={[-5, 0, -5]} intensity={0.5}/>
        <pointLight position={[5, 0, -5]} intensity={0.5}/>
        <pointLight position={[0, 0, 2]} intensity={0.35}/>

        <group>
          <mesh receiveShadow rotation={[-Math.PI /2, 0, 0]} position={[0, -3, 0]} >
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <shadowMaterial attach='material' opacity={0.3}/>
          </mesh>

          <Cube position={[-3,0,-1]} color="red" speed={0.01}/>
          <SpinningCircle position={[0, 0.5, -1]} color="green" speed={0.008}/>
          <Cube position={[3,0,-1]} color="blue" speed={-0.008}/>
        </group>

        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;
