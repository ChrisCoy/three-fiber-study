import React, { SyntheticEvent, useState } from "react";
import { Scene } from "../canvas/Scene";
import { COLORS } from "../constants/colors";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";

type FlaskOptions = "flask" | "label" | "cover";

const App = () => {
  const initMTL = new THREE.MeshPhongMaterial({
    color: parseInt(`0xffffff`),
    shininess: 10,
  });
  const [activeOption, setActiveOption] = useState<FlaskOptions>("label");
  const [newMaterialOpt, setNewMaterialOpt] = useState({
    activeOption,
    newMTL: initMTL,
  });

  function handleColorChange(e: React.ChangeEvent<HTMLInputElement>) {
    let colorMtl;
    if (activeOption === "cover" || activeOption === "label") {
      colorMtl = new THREE.MeshPhongMaterial({
        color: e.target.value,
        shininess: 10,
        // transparent: true,
      });
    } else {
      colorMtl = new THREE.MeshPhysicalMaterial({
        color: e.target.value,
        transmission: 1,
        roughness: 0.1,
        // thickness: 0.01,
        // envMapIntensity: 4,
      });
    }

    setNewMaterialOpt({
      activeOption,
      newMTL: colorMtl as any,
    });
  }

  return (
    <div className="wrapper">
      <Canvas id="rtfCanvas">
        <Scene newMaterialOpt={newMaterialOpt} />
      </Canvas>
      <div className="controls">
        <input type="color" onChange={handleColorChange} />
        <select
          value={activeOption}
          onChange={(e) => setActiveOption(e.target.value as FlaskOptions)}
        >
          <option value="flask">flask</option>
          <option value="label">label</option>
          <option value="cover">cover</option>
        </select>
      </div>
    </div>
  );
};

export default App;

// const selectSwatch = (e: any) => {
//   let color = COLORS[parseInt(e.target.dataset.key)];

//   if (color.texture) {
//     let txt = new THREE.TextureLoader().load(color.texture);

//     txt.repeat.set(color.size[0], color.size[1]);
//     txt.wrapS = THREE.RepeatWrapping;
//     txt.wrapT = THREE.RepeatWrapping;

//     newMTL = new THREE.MeshPhongMaterial({
//       map: txt,
//       shininess: color.shininess ? color.shininess : 10,
//     });
//   } else {
//     newMTL = new THREE.MeshPhongMaterial({
//       color: parseInt("0x" + color.color),
//       shininess: color.shininess ? color.shininess : 10,
//     });
//   }

//   return setNewMaterialOpt({
//     activeOption,
//     newMTL,
//   });
// };
