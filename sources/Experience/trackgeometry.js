import * as THREE from "three";
import Experience from "./Experience.js";
import EventEmitter from "./Utils/EventEmitter.js";

import { TTFLoader } from "three/examples/jsm/loaders/TTFLoader.js";
import { Water } from 'three/examples/jsm/objects/Water.js';
import { FontLoader, Font } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js"


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
    
    this.resource4 = this.resources.items.baloonsModel;

    
    this.resource5 = this.resources.items.buildingModel;
    this.resource7 = this.resources.items.riot

    this.setGeometry()
    this.setGeometry2()

    
 
    
  }
  
  setGeometry2(){

    const points = [];
    const R = 300; // Large circle radius
    const A = 5;  // Amplitude of the winding
    const B = 15;   // Amplitude of the humps
    const k = 25;   // Frequency of the winding
    const m = 10;   // Frequency of the humps
    const phi = 0; // Phase shift for the humps
    const segments = 3000; // Number of segments for smoothness
    
    for (let i = 0; i <= segments; i++) {
        let theta = (i / segments) * 2 * Math.PI; // Full circle
        let r = R + A * Math.sin(k * theta); // Modulated radius for winding
        let y = B * Math.sin(m * theta + phi); // Y for humps
        let x = r * Math.cos(theta);
        let z = r * Math.sin(theta);
        points.push(new THREE.Vector3(x, y, z).multiplyScalar(2))
    }
    
    this.curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(this.curve, segments, 12, 8, false);
    const material = new THREE.PointsMaterial({
       //color: 0x0000ff,
      // map: this.resource2,
       transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
        //wireframe: true,
      size: 0.001
      
      });
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    geometry.computeVertexNormals();
    

    console.log(this.mesh)

    //this.mesh.visible = false;
    
    //this.mesh.scale.setScalar(5);
    
this.mesh2 = new THREE.Mesh(new THREE.SphereGeometry(1,36,36), new THREE.MeshBasicMaterial({map: this.resource6}));
//this.scene.add(this.mesh2);
this.mesh2.scale.setScalar(10);
this.mesh2Clone = this.mesh2.clone();

this.buildingModel = this.resource5.scene

this.buildingModel.scale.setScalar(50);

this.scene.add(this.buildingModel);

this.baloons = [];

for(let i = 0; i < 100; i++){


this.baloonsModel = this.resource4.scene.clone();

this.baloonsModel.scale.setScalar(300);

//this.baloonsModel.position.set(Math.random()*1000, Math.random()*1000, Math.random()*1000);

this.scene.add(this.baloonsModel);

this.baloons = this.baloonsModel




}





const text = new TTFLoader()
    text.load( '/assets/ProtestRiot-Regular.ttf', function ( json ) {  

      const font = new Font(json)

      console.log(font)
      let textGeometry = new TextGeometry( 'Ronald Littles', {
        font: font,
        size: 100,
        height: 10,
  
        curveSegments: 10,
        bevelEnabled: true,
        bevelThickness: 50,
        bevelSize: 2,
        bevelOffset: 2,
        bevelSegments: 5,


      })
    

      this.textMaterial = new THREE.MeshStandardMaterial({ color: 'blue' })
      this.textGeometry = new THREE.Mesh( textGeometry, this.world.walls.shaderMaterial  )
      this.scene.add( this.textGeometry )
      this.textGeometry.position.set(0, 0, 0)

    }.bind(this) );



this.light = new THREE.AmbientLight(0xffffff, 1);
this.light.position.set(0, 1500, 0);
this.scene.add(this.light);

this.light2 = new THREE.DirectionalLight(0xffffff, 1);

this.light2.position.set(600, 0, 0);

this.scene.background = this.resource6;


  }
    

    setGeometry(){
  
    this.numPoints = 5000;
    this.points = [];
    this.derivatives = [];

    
    let radius = 2500

    function figureEightCurve(t) {

      let x,y,z;

      

       x = Math.sin(t ) * radius;
       z = (Math.sin(t) * Math.cos(t)) * radius;
       y=0

       
      if(t >= (8*Math.PI/10) && t <= (12* Math.PI/10)){
          let a = (t-8 *Math.PI/10)* (Math.PI/ (12*Math.PI/10 - 8*Math.PI/10))

           y= Math.sin(a*3)* radius/6
      
      }
 
    
    
   /* else 
      if(t > 3*Math.PI && t < 4*Math.PI){

        y =100// Math.sin(Math.PI*t*t)*40

      

      //x = -Math.sin(t * 2) * radius
      //z = -Math.cos(t) * radius
      //y = Math.sin(Math.PI*t*t)*40

    }*/


  return new THREE.Vector3(x, y, z)//.multiplyScalar(2);
  

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
    
        const derivative = derivativeCurve(t).normalize();
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
    this.normalVector = derivativeCurve(t).normalize(); 

    

    const pointAboveCurve = new THREE.Vector3().copy(pointOnCurve).add(normalVector.multiplyScalar(distanceAbove));

    return pointAboveCurve

  }

  

} 


    update() {

      let loopTime = 60;
      let speed = .5;


      
      let  t =  (speed * this.time.elapsed)/loopTime % 1;
      let t2 =  (speed * this.time.elapsed + 1.5)/loopTime % 1;

      let pos = this.curve.getPointAt(t);
      let pos2 = this.curve.getPointAt(t2)

      let upVector = new THREE.Vector3(0, 1, 0);

      let tangent = this.curve.getTangentAt(t).normalize();
      let normal = new THREE.Vector3().crossVectors(tangent, upVector).normalize();
      let binormal = new THREE.Vector3().crossVectors( tangent,normal).normalize();
      let distanceAbove = 100;
      //let pointAbove = getPointAboveCurve(t, distanceAbove);
      //this.camera.instance.position.copy(pos)
      //this.camera.instance.lookAt(pos2);

      this.mesh2added=false
if(!this.mesh2added ){
      this.scene.add(this.mesh2);
      this.mesh2added = true;
}
       
      this.offset = new THREE.Vector3(0, -5, 0);
      this.offset2 = new THREE.Vector3(0, -800, -5000);
      this.mesh2.position.copy(pos).add(this.offset);


      let delay =3.8;

      

        

        



        this.baloons.position.x = delay +(Math.random()*1000 - 500);

        this.baloons.rotation.y += 0.01;

      //element.position.y =t+(Math.random() * 1000 - 500);

        //element.position.z =  Math.random() * 1000 - 500;

        

        

       // element.scale.setScalar(100*Math.random(t));

        




        
    



//this.light2.position.copy(pos)

       let tangentHelper = new THREE.ArrowHelper(tangent, pos, 35, 0xff0000); // Red for tangent
      let normalHelper = new THREE.ArrowHelper(normal, pos, 10, 0x00ff00); // Green for normal
      let binormalHelper = new THREE.ArrowHelper(binormal, pos, 10, 0x0000ff); // Blue for binormal
  
  
  
    
  tangentHelper.position.copy(pos2);
  tangentHelper.setDirection(tangent);
  normalHelper.position.copy(pos2);
  normalHelper.setDirection(normal);
  binormalHelper.position.copy(pos2);
  binormalHelper.setDirection(binormal);
  
      
      this.scene.add(tangentHelper);
     this.scene.add(normalHelper);
      this.scene.add(binormalHelper);
   

      //this.camera.instance.position.copy(point).add(tangent.multiplyScalar(100));

    }
   
        
    


}



