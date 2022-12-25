import { useGLTF } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import {
  Environment,
  Html,
  OrbitControls,
  PresentationControls,
  Stage,
} from "@react-three/drei/web";

import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense } from "react";

function Model(props: any) {
  const { scene } = useGLTF("./untitled.glb");
  // const { scene } =
  // const scene = useLoader(OBJLoader, "/pills-bottle-004.obj");

  // return <primitive object={scene} {...props} color="pink" />;
  return (
    <primitive object={scene} {...props} color="pink">
      <meshStandardMaterial color={"pink"} />
    </primitive>
  );
}

export default function App() {
  return (
    <div className="App">
      <Canvas style={{ position: "absolute" }}>
        <Suspense fallback={null}>
          <Model />
          <OrbitControls />
          <Environment preset="sunset" background />
        </Suspense>
      </Canvas>
    </div>
  );
}
