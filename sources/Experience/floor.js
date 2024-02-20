import * as THREE from "three";
import Experience from "./Experience.js";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";
import * as Curves from "three/examples/jsm/curves/CurveExtras.js";
import { vertexShader } from "./shaders/vertex.js";
import {fragmentShader} from "./fragment.js";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";


import Particles from "./particles.js";
import RollerCoasterGeometry from './track1.js'

import { VerticalBlurShader } from "three/examples/jsm/shaders/VerticalBlurShader.js";
import { UVsDebug } from "three/examples/jsm/utils/UVsDebug.js";
import { VertexTangentsHelper } from "three/examples/jsm/helpers/VertexTangentsHelper.js";
import { Flow } from "three/examples/jsm/modifiers/CurveModifier.js";
import { ShapeUtils } from "three/src/extras/ShapeUtils.js";
import GSAP from "gsap";
//import {Font1} from './font.js'
//import Video from './video.js'





export default class Floor extends THREE.Curve {
  constructor() {
    super();

    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.scene2 = this.experience.scene2;
    this.world = this.experience.world;
    this.renderer = this.experience.renderer;

    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.camera = this.experience.camera;
    this.controls = this.experience.controls;
    this.resource1 = this.resources.items.waterTexture;
    this.resource2 = this.resources.items.meTexture;

    //this.setMeshes();
    this.setTouch();
    this.setPlane();
    this.setTangent();
    this.setCurve();
    //this.setFont1();

    //this.setWater();

    this.pingpong = THREE.MathUtils.pingpong;
    this.damp = THREE.MathUtils.damp;
    this.smootherstep = THREE.MathUtils.smootherstep;
    this.clamp = THREE.MathUtils.clamp;

    this.car = this.scene.getObjectByName("car");

    this.position2 = new THREE.Vector3();
    this.position = new THREE.Vector3();
    this.tangent = new THREE.Vector3();
    this.quaternion = new THREE.Quaternion();
    this.spherical = new THREE.Spherical();
    //this.rotationMatrix = new THREE.Matrix4();

   

    this.exporter = new GLTFExporter();

    console.log(this.exporter)
  }

  setFont1() {
    this.font1 = new Font1("parameter");
    console.log(this.font1);
  }

  setWater() {
    this.waterGeometry = new THREE.PlaneGeometry(10000, 10000);

    this.water = new Water(this.waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: this.resource1,
      waterColor: 0x0000ff,
      distortionScale: 3.7,
      size: 0.01,
      fog: this.scene.fog !== undefined,
    });

