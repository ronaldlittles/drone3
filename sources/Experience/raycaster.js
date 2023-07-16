import * as THREE from "three";
import Experience from "./Experience.js";
//import { vertexShader } from "./vertex.js";
//import { fragmentShader } from "./fragment.js";
import EventEmitter from "./Utils/EventEmitter.js";

import GSAP from "gsap";

export default class Raycaster extends EventEmitter {
  constructor() {

    super();

    this.experience = new Experience();
    this.resources = this.experience.resources;

    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.camera = this.experience.camera;
    this.controls = this.experience.controls;
    this.mouse = this.experience.mouse;
    this.world = this.experience.world;

    this.scene = this.experience.scene;
    this.scene2 = this.experience.scene2;
    

    

    this.resource1 = this.resources.items.meTexture;
    
    //this.setRaycaster();
    

   
  }

  setRaycaster() {

    const sphereGeometry = new THREE.SphereGeometry(1, 36, 36);

    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true, });

    this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    
    this.sphere.scale.set(15,15,15)

     window.addEventListener( "mousemove", (event) => {

      

      

      

      const raycaster = new THREE.Raycaster();

      raycaster.setFromCamera( this.mouse, this.camera.instance );

      const intersects = raycaster.intersectObjects( this.scene2.children );
     
      if (intersects.length > 0) {

        const point = intersects[0].point;

        
        //console.log(intersects[0].uv )
     
        this.sphere.position.copy( point );
     
    }

      this.scene2.add(this.sphere);
      
  })

  }

  update() {

    //this.sphere.rotation.y += 5;

  }


}
