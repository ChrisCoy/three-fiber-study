import { extend, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect } from "react";
import ChairMesh from "./components/ChairMesh";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Floor from "./components/Floor";
import * as THREE from "three";

extend({ OrbitControls })

export const Scene = ({ newMaterialOpt }) => {
    const {
        scene, camera,
        gl: { domElement, shadowMap }
    } = useThree();

    // Scene configuration;
    useEffect(() => {
        const directionalLight = scene.children[1];
        scene.background = new THREE.Color(0xf1f1f1);
        scene.fog = new THREE.Fog(0xf1f1f1, 20, 100);
        camera.fov = 50;
        directionalLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
        shadowMap.enabled = true;
        console.log(scene);
    }, [])

    return (
        <>
            <orbitControls args={[camera, domElement]} />
            <hemisphereLight
                skycolor={new THREE.Color(0xffffff)}
                groundColor={new THREE.Color(0xffffff)}
                intensity={0.61}
                position={[0, 50, 0]}
            />
            <directionalLight
                color={new THREE.Color(0xffffff)}
                intensity={0.54}
                position={[-8, 12, 8]}
                castShadow
            />
            <Suspense fallback={null}>
                <ChairMesh newMaterialOpt={newMaterialOpt} />
                <Floor />
            </Suspense>
        </>
    )
}