    this.water.rotation.x = -Math.PI / 2;
    this.water.position.y = -0.5;
    //this.scene.add( this.water );
  }

  setPlane() {
    this.train = new THREE.Object3D();

    this.scene2.add(this.train);

    this.train.add(this.camera.instance);
    //this.train.translateZ(2)

    this.target = new THREE.Object3D();
    this.scene2.add(this.target);
  }

  setTangent() {
    const PI2 = Math.PI * 2;

    const vector = new THREE.Vector3();
    const vector2 = new THREE.Vector3();

    this.curve = {
      getPointAt(t) {
        t = t * PI2;

        
        const x = Math.sin(t * 3) * Math.cos(t * 4) * 50;
        const y = Math.sin(t * 10) * 2 + Math.cos(t * 17) * 2 + 5;
        const z = Math.sin(t) * Math.sin(t * 4) * 50;

        return vector.set(x, y, z).multiplyScalar(8);
      },

      getTangentAt(t) {
        const delta = 0.0001;
        const t1 = Math.max(0, t - delta);
        const t2 = Math.min(1, t + delta);

        return vector2
          .copy(this.getPointAt(t2))
          .sub(this.getPointAt(t1))
          .normalize();
      },

      /* getSpacedPoints(divisions = 25) {
        //points index needs to increase and change what pushed onto points array
        //length divided by distance

        const points = [];

        const segments = 300;

        let index = 0;

        for (let d = 0; d <= divisions; d++) {
          points.push(this.getPointAt(d / divisions));
        }

        return points;
      }, */
    };
  }

  setCurve() {
    let color;


    

    this.shaderMaterial = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,

      uniforms: {
        //model: { value: new THREE.Matrix4(this.modelMatrix) },
        //uvScale: { value: new THREE.Vector2(1, 1) },
        //vColor: { value: new THREE.Color("blue") },
        time: { value: null },
        texture1: { value: this.resources.items.yellow },
      },

      vertexShader: `

      //uniform mat4 model;
      varying vec2 vUv;
    
      void main()
      {
    
        vUv = uv;
        vec4 mvPosition = modelViewMatrix  * vec4( position, 1.0 );
        gl_Position = projectionMatrix * mvPosition;
    
      }`,
      fragmentShader: fragmentShader.fragmentShader,
    });

    

    //this.shaderMaterial.needsUpdate = true;

    ////////////////
    this.renderer.postProcess.unrealBloomPass.bloomTintColors[0] =
      new THREE.Color("purple");

    this.renderer.postProcess.unrealBloomPass.bloomTintColors[1] =
      new THREE.Color("yellow");

    this.rollercoaster = new RollerCoasterGeometry(this.curve, 1200);

    

    //this.rollercoaster.needsUpdate = true;

    const geometry = new THREE.PlaneGeometry(800, 800, 75, 75);

    geometry.rotateX(-Math.PI / 2);

     const positions = geometry.attributes.position.array;

    const vertex = new THREE.Vector3();

    for (let i = 0; i < positions.length; i += 3) {
      vertex.fromArray(positions, i);

      vertex.x += Math.random() * 10 - 5;
      vertex.z += Math.random() * 10 - 5;

      const distance = vertex.distanceTo(this.scene2.position) / 15 - 25;

      vertex.y = Math.sin(Math.PI * Math.random() * 25) * Math.max(0, distance);

      vertex.toArray(positions, i);
    } 

   

    const floorMesh = new THREE.Mesh(geometry, this.shaderMaterial);

    //this.scene2.add(floorMesh);

    ///////////////////

    this.plane = new THREE.PlaneGeometry(2, 2, 2, 2);

    

    

    this.material2 = new THREE.MeshBasicMaterial({

      //color: "yellow",
      transparent: true,
      opacity: 1,
      map: this.resource2,
      side: THREE.DoubleSide,

    });

    

    this.mesh = new THREE.Mesh(this.rollercoaster, this.shaderMaterial);

    this.mesh.scale.setScalar(100)

    this.resource2.wrapS = THREE.
    RepeatWrapping;

    this.resource2.wrapT = THREE.RepeatWrapping;

    this.resource2.repeat.set(4, 1);  

    this.scene2.add(this.mesh);

    this.material2.needsUpdate = true;
    console.log(this.mesh.matrix)
    this.modelMatrix = this.mesh.matrix
   
   
  }
  
  setTouch() {
    window.addEventListener("pointerdown", (e) => {
      e.preventDefault();

      //this.camera.orbitControls.enabled = false
    //this.camera.orbitControls.autoRotate = false
      this.timer = setInterval(() => {
       
        //this.updateCamera()

      }, 100);

      
    });

    window.addEventListener("pointerup", () => {
      if (this.timer) {
        clearInterval(this.timer);
      }

  })

}

  //UPDATE CAMERA
  updateCamera() {
    const lookAt = new THREE.Vector3(0, 0.75, 0);

    this.looptime = 20; //* 1000;
    this.td += 5; //this.time.elapsed * 0.9;
    this.t = (this.td % this.looptime) / this.looptime;
    this.t2 = ((this.t + 0.1) % this.looptime) / this.looptime;

    let velocity = this.t2;
    let progress = this.t;

    progress += velocity;
    progress = progress % 1;

    this.position.copy(this.curve.getPointAt(progress));
    this.position2.copy(this.curve.getPointAt(velocity));
    this.tangent.copy(this.curve.getTangentAt(velocity));

    this.position.y += 0.2;

    this.train.lookAt(lookAt);

    this.train.position.copy(this.position);

    //this.pa = this.position.toArray();

    //DISTANCE FUNCTION

   /*  if (this.controls.mouse.x > 0) {
      this.renderer.postProcess.unrealBloomPass.strength = 0;
    }

    if (this.controls.mouse.x < 0) {
      this.renderer.postProcess.unrealBloomPass.strength = 0.7;
    } */

    velocity -= this.tangent.y * 0.0000001;
    velocity = Math.max(0.0008, Math.min(0.004, velocity));

    this.train.lookAt(lookAt.copy(this.position).sub(this.tangent));

    

    
  }

  update() {
    //this.shaderMaterial.uniforms.time.value += this.time.elapsed * 0.009;

    //this.updateCamera()
  }

  destroy() {}
}
