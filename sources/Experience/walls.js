import * as THREE from "three";
import Experience from "./Experience.js";
import EventEmitter from "./Utils/EventEmitter.js";
import GSAP from "gsap";
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise.js";
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { vertexShader } from "./vertex.js";
import { fragmentShader } from "./fragment.js";
import { VertexTangentsHelper } from "three/examples/jsm/helpers/VertexTangentsHelper.js";
import { Flow } from 'three/examples/jsm/modifiers/CurveModifier.js';
import RollerCoasterGeometry from './track1.js'
import { ViewHelper } from "three/examples/jsm/helpers/ViewHelper.js";
import { DecoratedTorusKnot5c } from "three/examples/jsm/curves/CurveExtras.js";
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
export default class Walls extends EventEmitter {
  constructor() {
    super();

    this.experience = new Experience();
    this.config = this.experience.config;
    this.debug = this.experience.debug;
    this.world = this.experience.world;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.renderer = this.experience.renderer;
    this.time = this.experience.time;
    this.controls = this.experience.controls;
    this.scene = this.experience.scene;
    this.scene2 = this.experience.scene2;
    this.mouse = this.experience.mouse;

    this.resource2 = this.resources.items.smoke;
    this.resource1 = this.resources.items.tacoBell;
    this.resource3 = this.resources.items.droneModel;
    this.resource4 = this.resources.items.buildingModel;

    /* this.mazeGroup = new THREE.Group();
    this.scene2.add(this.mazeGroup); */

    this.setModel();
   
    this.createWall();
    

    this.setRaycaster();

    

    /* this.CameraHelper = new ViewHelper(this.camera.instance);
    this.scene2.add(this.CameraHelper); */


    this.rotationSpeed = .005;
    this.movementSpeed = 5.0;
  
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  
    document.addEventListener("keydown", this.handleKeyDown)
    document.addEventListener("keyup", this.handleKeyUp)
  
  
    document.addEventListener("pointerdown", this.handleKeyDown)
    document.addEventListener("pointerup", this.handleKeyUp)
   
  
  
  this.arrowUpPressed = false;
  this.arrowLeftPressed = false;
  this.arrowRightPressed = false;
  
   
  
  
    
    }
  
  
    handleKeyDown(event) {
      if (event.key === 'ArrowUp') {
        this.arrowUpPressed = true;
      } else if (event.key === 'ArrowLeft') {
        this.arrowLeftPressed = true;
      } else if (event.key === 'ArrowRight') {
        this.arrowRightPressed = true;
      }
      }
      
       handleKeyUp(event) {
      if (event.key === 'ArrowUp') {
        this.arrowUpPressed = false;
      } else if (event.key === 'ArrowLeft') {
        this.arrowLeftPressed = false;
      } else if (event.key === 'ArrowRight') {
        this.arrowRightPressed = false;
      }
    
  }

  setModel() {

    this.model = this.resource3.scene;
    this.model.name = "droneModel";
    this.scene2.add(this.model);
    this.model.position.set(0, 0,0);
    this.model.rotation.set(0, 0, 0);
    this.model.scale.set(200,10,600)
    this.model.scale.setScalar(10);
    this.model.castShadow = true;
    this.model.receiveShadow = true;


     this.model2 = this.resource4.scene;
    this.model2.scale.setScalar(5)
    //this.scene2.add(this.model2);
    this.model2.castShadow = true;
    this.model2.position.y = -200;
    //this.model2.receiveShadow = true; 
   
    
    this.camera.instance.add(this.model)
    this.model.translateZ(-12)
    this.model.translateY(-3)

    this.meshes = [];
          this.model.traverse((object) => {
            if (object.isMesh) {
              this.meshes.push(object);
            } 
          });

        /*  this.meshes[0].material.map = this.resource1
         this.meshes[0].material.transparent = true
         this.meshes[0].material.opacity = .2 */

        
        }


   

  
        setRaycaster() {

          const label = document.createElement("div");
          label.style.position = "absolute";
          label.style.top = "10px";
          label.style.left = "10px";
          label.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
          label.style.color = "white";
          label.style.padding = "5px";
          label.style.fontFamily = "Arial";
          label.style.fontSize = "12px";
          label.style.pointerEvents = "none"; // Make sure the label doesn't interfere with mouse events
          document.body.appendChild(label);

          window.addEventListener("pointerdown", (event) => {
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(this.mouse, this.camera.instance);
        
            if (this.objectsArray1 && this.objectsArray2) {
              const intersects = raycaster.intersectObjects([...this.objectsArray1, ...this.objectsArray2]);
        
              if (intersects.length > 0) {
                this.point = intersects[0].object;

              this.label1 = this.objectsArray1.indexOf(this.point)
               this.label2 = this.objectsArray2.indexOf(this.point)
                
                this.scene2.remove(this.point);
        
             
                if (this.objectsArray1.includes(this.point)) {
                  this.objectsArray1.splice(this.objectsArray1.indexOf(this.point), 1);
                } else if (this.objectsArray2.includes(this.point)) {
                  this.objectsArray2.splice(this.objectsArray2.indexOf(this.point), 1);
                }

                
                this.removedPointArray = [];
                // this.removedPointArray.length = 0;
              
               this.removedPointArray.push(this.point);

              

              label.textContent = `Index: ${this.label1} ${this.label2 }`;
              
            } else {
             
              label.textContent = "";
            }
          
            }


          });
        }
        
        
        

