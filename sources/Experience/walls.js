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

    this.resource2 = this.resources.items.road;
    this.resource1 = this.resources.items.forrest;
    this.resource3 = this.resources.items.droneModel;
    this.resource4 = this.resources.items.buildingModel;
    this.resource5 = this.resources.items.fenceModel;

   console.log(this.tangent)

    this.setModel();
   
    this.createWall();
    

    this.setRaycaster();

    

    /* this.CameraHelper = new ViewHelper(this.camera.instance);
    this.scene2.add(this.CameraHelper); */

    this.depth = 50;
    this.rotationSpeed = .005;
    this.movementSpeed = .1;
  
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
    //this.scene2.add(this.model);
    this.model.position.set(0, 2.5,-10);
    this.model.rotation.set(0, 0, 0);
    this.model.scale.set(200,10,600)
    this.model.scale.setScalar(10);
    this.model.castShadow = true;
    this.model.receiveShadow = true;
    //this.model.upVector = new THREE.Vector3(0, 1, 0);


    this.group = new THREE.Group();
    this.scene2.add(this.group)
    this.group.add(this.model)
   

     this.model2 = this.resource4.scene;
    this.model2.scale.setScalar(5)
    //this.scene2.add(this.model2);
    this.model2.castShadow = true;
    this.model2.position.y = -200;
    //this.model2.receiveShadow = true; 

    this.model3 = this.resource5.scene;
    
    this.model3.scale.setScalar(10)
    //this.scene3.add(this.model3);
    this.model3.castShadow = true;
    this.model3.position.y = -300;
    //this.model3.receiveShadow = true; 
   
    
    this.camera.instance.add(this.model)
    this.model.translateZ(-12)
    this.model.translateY(-1)
   
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

            const elevation = 15.5;
            const radius = 155;
            const vector = new THREE.Vector3();
           
            const PI2 = Math.PI * 2;
            t = t * PI2;
    
            
            const x = Math.sin( t*2 ) *radius //+ Math.cos( t*2 ) * 100 ;
						const y = Math.cos( t * 10 )//+10//  * elevation //+ Math.cos( t * 57 ) * 2 + 5;
						const z = Math.cos( t  ) *radius// + Math.cos( t  ) ; 

          
         
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
      VertexColors: true,
      //transparent: true,
      
    

      uniforms: {

          
					time: { value: null },
					uvScale: { value: new THREE.Vector2( 3.0, 1.0 ) },
					uTexture: { value: this.resource2 },
					
          azimuth: { value: this.camera.azimuth},
         tangent: { value: this.angle },
      },

      vertexShader: vertexShader.vertexShader,
      fragmentShader: fragmentShader.fragmentShader,

    });

  

    this.resource1.wrapS = THREE.RepeatWrapping;

    this.resource1.wrapT = THREE.RepeatWrapping;

    this.resource1.repeat.set(1,1) 

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
   

   
   
   

    const numPoints = 200; 

   this.spline = new THREE.CatmullRomCurve3([]);
  
   

     for (let i = 0; i < numPoints; i++) {
        const t = i / (numPoints - 1);
        this.spline.points.push(this.getPointAt2(t));
    }
   
   
 
  
const racetrackShape = new THREE.Shape();



racetrackShape.moveTo(0, -60);

racetrackShape.lineTo(2,-60); 
racetrackShape.lineTo(0, 60);
racetrackShape.lineTo(0, -60);


 





    

    this.extrudeSettings = {
      steps: 500,
      depth: 20,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: .5,
      bevelOffset: 0,
      bevelSegments: 1,
      extrudePath: this.spline,

    }
    
 
    this.tubeGeo = new THREE.ExtrudeGeometry(racetrackShape, this.extrudeSettings);
    this.tube = new THREE.Mesh(this.tubeGeo,   /* new THREE.MeshBasicMaterial({

      map: this.texture,
       //envMap: this.scene2.background,
       side: THREE.DoubleSide,
       transparent: true,
       opacity: 1,
    
          //vertexColors: true,

    
    })    */

    this.shaderMaterial
    )
    this.scene2.add(this.tube);
    //this.tube.scale.set(1,0,0);
    this.tube.position.y =-20  
  //this.tube.rotation.x =-25
    /* this.tube.material.wrapS =  THREE.RepeatWrapping;
    this.tube.material.wrapT =  THREE.RepeatWrapping;
    this.tube.material.repeat.set(22.5,22.5) */
    
     /*    this.tubeGeo.setAttribute(
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
    );    */

        
   

          this.sphere = new THREE.Mesh(

           

           new THREE.BoxGeometry(100,100,100),

           

                   new THREE.MeshStandardMaterial({
               
            map: this.texture, 
             side: THREE.DoubleSide,
             transparent: true,
             opacity: .2,
           
            vertexColors: false, 
               
   
           //this.shaderMaterial

          }) 
          )

