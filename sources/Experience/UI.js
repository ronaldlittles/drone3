import * as THREE from "three";
import Experience from "./Experience.js";
import EventEmitter from "./Utils/EventEmitter.js";


export default class UI extends EventEmitter {

    constructor() {
  
      super()
  
      this.experience = new Experience();
      this.config = this.experience.config;
      this.debug = this.experience.debug;
      
      this.world = this.experience.world;
      
      this.scene3 = this.experience.scene3;
      this.scene = this.experience.scene;
      this.scene2 = this.experience.scene2;
      this.camera = this.experience.camera;
      this.resources = this.experience.resources;
      this.time = this.experience.time;
      this.renderer = this.experience.renderer;
      this.targetElement = this.experience.targetElement;
    
      this.resource1 = this.resources.items.me;
      this.resource2 = this.resources.items.fluffy;

      this.setScene3()
console.log(this)

    }




    setScene3(){

this.geometry = new THREE.Mesh( 

    new THREE.PlaneGeometry(20,20),
    new THREE.MeshBasicMaterial({
        color:'blue',
        map: this.resource2,
        side: THREE.DoubleSide,
    })

)

this.scene3.add(this.geometry)



this.geometry.position.set(0,100,0)
this.geometry.scale.setScalar(50)


console.log(this.scene3)
    }


}