          getPointAt2(t) {

           const radius = 150;
            const vector = new THREE.Vector3();
           
            const PI2 = Math.PI * 2;
            t = t * PI2;
    
            
            const x = Math.sin( t*2 ) *radius// Math.cos( t*2 ) * 100 ;
						const y = 0//Math.cos( t * 30 )// * 2 + Math.cos( t * 57 ) * 2 + 5;
						const z = Math.cos( t ) *radius //+ Math.sin( t  ) * 50; 

          
         
            return vector.set( x, y, z ).multiplyScalar( 2 );
          }
     
          getTangentAt2(t) {
            const vector2 = new THREE.Vector2();
            const delta = 0.0001;
            const t1 = Math.max(0, t - delta);
            const t2 = Math.min(1, t + delta);
    
            return vector2
              .copy(this.getPointAt2(t2))
              .sub(this.getPointAt2(t1))
              .normalize();

          } 
     

         
          
        
         

      createWall() {

        this.video = document.querySelector(".video");
        
        this.video.play();
    
        this.texture = new THREE.VideoTexture(this.video);

      this.shaderMaterial = new THREE.ShaderMaterial({
         extensions: {
          derivatives: "#extension GL_OES_standard_derivatives : enable"
        }, 
      side: THREE.DoubleSide,
      //VertexColors: true,
      transparent: true,
      
    
      uniforms: {

          resolution: { value: new THREE.Vector4() },
          progress: { value: 1.45 },
					time: { value: null },
					uvScale: { value: new THREE.Vector2( 3.0, 1.0 ) },
					uTexture: { value: this.resource2 },
					uDots: { value: this.resource2 },
          azimuth: { value: null },
      
      },

      vertexShader: vertexShader.vertexShader,
      fragmentShader: fragmentShader.fragmentShader,

    });

    this.resource1.wrapS = THREE.RepeatWrapping;

    this.resource1.wrapT = THREE.RepeatWrapping;

    this.resource1.repeat.set(1.5,1.5) 

    //this.resource1.rotation = Math.PI / 2;

    let number = 50;
    this.geometry = new THREE.PlaneGeometry(2,2, number, number);

    //this.geometry = new THREE.BufferGeometry()
    this.positions = new Float32Array(number * 3);
    this.randoms = new Float32Array(number * 3);
    this.sizes = new Float32Array(number * 1);

     for (let i = 0; i < number*3; i++) {
     this.positions[i + 0] = (Math.random() - 0.5);
     this.positions[i + 1] = (Math.random() - 0.5);
     this.positions[i + 2] = (Math.random() - 0.5); 

      this.randoms[i + 0] = Math.random();
      this.randoms[i + 1] = Math.random();
      this.randoms[i + 2] = Math.random();

      this.sizes[i + 0] = 0.5 + 0.5*Math.random(); 
      
    }

    this.geometry.setAttribute(
      "positions",
      new THREE.BufferAttribute(this.positions, 3)
    );
    this.geometry.setAttribute(
      "aRandom",
      new THREE.BufferAttribute(this.randoms, 3)
    );
    this.geometry.setAttribute(
      "size",
      new THREE.BufferAttribute(this.sizes, 1)
    ); 




    this.plane = new THREE.Points(this.geometry, this.shaderMaterial)
    //this.scene2.add(this.plane);
    this.plane.scale.setScalar(250)
   

   
   
   

    const numPoints = 2000; 

   this.spline = new THREE.CatmullRomCurve3([]);

   

     for (let i = 0; i < numPoints; i++) {
        const t = i / (numPoints - 1);
        this.spline.points.push(this.getPointAt2(t));
    }
    const pos3 = this.spline.getSpacedPoints(100)

    console.log(this.spline) 
  
    /* this.spline.curveType = 'catmullrom';
    this.spline.closed = true;
    this.spline.uniform = true;
       
    this.spline.tension  = .9;
    this.spline.needsUpdate = true
    this.spline.updateArcLengths(); */

    //console.log(this.spline.getPointAt())
 
    this.tubeGeo = new THREE.TubeGeometry(this.spline, 100, 3.4, 100, true);
    this.tube = new THREE.Points(this.tubeGeo, this.shaderMaterial);
    //this.scene2.add(this.tube);
    this.tube.scale.setScalar(100); 
+ 
      this.tubeGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(this.positions, 3)
    );
    this.tubeGeo.setAttribute(
      "aRandom",
      new THREE.BufferAttribute(this.randoms, 3)
    );
    this.tubeGeo.setAttribute(
      "size",
      new THREE.BufferAttribute(this.sizes, 1)
    ); 

        
   