this.sphere.scale.setScalar(145)
this.scene2.add(this.sphere)

this.sphere.position.z = 0

         

         
         
        
         
       
          this.sphere2 = new THREE.Mesh(

           
 
            new THREE.PlaneGeometry(7,8,2),
 
          
 
            new THREE.MeshNormalMaterial({
              //normalMap: this.resource1,
              //normalScale: new THREE.Vector2( .001, .001 ),
              bumpMap: this.resource1,
              //bumpScale: new THREE.Vector2( 1, 1 ),
              side: THREE.DoubleSide,
              transparent: true,
              opacity: 1.0,
              //color: 'purple',
              //vertexColors: THREE.VertexColors,
              //vertexColors: true

            }) 
            
          )

          //this.sphere2.rotation.x = Math.PI/2*.01
          this.sphere2.scale.setScalar(6)

         
    const numObjects = 150; // Number of objects to place on each side
    this.spacing = 30; // Adjust this value for spacing
    this.scaleFactor = 1.0;

    this.objectsArray1 = [];
    this.objectsArray2 = [];

    for (let i = 0; i < numObjects; i++) {

    const t = i / (numObjects - 1); // Ranges from 0 to 1

   
    const positionOnCurve = this.spline.getPointAt(t);
    this.tangent = this.spline.getTangentAt(t);

    
   
     
     
  
    const referenceVector = new THREE.Vector3(0, 1, 0); 
   this.normal = new THREE.Vector3();
    this.normal.crossVectors(referenceVector, this.tangent).normalize();
   this.binormal = new THREE.Vector3();
    this.binormal.crossVectors(referenceVector, this.normal).normalize();

   
    this.offset = this.normal.clone().multiplyScalar(this.spacing * (i % 2 === 0 ? 1.5 : -1.5));

    const angle = Math.atan2(this.tangent.x , this.tangent.z );
    const angle2 = Math.atan2(this.model.position.x, this.camera.instance.position.x)

    /* this.sphere2Clone = this.sphere2.clone()
    this.sphere2Clone.position.copy(positionOnCurve.clone() )
     
    this.scene2.add(this.sphere2Clone) */
    
    this.positionLeft = positionOnCurve.clone().add(this.offset);
    this.positionRight = positionOnCurve.clone().sub(this.offset);

    this.sphereLeft = this.model2.clone();
    this.sphereLeft.isWall = true
    this.sphereLeft.position.copy(this.positionLeft.multiplyScalar(this.scaleFactor));

   
    this.sphereLeft.setRotationFromAxisAngle(new THREE.Vector3(0, 1, 0), angle+ Math.PI/2 );

    this.objectsArray1.push(this.sphereLeft)
    this.scene2.add(this.sphereLeft);

console.log(this.positionRight.y)
    this.sphereRight = this.sphere2.clone();
    this.sphereRight.isWall = true
    this.sphereRight.position.copy(this.positionRight.multiplyScalar(this.scaleFactor));
  //this.sphereRight.position.y = this.positionRight.y  + 10

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

   

    

    this.movementSpeed += .1;
this.extrudeSettings.depth = this.movementSpeed


    const looptime = 20 ;
    const t = ((this.time.elapsed ) % looptime) / looptime;
    const t2 = ((this.time.elapsed + .01) % looptime) / looptime;

    const pos = this.spline.getPointAt(t);
    const pos2 = this.spline.getPointAt(t2);
  
    const tangent = this.spline.getTangentAt(t);

    this.angle = Math.atan2(tangent.x , tangent.z );

    //this.model.rotation.y = Math.PI + tangent.x -tangent.z
  
    const maxZ = 0
    const spacing = 100;

    if (this.removedPointArray) {
      this.objectsArray1.forEach((object) => {
          const dist = 200.0;
  
          if (!this.removedPointArray.includes(object)) {
              const distance = this.model.position.distanceTo(object.position);
  
              if (distance < dist) {
                  // Calculate the displacement vectors for both objects
                  const awayFromModel = this.model.position.clone().sub(object.position).normalize().multiplyScalar(1.4);
                  const towardsModel = object.position.clone().sub(this.model.position).normalize().multiplyScalar(0.4);
  
                  // Move objects away from each other
                  object.position.add(awayFromModel);
                  this.model.position.add(towardsModel);
              }
          }
      });
  
     /*  this.objectsArray2.forEach((object) => {
          const dist = 10.0;
  
          if (!this.removedPointArray.includes(object)) {
              const distance = this.model.position.distanceTo(object.position);
  
              if (distance < dist) {
                  // Calculate the displacement vectors for both objects
                  const awayFromModel = this.model.position.clone().sub(object.position).normalize().multiplyScalar(0.4);
                  const towardsModel = object.position.clone().sub(this.model.position).normalize().multiplyScalar(0.4);
  
                  // Move objects away from each other
                  object.position.add(awayFromModel);
                  this.model.position.add(towardsModel);
              }
          }
      });*/
  } 
  
//Camera Move
 this.camera.instance.position.copy(pos)
this.camera.instance.lookAt(pos2)
//this.camera.instance.rotation.set(tangent.x*.1,pos.y,tangent.z*.1)
//this.camera.instance.position.y = 30.5








this.shaderMaterial.uniforms.tangent.value = this.angle


console.log(this.shaderMaterial.uniforms.tangent.value )
//const maxRotationAngle = THREE.MathUtils.degToRad(45);

 const angleToRotate = THREE.MathUtils.degToRad(-45)
 
   
    const desiredRotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), angleToRotate);

   
    const maxRotation = new THREE.Quaternion().slerp(desiredRotation, 0.1); 
 
   
    //this.model.quaternion.copy(maxRotationAngle);

