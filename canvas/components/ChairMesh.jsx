import React from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useLoader } from "@react-three/fiber";
import { useRef, useEffect } from "react";

const SOLID_MTL = new THREE.MeshPhongMaterial({
    color: new THREE.Color(0xffffff),
    shininess: 10,
    // transparent: true,
});



const TRANSPARENT_MTL = new THREE.MeshPhysicalMaterial({
    color: '#efefef',
    transmission: 1,
    roughness: 0.1,
    thickness: 0.01,
    // envMapIntensity: 4,
})

const INITIAL_MAP = [
    { childID: "flask", mtl: TRANSPARENT_MTL },
    { childID: "cover", mtl: SOLID_MTL },
    { childID: "label", mtl: SOLID_MTL },
];

const initColor = (parent, type, mtl) => {
    parent.traverse(o => {
        if (o.isMesh && o.name.includes(type)) {
            o.castShadow = true;
            o.receiveShadow = true;
            o.material = mtl;
            o.nameID = type;
        }
    });
}

const ChairMesh = ({ newMaterialOpt }) => {
    const { scene: theModel } = useLoader(GLTFLoader, "flask2.glb");
    const chair = useRef(theModel)

    useEffect(() =>
        setMaterial(newMaterialOpt.activeOption, newMaterialOpt.newMTL)
        , [newMaterialOpt.newMTL])

    useEffect(() => {
        if (theModel) {
            for (let object of INITIAL_MAP) {
                initColor(theModel, object.childID, object.mtl);
                console.log();
            }
        }
    }, [theModel])

    const setMaterial = (type, mtl) => {
        theModel.traverse(o => {
            if (o.isMesh && o.nameID != null) {
                if (o.nameID === type) {
                    o.material = mtl;
                }
            }
        });
    }


    return <primitive
        ref={chair}
        object={theModel}
        scale={[2, 2, 2]}
        rotation={[0, Math.PI, 0]}
        position={[0, -1, 0]}
        receiveShadow
        castShadow
    >
    </primitive>

}

export default ChairMesh;
