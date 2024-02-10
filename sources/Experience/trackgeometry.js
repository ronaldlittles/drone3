import * as THREE from "three";
import Experience from "./Experience.js";
import EventEmitter from "./Utils/EventEmitter.js";

export default class TrackGeometry extends EventEmitter {

  

  constructor(_options = {}) {

    super()

    this.experience = new Experience();
    this.config = this.experience.config;
    this.debug = this.experience.debug;
    this.world = this.experience.world;

    this.scene = this.experience.scene;
    this.scene2 = this.experience.scene2;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
   
    this.renderer = this.experience.renderer;
    this.targetElement = this.experience.targetElement;
    this.world = this.experience.world;
    
   

    this.resource1 = this.resources.items.me;
    this.resource2 = this.resources.items.fluffy;
    this.resource3 = this.resources.items.sceneModel
    this.resource6 =  this.resources.items.hdr

    this.setGeometry()

    
  }
  
  
    

    setGeometry(){
  
    this.numPoints = 5000;
    this.points = [];
    this.derivatives = [];

    
    let radius = 1500

    function figureEightCurve(t) {

      let x = Math.sin(t * 2) * radius;
      let z = Math.cos(t) * radius;
      let y;

      
      
      let amplitude = 20;
      let frequency = 2; 
      function sigmoid(t) {
        return 1 / (1 + Math.exp(-t));
    }
       
      if(t >0 && t < Math.PI/2){
          
           y = Math.sin(Math.PI*t*t*t)*-Math.sqrt(60)*20  
      
      }


      /* if(t > Math.PI && t < 1.5*Math.PI){

        y = Math.sin(Math.PI*t*t)*40

      }*/

      


  return new THREE.Vector3(x, y, z).multiplyScalar(2);
  

  }
    
    function derivativeCurve(t) {
        const h = 0.0001;
        const dx = (figureEightCurve(t + h).x - figureEightCurve(t).x) / h;
        const dy = (figureEightCurve(t + h).y - figureEightCurve(t).y) / h;
        const dz = (figureEightCurve(t + h).z - figureEightCurve(t).z) / h;
    
        return new THREE.Vector3(dx, dy, dz);
    }
    
    
    for (let i = 0; i <= this.numPoints; i++) {
        let t = (i / this.numPoints) * Math.PI * 2;
        const point = figureEightCurve(t);
        this.points.push(point);
    
        const derivative = derivativeCurve(t);
        this.derivatives.push(derivative);
    }
    
    
    function calculateSurfaceArea(numPoints, derivativesArray) {
        let surfaceArea = 0;
    
        for (let i = 0; i < numPoints; i++) {
            const firstDerivative = derivativesArray[i];
    
            // For the last point, wrap around to the first derivative to close the loop
            const secondDerivative = (i === numPoints - 1) ? derivativesArray[0] : derivativesArray[i + 1];
    
            const crossProduct = new THREE.Vector3();
            crossProduct.crossVectors(firstDerivative, secondDerivative);
    
            const magnitude = crossProduct.length();
            surfaceArea += magnitude;
        }
    
        surfaceArea *= (Math.PI * 2) / numPoints;
    
        return surfaceArea;
    }
    
    const totalSurfaceArea = calculateSurfaceArea(this.numPoints, this.derivatives);
    console.log("Total Surface Area of the figure-eight curve:", totalSurfaceArea);
    


function getPointAboveCurve(t, distanceAbove) {

    const pointOnCurve = figureEightCurve(t);  
    const normalVector = derivativeCurve(t).normalize(); 

    const pointAboveCurve = new THREE.Vector3().copy(pointOnCurve).add(normalVector.multiplyScalar(distanceAbove));

    return pointAboveCurve;

  }

} 


    update() {

    }
   
        
    


}



