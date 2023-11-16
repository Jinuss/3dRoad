import { useState, useEffect } from "react";
import * as dat from "dat.gui";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import TWEEN from '@tweenjs/tween.js';

import "./App.css";

const gui = new dat.GUI({ name: "demo" });

var testObj = { number: 10, color: "#66ccff", string: "abc", value: "语文" };
var folder = gui.addFolder("Flow Field");
folder.add(testObj, "number", 10, 100, 5);
folder.addColor(testObj, "color").name("控制颜色");
folder.add(testObj, "string");
folder.add(testObj, "value", ["语文", "数学", "英语"]);
folder.open();

function App() {
  useEffect(() => {
    initThree();
  }, []);
  const initThree = () => {
    const stats = new Stats()
    stats.setMode(0)
    stats.domElement.style.position = "absolute"
    stats.domElement.style.left = "0px"
    stats.domElement.style.top = "0px"
    document.body.appendChild(stats.domElement)

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(3, 1, 20);
    const container = document.querySelector("#container");
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#af3", 0.5);
    container.appendChild(renderer.domElement);

    const axisHelper = new THREE.AxesHelper(20)
    scene.add(axisHelper)

    const geometry = new THREE.BoxGeometry(1, 2, 3)
    const material = new THREE.MeshLambertMaterial({ color: 0x156289 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    const orbitControls = new OrbitControls(camera, container)
    orbitControls.autoRotate = true;

    const point_light = new THREE.PointLight('red', 1, 100000)
    point_light.position.set(5, 5, 5)
    scene.add(point_light)

    const tween = new TWEEN.Tween(point_light.position).to({ x: 1, y: 500, z: 3 }, 2000).start().repeat(100)

    const animate = function () {
      tween.update()
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
      stats.update()
    }
    animate()
  };
  return <div id="container"></div>;
}

export default App;
