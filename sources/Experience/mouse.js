import * as THREE from "three";
export default class Mouse {
    constructor() {
      this.x = 0;
      this.y = 0;
  
      window.addEventListener("mousemove", this.handleMouseMove.bind(this));
    }
  
    handleMouseMove(event) {
      this.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

 
  
 
  update(){


  }

}