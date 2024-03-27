import * as THREE from "three";
import Experience from "./Experience.js";
import EventEmitter from "./Utils/EventEmitter.js";

import { Text } from "troika-three-text";


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
      this.mouse = this.experience.mouse;
    
      this.resource1 = this.resources.items.me;
      this.resource2 = this.resources.items.fluffy;

      this.createButtons()
      
      this.setRaycaster()

console.log(Text)

    }




createButtons(){

this.geometry = new THREE.Mesh( 

    new THREE.PlaneGeometry(20,20),
    new THREE.MeshBasicMaterial({
        color: 'blue',
        map: this.resource2,
        side: THREE.DoubleSide,
    })

)

//this.scene3.add(this.geometry)
this.geometry.name = "blueButton"
this.geometry.position.set(-400,0,0)
this.geometry.scale.setScalar(25)




this.geometry2 = new THREE.Mesh( 

    new THREE.PlaneGeometry(20,20),
    new THREE.MeshBasicMaterial({
        color: 'red',
        map: this.resource2,
        side: THREE.DoubleSide,
    })

)

this.scene3.add(this.geometry2)
this.geometry2.name = "redButton"
this.geometry2.position.set(400,0,0)
this.geometry2.scale.setScalar(25)


this.myText = new Text();

   
//this.scene3.add(this.myText);

this.myText.text =
  "the brain is the strongest muscle of the body.";

this.myText.fontSize = 50.0;
//this.myText.textAlign = 'center';

this.myText.color = 'yellow';
this.myText.position.set(100,50,10)


this.myText.maxWidth = 105;
this.myText.sync();


this.group1 = new THREE.Group()
this.group1.add(this.geometry, this.myText )
this.scene3.add(this.group1)




    }


    

setRaycaster(){


    window.addEventListener( "pointerdown", (event) => {

    const raycaster = new THREE.Raycaster();

    raycaster.setFromCamera( this.mouse, this.camera.instance );

    const intersects = raycaster.intersectObjects( this.scene3.children)
    

   
    
    if (intersects.length > 0) {

      const point = intersects[0].object;

      console.log(point.name)

        }

    })




}


update(){

    
}


}



