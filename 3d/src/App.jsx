import { useState, useEffect } from "react";
import * as dat from "dat.gui";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import stats from "./components/stats";
import TWEEN from '@tweenjs/tween.js';

// import "./App.css";

function App() {
  const initGui = () => {
    const gui = new dat.GUI({ name: "demo" });

    var testObj = { number: 0.8, color: "#66ccff" };
    var folder = gui.addFolder("控制器");
    folder.add(testObj, "number", 0, 1, 0.1).name("透明度");
    folder.addColor(testObj, "color").name("颜色");
    folder.open();

  }
  useEffect(() => {
    initThree();
    initGui()
  }, []);

  const initThree = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      5,
      1000
    );
    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position)

    const container = document.querySelector("#container");
    const renderer = new THREE.WebGLRenderer();
    const canvas = renderer.domElement
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("orange", 0.5);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    //坐标轴
    const axisHelper = new THREE.AxesHelper(200)
    scene.add(axisHelper)

    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(60, 20);
    var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 1;
    plane.receiveShadow = true;

    // add the plane to the scene
    scene.add(plane);

    // create a sphere
    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x7777ff, wireframe: true });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // position the sphere
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    sphere.castShadow = true

    // add the sphere to the scene
    scene.add(sphere);

    const geometry = new THREE.BoxGeometry(3, 3, 3)
    const material = new THREE.MeshLambertMaterial({ color: 0x44aa88 })
    material.transparent = true;
    material.opacity = 0.8

    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    const points = []
    points.push(new THREE.Vector3(0, 0, 3))
    points.push(new THREE.Vector3(0, 3, 0))
    points.push(new THREE.Vector3(3, 0, 0))
    points.push(new THREE.Vector3(0, 0, 3))

    const geometryLine = new THREE.BufferGeometry().setFromPoints(points)
    const materialLine = new THREE.LineDashedMaterial({ color: 0x0000ff })

    const line = new THREE.Line(geometryLine, materialLine)
    scene.add(line)

    const orbitControls = new OrbitControls(camera, container)
    orbitControls.autoRotate = true;

    const point_light = new THREE.SpotLight(0xffffff)
    point_light.position.set(-40, 60, -10)
    point_light.castShadow = true;
    point_light.shadow.camera.near = 0.5;
    point_light.shadow.camera.far = 500;
    point_light.shadow.mapSize.width = 1024
    point_light.shadow.mapSize.height = 1024
    point_light.shadow.camera.left = -10;
    point_light.shadow.camera.right = 10;
    point_light.shadow.camera.top = 10;
    point_light.shadow.camera.bottom = -10;
    scene.add(point_light)


    // const tween = new TWEEN.Tween(camera.position).to({ x: 202, y: 123, z: 3 }, 3000).onUpdate(()=>{
    //   camera.lookAt(0,0,0)
    // }).start().repeat(100)
    const R = 10; //相机圆周运动的半径

    const tween = new TWEEN.Tween({ angle: 0, opacity: material.opacity })
      .to({ angle: Math.PI * 3, opacity: 1.0 }, 160000)
      .onUpdate(function (obj) {
        camera.position.x = R * Math.cos(obj.angle);
        camera.position.z = R * Math.sin(obj.angle);
        material.opacity = obj.opacity
        camera.lookAt(0, 0, 0);
      })
      .start().easing(TWEEN.Easing.Quadratic.Out).repeat(100)

    const resizeRender = () => {
      const pixelRatio = window.devicePixelRatio
      const width = canvas.clientWidth * pixelRatio | 0
      const height = canvas.clientHeight * pixelRatio | 0
      const needResize = canvas.width !== width || canvas.height !== height
      if (needResize) {
        renderer.setSize(width, height, false)
      }

      return needResize
    }
    renderer.render(scene, camera)
    const animate = function () {
      tween.update()
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
      stats.update()
      // if (resizeRender()) {
      //   camera.aspect = canvas.clientWidth / canvas.clientHeight;
      //   camera.updateProjectionMatrix();
      // }
    }
    // animate()
  };
  return <div id="container"></div>;
}

export default App;