          this.sphere = new THREE.Mesh(

           //put glass on top of each wall

           new THREE.BoxGeometry(7.0,8.0,.25),

           //new THREE.BufferGeometry().setFromPoints(this.curve.getPoints(100)),

                new THREE.MeshBasicMaterial({

             map: this.resource2,
             side: THREE.DoubleSide,
             transparent: true,
             opacity: .7,
           //matcap: this.resource2,
                //vertexColors: true,
   
           //this.shaderMaterial
          }) )







         

          this.sphere.scale.setScalar(5)
         
        
         
       
          this.sphere2 = new THREE.Mesh(

           
 
            new THREE.SphereGeometry(1,36,36),
 
          
 
            new THREE.MeshBasicMaterial({
 
              map: this.resource1,
              side: THREE.DoubleSide,
              transparent: true,
              opacity: .01,
             
 
            }) 
            
          )

          //this.sphere2.rotation.x += Math.PI/2
          //this.sphere2.scale.setScalar(3)

         
    const numObjects = 150; // Number of objects to place on each side
    this.spacing = 30; // Adjust this value for spacing
    this.scaleFactor = 1.0;

    this.objectsArray1 = [];
    this.objectsArray2 = [];

    for (let i = 0; i < numObjects; i++) {

    const t = i / (numObjects - 1); // Ranges from 0 to 1

    const positionOnCurve = this.spline.getPointAt(t);
    this.tangent = this.spline.getTangentAt(t);

     
      //this.sphere2Clone = this.sphere2.clone()

     
  
    const referenceVector = new THREE.Vector3(0, 4, 0); 
    const normal = new THREE.Vector3();
    normal.crossVectors(referenceVector, this.tangent).normalize();

   
    this.offset = normal.clone().multiplyScalar(this.spacing * (i % 2 === 0 ? 1.5 : -1.5));

    const angle = Math.atan2(this.tangent.x, this.tangent.z);


    //this.sphere2Clone.position.copy(positionOnCurve)
     
    //his.scene2.add(this.sphere2Clone)
    
    this.positionLeft = positionOnCurve.clone().add(this.offset);
    this.positionRight = positionOnCurve.clone().sub(this.offset);

    this.sphereLeft = this.model2.clone();
    this.sphereLeft.isWall = true
    this.sphereLeft.position.copy(this.positionLeft.multiplyScalar(this.scaleFactor));

    
   
    this.sphereLeft.setRotationFromAxisAngle(new THREE.Vector3(0, 1, 0), angle + Math.PI/2);

    this.objectsArray1.push(this.sphereLeft)
    this.scene2.add(this.sphereLeft);

   
    
    
    


    this.sphereRight = this.sphere.clone();
    this.sphereRight.isWall = true
    this.sphereRight.position.copy(this.positionRight.multiplyScalar(this.scaleFactor));


    this.sphereRight.setRotationFromAxisAngle(new THREE.Vector3(0, 1, 0), angle + Math.PI/2);

    this.objectsArray1.push(this.sphereRight)
    this.scene2.add(this.sphereRight);

    this.scene2.remove(this.objectsArray1[223])
    this.scene2.remove(this.objectsArray1[219])
    this.scene2.remove(this.objectsArray1[226])
    this.scene2.remove(this.objectsArray1[79])
    this.scene2.remove(this.objectsArray1[75])
    this.scene2.remove(this.objectsArray1[73])
    this.scene2.remove(this.objectsArray1[69])
    this.scene2.remove(this.objectsArray1[229])
    this.scene2.remove(this.objectsArray1[225])
    //this.scene2.remove(this.objectsArray1[219])


   



}

    



   

        }
        






  update() {

    
 
     
    
    
 
  
    this.shaderMaterial.uniforms.time.value = this.time.elapsed * 5.0;

    const looptime = 20 ;
    const t = (this.time.elapsed % looptime) / looptime;
    const t2 = ((this.time.elapsed + .000001) % looptime) / looptime;

    const pos = this.spline.getPointAt(t);
    const pos2 = this.spline.getPointAt(t2);

    const tangent = this.spline.getTangentAt(t);

   
     this.model.rotation.z =this.camera.azimuth * .05 + Math.PI
     this.model.rotation.y =this.camera.azimuth * .2 + Math.PI
     //this.model.rotation.x =this.camera.azimuth * .05 

     //this.camera.instance.rotation.z +=this.camera.azimuth * .5 + Math.PI

    const maxZ = 0
    const spacing = 100;

    
    


      if( this.removedPointArray){

    this.objectsArray1.filter((object) => {
      const dist = 10.0;

      

      if ( this.removedPointArray.length === 0) {
        return true; 
    }
  
      if (! this.removedPointArray.includes(object)) {
          while (this.model.position.distanceTo(object.position) < dist) {
              const away = this.model.position.clone().sub(object.position).normalize().multiplyScalar(0.4);
              this.model.position.add(away);
              this.model.rotation.y += Math.PI/2 * this.time.delta;
          }
          return true;
      }
  
          return false;
  });
  
  this.objectsArray2.filter((object) => {
      const dist = 10.0;

        if ( this.removedPointArray.length === 0) {
        return true; 
    }
  
      if (! this.removedPointArray.includes(object)) {
          while (this.model.position.distanceTo(object.position) < dist) {
              const away = this.model.position.clone().sub(object.position).normalize().multiplyScalar(0.4);
              this.model.position.add(away);
          }
          return true;
      }
  
          return false;
  });
  
}

this.camera.instance.position.copy(pos)
this.camera.instance.lookAt(pos2  )


    if (this.arrowLeftPressed) {
    this.model.rotation.y += Math.PI/2 *.08 //this.rotationSpeed;
    this.model.position.x -= Math.PI/2 *.4
    }
    if (this.arrowRightPressed) {
    this.model.rotation.y -= Math.PI/2 *.08//this.rotationSpeed;
    this.model.position.x += Math.PI/2 *.4
    }


    if (this.arrowUpPressed) {
      this.forwardVector = new THREE.Vector3(0, 0, 1);
      this.forwardDirection = this.forwardVector.clone();
      this.forwardDirection.applyQuaternion(this.model.quaternion);
      //this.model.position.add(this.forwardDirection.multiplyScalar(this.movementSpeed));
     
    } 

   
    this.meshes.forEach((mesh) => {



      if (mesh.name.startsWith('Plane') && mesh.name != 'Plane054')  {
  
       this.circles = mesh
       this.circles.rotation.y += Math.PI/2 * this.time.delta;
  
      
      }
  
     /*  if(mesh.name.includes('Drone_Camera')){
  
        this.droneCamera = mesh
  
        this.droneCamera.scale.x = this.data
  
        //console.log(this.data)
  
       } */
  
    });

    
      }

    }