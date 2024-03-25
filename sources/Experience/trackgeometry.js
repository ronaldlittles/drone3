import * as THREE from "three";
import Experience from "./Experience.js";
import EventEmitter from "./Utils/EventEmitter.js";
import { TTFLoader } from "three/examples/jsm/loaders/TTFLoader.js";
import { Water } from 'three/examples/jsm/objects/Water.js';
import { FontLoader, Font } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js"
import TShirt from "./tshirt.js";
//import { vertexShader } from "./shaders/vertex.js";
//import { fragmentShader } from "./fragment.js";
import GSAP from 'gsap';
import { Vector3 } from "three";
import { VertexTangentsHelper } from "three/examples/jsm/helpers/VertexTangentsHelper.js";
import { bindVertexBufferToProgramAttribute } from "@tensorflow/tfjs-backend-webgl/dist/webgl_util.js";
import ShaderTest from "./shadertest.js";
import vertexShaders from "./shaders/vertex.glsl"
import fragmentShaders from "./shaders/fragment.glsl"


export default class TrackGeometry extends EventEmitter {

  constructor() {

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
  
    this.resource1 = this.resources.items.me;
    this.resource2 = this.resources.items.fluffy;
    this.resource3 = this.resources.items.sceneModel
    this.resource6 =  this.resources.items.hdr
    this.resource4 = this.resources.items.baloonsModel;
    this.resource5 = this.resources.items.buildingModel;
    this.resource7 = this.resources.items.riot
    this.setShader()
    this.setGeometry()
    this.setGeometry2()
    this.setCirlces()


    
    

    }

    setShader(){

      this.terrainShader = new THREE.ShaderMaterial({

        transparent: true,
        side: THREE.DoubleSide,
        
        uniforms: {
  
          time: { value: 1.0 },

          vTangent: { value: new THREE.Vector3() },
         
          texture1: { value: this.renderer.renderTarget2.texture },
          texture2: this.resource1,
        },
     
        vertexShader: vertexShaders,
        fragmentShader: fragmentShaders,
      })

      this.terrain = new THREE.Mesh(

      new THREE.PlaneGeometry(2,2,1024,1024), this.terrainShader


    )

    this.terrainShader.uniforms.needsUpdate = true;

console.log(this.terrainShader.uniforms.vTangent)

    this.scene.add(this.terrain)
    //this.scene2.add(this.terrain)
    this.terrain.scale.setScalar(3000)
    //this.terrain.position.set(0,-100,0)
    this.terrain.rotation.x += Math.PI/2
    


    }