this.model.rotation.y =  -Math.PI +this.camera.azimuth * .2
this.model.rotation.z = Math.PI + this.camera.azimuth * .2//this.rotationSpeed;
this.model.rotation.x = -Math.PI + pos.y *.019

  this.forwardVector2 = new THREE.Vector3(1, 0, 0);
    this.forwardDirection2 = this.forwardVector2.clone();
    this.forwardDirection2.applyQuaternion(this.model.quaternion).add(maxRotation).normalize();
    //this.model.rotation.add(this.forwardDirection2.multiplyScalar(this.movementSpeed));

    this.forwardVector3 = new THREE.Vector3(-1,0, 0);
    this.forwardDirection3 = this.forwardVector3.clone();
    this.forwardDirection3.applyQuaternion(this.model.quaternion).add(maxRotation).normalize();

    if (this.arrowLeftPressed) {
    //this.model.rotation.z -= Math.PI/4 //* tangent.x //this.rotationSpeed;
    
    this.model.position.add(this.forwardDirection2.multiplyScalar(this.movementSpeed));
    }
    if (this.arrowRightPressed) {
    //this.model.rotation.z +=   Math.PI/4 //* tangent.x//this.rotationSpeed;
   
    this.model.position.add(this.forwardDirection3.multiplyScalar(this.movementSpeed));
    } 


    if (this.arrowUpPressed) {

      this.forwardVector = new THREE.Vector3(0, 0, 1);
      this.forwardDirection = this.forwardVector.clone();
      this.forwardDirection.applyQuaternion(this.model.quaternion);
      this.model.position.add(this.forwardDirection.multiplyScalar(this.movementSpeed));
      //this.camera.instance.position.copy(pos)

    } 

   
    this.meshes.forEach((mesh) => {



      if (mesh.name.startsWith('Plane') && mesh.name != 'Plane054')  {
  
       this.circles = mesh
       this.circles.rotation.y += Math.PI/2 * this.time.delta * 5;
  
      
      }
  
     /*  if(mesh.name.includes('Drone_Camera')){
  
        this.droneCamera = mesh
  
        this.droneCamera.scale.x = this.data
  
        //console.log(this.data)
  
       } */
  
    });

    
      }

    }