    setCirlces(){


// Array to hold torus geometries
 var torusGeometries = [];
 this.toruses =[];

// Create 20 torus geometries with decreasing radii
for (var i = 0; i < 20; i++) {
    var radius = 1 - (i * 0.05);
    var tubeRadius = 0.009;
    var radialSegments = 64;
    var tubularSegments = 64;

    var geometry = new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubularSegments);
    torusGeometries.push(geometry);
}

// Create materials for the toruses
var material = new THREE.MeshBasicMaterial({ map: this.renderer.renderTarget.texture, transparent: true, opacity:.5 });

// Create meshes for each torus geometry and position them inside each other
for (var i = 0; i < torusGeometries.length; i++) {
    this.torus = new THREE.Mesh(torusGeometries[i], material);
    this.offsetY = Math.sin(this.time.elapsed *i*15)*.5
    this.torus.position.set(0, this.offsetY, 200); // You can adjust the position as needed
    //this.scene.add(this.torus);
    this.torus.scale.setScalar(100)
    this.toruses.push(this.torus)
    
}



let distance = 10;

/*GSAP.to(this.toruses.position, {

  z: -50,
  ease: 'sine.inOut',
  stagger:{ each: .5, from: 'center', repeat: -1, yoyo: true}, 

});*/



    }

  
    setGeometry2(){

    const points = [];
    const R = 600; // Large circle radius
    const A = 5;  // Amplitude of the winding
    const B = 135;   // Amplitude of the humps
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
    this.geometry = new THREE.TubeGeometry(this.curve, segments, 12, 8, false);
    const material = new THREE.PointsMaterial({
       //color: 0x0000ff,
     map: this.resource1,
       transparent: true,
        opacity: .5,
        side: THREE.DoubleSide,
        //wireframe: true,
      size: 0.001
      
      });

    this.mesh = new THREE.Mesh(this.geometry, material);
    this.scene.add(this.mesh);

    //this.geometry.computeVertexNormals()

    //this.geometry.attributes.normal.array.onUploadCallback(dispose)
  

    console.log(this.geometry)

    //this.mesh.visible = false;
    
    //this.mesh.scale.setScalar(5);
    
this.mesh2 = new THREE.Mesh(new THREE.SphereGeometry(1,36,36), new THREE.MeshBasicMaterial({map: this.resource1}));
this.scene.add(this.mesh2);
this.mesh2.scale.setScalar(200);
this.mesh2Clone = this.mesh2.clone();

this.buildingModel = this.resource5.scene

this.buildingModel.scale.setScalar(50);

//this.scene.add(this.buildingModel);

this.baloons = [];

for(let i = 0; i < 100; i++){


this.baloonsModel = this.resource4.scene.clone();

this.baloonsModel.scale.setScalar(300);

//this.baloonsModel.position.set(Math.random()*1000, Math.random()*1000, Math.random()*1000);

//this.scene.add(this.baloonsModel);

this.baloons = this.baloonsModel


//console.log(this.renderer.renderTarget.texture)

}





const text = new TTFLoader()

    text.load( '/assets/ProtestRiot-Regular.ttf', function ( json ) {  

      const font = new Font(json)

      console.log(font)
      let textGeometry = new TextGeometry( 'Ronald Littles', {
        font: font,
        size: 300,
        height: 10,
  
        curveSegments: 10,
        bevelEnabled: true,
        bevelThickness: 50,
        bevelSize: 2,
        bevelOffset: 2,
        bevelSegments: 10,


      })
    

      this.textMaterial = new THREE.MeshStandardMaterial({ color: 'blue' })
      this.textGeometry = new THREE.Mesh( textGeometry,  this.terrainShader )
      this.scene.add( this.textGeometry )
      this.textGeometry.position.set(-1200, 0, 0)
    

    }.bind(this) );



this.light = new THREE.AmbientLight(0xffffff, 1);
this.light.position.set(0, 1500, 0);
this.scene.add(this.light);

this.light2 = new THREE.DirectionalLight(0xffffff, 1);

this.light2.position.set(600, 0, 0);

//.scene.background = this.resource2;


    }
    

    setGeometry(){
  
    this.numPoints = 5000;
    this.points = [];
    this.derivatives = [];

    
    let radius = 2500

    function figureEightCurve(t) {

      let x,y,z;


/*const points = [];
const numPoints = 100;
for (let i = 0; i <= numPoints; i++) {
    const t = (i / numPoints) * Math.PI * 2; // Parametric parameter
    const x = Math.sin(t);
    const y = Math.sin(2 * t);
    const z = Math.cos(2 * t);
    points.push(new THREE.Vector3(x, y, z));
}*/


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
      let speed = 2.5;


      
      let  t =  (speed * this.time.elapsed)/loopTime % 1;
      let t2 =  (speed * this.time.elapsed + 1.5)/loopTime % 1;

      let pos = this.curve.getPointAt(t);
      let pos2 = this.curve.getPointAt(t2)

      let upVector = new THREE.Vector3(0, 1, 0);

      this.tangent = this.curve.getTangentAt(t).normalize();
      let normal = new THREE.Vector3().crossVectors(this.tangent, upVector).normalize();
      let binormal = new THREE.Vector3().crossVectors( this.tangent,normal).normalize();
      let distanceAbove = 100;
      //let pointAbove = getPointAboveCurve(t, distanceAbove);
      //this.camera.instance.position.copy(pos)
      //this.camera.instance.lookAt(pos2);

      this.terrainShader.uniforms.vTangent.value = this.tangent

      this.mesh2added=false

      if(!this.mesh2added ){

      this.scene.add(this.mesh2);
      this.mesh2added = true;

      }
       
      this.offset = new THREE.Vector3(0, -5, 0);
      this.offset2 = new THREE.Vector3(0, -800, -5000);
      this.mesh2.position.copy(pos2).add(this.offset);


      let delay =3.8;

      

        

        



        //this.baloons.position.x = delay +(Math.random()*1000 - 500);

       // this.baloons.rotation.y += 0.01;

      //element.position.y =t+(Math.random() * 1000 - 500);

        //element.position.z =  Math.random() * 1000 - 500;

        

        

       // element.scale.setScalar(100*Math.random(t));

        



//this.terrainShader.uniforms.time.value += this.time.elapsed * 2.5
        
    



//this.light2.position.copy(pos)

      /* let tangentHelper = new THREE.ArrowHelper(tangent, pos, 35, 0xff0000); // Red for tangent
      let normalHelper = new THREE.ArrowHelper(normal, pos, 100, 0x00ff00); // Green for normal
      let binormalHelper = new THREE.ArrowHelper(binormal, pos, 10, 0x0000ff); // Blue for binormal
  
  
  
    
  tangentHelper.position.copy(pos2);
  tangentHelper.setDirection(tangent);
  normalHelper.position.copy(pos);
  normalHelper.setDirection(new THREE.Vector3(0,1,0));
  binormalHelper.position.copy(pos2);
  binormalHelper.setDirection(binormal);
  */
      
     // this.scene.add(tangentHelper);
     //this.scene.add(normalHelper);
      //this.scene.add(binormalHelper);
   



}

}

