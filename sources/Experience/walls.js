import * as THREE from "three";
import Experience from "./Experience.js";
import EventEmitter from "./Utils/EventEmitter.js";
import GSAP from "gsap";
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise.js";
//import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { vertexShader } from "./vertex.js";
import { fragmentShader } from "./fragment.js";
//import { fragmentShader2 } from "./fragment2.js";
import { VertexTangentsHelper } from "three/examples/jsm/helpers/VertexTangentsHelper.js";
//import { Flow } from 'three/examples/jsm/modifiers/CurveModifier.js';
//import RollerCoasterGeometry from './track1.js'
//import { ViewHelper } from "three/examples/jsm/helpers/ViewHelper.js";
import { FigureEightPolynomialKnot } from "three/examples/jsm/curves/CurveExtras.js";
//import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
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

    this.resource1 = this.resources.items.smoke;
    this.resource2 = this.resources.items.forrest;
    this.resource3 = this.resources.items.droneModel;
    this.resource4 = this.resources.items.buildingModel;
    this.resource5 = this.resources.items.fenceModel;

  

    this.setModel();
   
    this.createWall();

    this.setBoxes();

    this.setRaycaster();

    

   /*  this.CameraHelper = new ViewHelper(this.camera.instance);
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
      
   
    this.noise = new ImprovedNoise()
  
    this.iNoise = this.noise.noise(Math.random()*5.5,Math.random()*.3,Math.random()*.5)

    
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

  setBoxes(){


    let length = 500;
    this.boxes = [];
    
    this.boxGeometry = new THREE.CylinderGeometry(1, 1, 5, 32, 1);
    
    this.purpleMaterial = new THREE.MeshStandardMaterial({
      color: 'yellow',
      opacity: 1,
      transparent: true,
     
    });
    
    this.yellowMaterial = new THREE.MeshPhongMaterial({ 
      color: 'white', 
      map: this.resources.items.meTexture,
       
        opacity: 1,
        transparent: true,
        
    });
    
    for (let i = 0; i < length; i++) {

      const material = i % 2 === 0 ? this.purpleMaterial : this.yellowMaterial;
    
      this.box1 = new THREE.Mesh(this.boxGeometry, material);
  

      this.box = this.box1.clone();
    
      this.box.position.set(
        Math.random() * 200 - 100,
        Math.random() * 200 - 100,
        Math.random() * 2400 - 1200
      );
    
      this.box.scale.set(5, 1, 5);
    
      this.box.castShadow = true
    
      this.scene2.add(this.box);
    
      this.boxes.push(this.box);


       
    }
   
    this.boxes.name = 'cloudboxes';
    
    window.addEventListener('pointerdown', () => {
    
      
      for (let i = 0; i < this.boxes.length; i++) {
        const box = this.boxes[i];
        const distance = 900;
        
        
        GSAP.to(box.position, 2, {
          x: box.position.x + Math.random() * distance - distance / 2,
          y: box.position.y + Math.random() * distance - distance / 2,
          z: box.rotation.z + Math.random() * distance - distance / 2,
          ease: 'power2.easeOut',
       
        });
    
    
      }

    })
    
       
       
      }



  setModel() {

    this.model = this.resource3.scene;
    this.model.name = "droneModel";
    this.scene2.add(this.model);
    this.model.position.set(0, 1.0, 0);
    //this.model.rotation.set(-Math.PI*2.5, 0, 0);
    //this.model.scale.set(2,0,0)
    this.model.upVector = new THREE.Vector3(0, 1, 0);
    
    this.model.castShadow = true;
    this.model.visible = true;
  


   

     this.model2 = this.resource4.scene;
    this.model2.scale.setScalar(10)
    //this.scene2.add(this.model2);
    this.model2.castShadow = true;
    this.model2.position.y = -200;
    //this.model2.receiveShadow = true;

    //this.model2.material = this.shaderMaterial3

    this.model3 = this.resource5.scene;
    
    this.model3.scale.setScalar(20)
    //this.scene3.add(this.model3);
    this.model3.castShadow = true;
    this.model3.position.y = -300;
    //this.model3.receiveShadow = true; 
   
    
    this.camera.instance.add(this.model)
    this.model.translateZ(-200)
    this.model.translateY(25)

    //this.model.rotation.setFromAxisAngle(x,Math.PI/16)
     /* this.meshes = [];
          this.model.traverse((object) => {
            if (object.isMesh) {
              this.meshes.push(object);
            } 
          }); 
 */
        

        
        }


   

  
        setRaycaster() {

          const label = document.createElement("div");
          label.style.position = "absolute";
          label.style.top = "10px";
          label.style.right = "10px";
          label.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
          label.style.color = "white";
          label.style.padding = "5px";
          label.style.fontFamily = "Arial";
          label.style.fontSize = "14px";
          label.style.pointerEvents = "none"; // Make sure the label doesn't interfere with mouse events
          document.body.appendChild(label);

          window.addEventListener("pointerdown", (event) => {

            const raycaster = new THREE.Raycaster();

            raycaster.setFromCamera(this.mouse, this.camera.instance);
         
              const intersects = raycaster.intersectObjects(this.objectsArray2, true);
        
              if (intersects.length > 0) {

               this.pointY = intersects[0].point.y;
               this.pointZ = intersects[0].point.z;
               
               this.label1 = this.pointY.toFixed(4)
               this.label2 = this.pointZ.toFixed(4)
            
              label.textContent = `Index: ${this.label1} ${this.label2 }`;
              
            } else {
             
              label.textContent = "";
            }
          
           

          })

     

        }
          
          
        
         

      createWall() {

     /* this.video = document.querySelector(".video");
        
        this.video.play();
    
        this.texture = new THREE.VideoTexture(this.video); */

        
        
       
       
       

      


      /*   this.shaderMaterial3 = new THREE.ShaderMaterial({
       
          side: THREE.DoubleSide,
          
          transparent: true,
          opacity: 1.0,
          
          uniforms: {
            time: { value: this.time.elapsed },
              
          },
    
          vertexShader: vertexShader.vertexShader,
          fragmentShader: fragmentShader3.fragmentShader3,
    
        });
        
        
    

       
      this.shaderMaterial2 = new THREE.ShaderMaterial({
       
      side: THREE.DoubleSide,
      
      transparent: true,
      opacity: 1.0,
      
      uniforms: {
         
          
          
          uvScale: { value: new THREE.Vector2(100,10)}
      },

      vertexShader: vertexShader.vertexShader,
      fragmentShader: fragmentShader2.fragmentShader2,

    });  */

   

    this.shaderMaterial = new THREE.ShaderMaterial({
     
      side: THREE.DoubleSide,
    
      //transparent: true,
     // opacity: 1,
      
    
   
      uniforms: {
   
        texture1: { value: this.resource2},
        //uNoise: { value: this.iNoise},
        uvScale: { value: new THREE.Vector2()}

      },
   
      vertexShader: vertexShader.vertexShader,
      fragmentShader: fragmentShader.fragmentShader,
   
    });

   /*  if(this.debug){

       this.debug.add(this.shaderMaterial.uniforms.uvScale.value, 'uvScale', -100, 100)
    .name('Slider')
    .step(0.1)
    .onChange(values=>(this.shaderMaterial.uniforms.uvScale.value = values))
 

    } */



    this.displacementMaterial = new THREE.MeshStandardMaterial({

      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1,
      map: this.resource1,
      displacementMap: this.resource2,
      displacementScale: 1,
     

    });



   /*  this.plane = new THREE.Mesh(geometry, this.displacementMaterial)
    this.scene2.add(this.plane);
    this.plane.scale.setScalar(400)
    this.plane.rotation.x = Math.PI/2
    this.plane.position.y = -40  */


        
        this.numPoints = 500
       
        this.points = [];

        let radius = 1000;
        
        for (let i = 0; i <= this.numPoints; i++) {

            let t = (i / this.numPoints) * Math.PI * 4

            var x = Math.sin(t*2) * radius;
           
            var z = Math.cos( t ) * radius; 
            var y = Math.sin(Math.cos(t * 2) * Math.PI) * 33;

           /*  const x = Math.sin( t * 3 ) * Math.cos( t * 4 ) * 50;
						const y = Math.sin( t * 10 ) * 2 + Math.cos( t * 17 ) * 2 + 5;
						const z = Math.sin( t ) * Math.sin( t * 4 ) * 50; */
          
            this.points.push(new THREE.Vector3(x, y, z).multiplyScalar( 2 ));

        }



    this.spline = new THREE.CatmullRomCurve3(this.points);

    this.spline.curveType = 'catmullrom';
   
    //this.spline.closed = true;

    //this.spline.tension = .001;

    this.spacedPoints = this.spline.getSpacedPoints(299).slice(200,210)
    this.spacedPoints2 = this.spline.getSpacedPoints(299).slice(200,210)

    this.spline2 = new THREE.CatmullRomCurve3(this.spacedPoints);
    this.spline3 = new THREE.CatmullRomCurve3(this.spacedPoints2);



    this.splineReverse = this.spline.points
    this.rev = this.splineReverse.toReversed()
    this.spline3 = new THREE.CatmullRomCurve3(this.rev);
  
     
 
  
const racetrackShape = new THREE.Shape();



racetrackShape.moveTo(0, -80);

racetrackShape.lineTo(2,-80); 
racetrackShape.lineTo(0, 80);
racetrackShape.lineTo(-2, -80);

console.log(racetrackShape)

const racetrackShape2 = new THREE.Shape();

racetrackShape2.moveTo(0, -80);
racetrackShape2.lineTo(8, -80);  
racetrackShape2.lineTo(8, -70);  //70 
racetrackShape2.lineTo(-8, -70); //80 
racetrackShape2.lineTo(-8, -80); 


const racetrackShape3 = new THREE.Shape();

racetrackShape3.moveTo(0, 80);
racetrackShape3.lineTo(8, 80);  
racetrackShape3.lineTo(8, 70); //70  
racetrackShape3.lineTo(-8, 70);  //80
racetrackShape3.lineTo(-8, 80); 



const racetrackShape4 = new THREE.Shape();

/* racetrackShape4.moveTo(0, -82);
racetrackShape4.lineTo(0,-284); 
racetrackShape4.lineTo(4,-284);
racetrackShape4.lineTo(4, -82); */

const outerRadius = 250;
const innerRadius = 140;

//racetrackShape4.absarc(0, 0, outerRadius , Math.PI , 0, true)

const holePath = new THREE.Path();

holePath.absarc(-80, 80, innerRadius, 0, Math.PI, true);

racetrackShape4.holes.push(holePath);



const racetrackShape5 = new THREE.Shape();

/* racetrackShape5.moveTo(0, 82);
racetrackShape5.lineTo(0,284); 
racetrackShape5.lineTo(4,284); 
racetrackShape5.lineTo(4,82);*/

//racetrackShape5.absarc(-85, 80, 5,  Math.PI/2, Math.PI, true)


 

    this.extrudeSettings = {

      steps: 1500,
      depth: 10,
      
      extrudePath: this.spline,

    }

    this.extrudeSettings2 = {

      steps: 1500,
      depth: 100,
      
      extrudePath: this.spline2,

    }

    this.extrudeSettings3 = {

      steps: 1500,
      depth: 100,
      
      extrudePath: this.spline3,

    }
    
 
    this.tubeGeo = new THREE.ExtrudeGeometry(racetrackShape, this.extrudeSettings);
    this.tubeGeo2 = new THREE.ExtrudeGeometry(racetrackShape2, this.extrudeSettings);
    this.tubeGeo3 = new THREE.ExtrudeGeometry(racetrackShape3, this.extrudeSettings);
    this.tubeGeo4 = new THREE.ExtrudeGeometry(racetrackShape4, this.extrudeSettings2);
    this.tubeGeo5 = new THREE.ExtrudeGeometry(racetrackShape5, this.extrudeSettings3);


    this.tube = new THREE.Mesh(this.tubeGeo, this.shaderMaterial) 

   
    this.scene2.add(this.tube);
    
    //this.tube.position.y =-16  
  
 
    this.tube2 = new THREE.Mesh(this.tubeGeo2, this.shaderMaterial)   


    this.scene2.add(this.tube2);

    //this.tube2.position.y =-12

  
    this.tube3 = new THREE.Mesh( this.tubeGeo3, this.shaderMaterial)  

    this.scene2.add(this.tube3);
        
    //this.tube3.position.y =-12


    this.tube4 = new THREE.Mesh(this.tubeGeo4, this.shaderMaterial) 

      this.scene2.add(this.tube4);
          
      



      this.tube5 = new THREE.Mesh(this.tubeGeo5, this.shaderMaterial)  

        //this.scene2.add(this.tube5);
            
        

        this.resource1.wrapS = THREE.RepeatWrapping;

        //this.resource1.wrapT = THREE.RepeatWrapping;
    
        this.resource1.repeat.set(.064,.2)



  




          this.sphere = new THREE.Mesh(

           

           new THREE.BoxGeometry(4,4,4),

           

             new THREE.MeshStandardMaterial({
             //color: 'yellow', 
             map: this.resource2, 
             side: THREE.DoubleSide,
             transparent: true,
             opacity: .0052,
            

   
           //this.shaderMaterial2

          })

          )

        //this.sphere.scale.setScalar(1350)
        //this.scene2.add(this.sphere)
       

       
          this.sphere2 = new THREE.Mesh(
 
            new THREE.BoxGeometry(3,1,1),
 
            new THREE.MeshStandardMaterial({
              map: this.resource2,
              color: Math.random() * 0xffffff,
              side: THREE.DoubleSide,
              transparent: true,
              opacity: .8,
            

            }) 
            
          )

    this.sphere2.scale.setScalar(10)
       
          



    const numObjects = 150; // Number of objects to place on each side
    this.spacing = 50; // Adjust this value for spacing
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

   
    this.offset = this.normal.multiplyScalar(this.spacing * (i % 2 === 0 ? 1.5 : -1.5));

    const angle = Math.atan2(this.tangent.x , this.tangent.z );
    //const angle2 = Math.atan2(this.model.position.x, this.camera.instance.position.x) 

    
    
     this.positionLeft = positionOnCurve.clone().add(this.offset);
    this.positionRight = positionOnCurve.clone().sub(this.offset);

    this.sphereLeft = this.model2.clone();
    this.sphereLeft.isWall = true
    this.sphereLeft.position.copy(this.positionLeft.multiplyScalar(this.scaleFactor));

    this.sphereLeft.position.add(new THREE.Vector3(0,-10,0))
   
    this.sphereLeft.setRotationFromAxisAngle(new THREE.Vector3(0, 1, 0), angle+ Math.PI/2 );
    
    this.objectsArray1.push(this.sphereLeft)
    this.scene2.add(this.sphereLeft);


    this.sphereRight = this.sphere2.clone();
    
    this.sphereRight.position.copy(this.positionRight.multiplyScalar(this.scaleFactor));
  

    this.sphereRight.setRotationFromAxisAngle(new THREE.Vector3(0, 1, 0), angle + Math.PI/2);

     
    //this.scene2.add(this.sphereRight);

    this.randomOffset = new THREE.Vector3(
      
      (Math.random() * 2 - 1 ) * 5,
      (Math.random() * 2 - 1 ) * 2,
      (Math.random() * 2 - 1 ) * 10,
      
      )

      this.sphere2Clone = this.sphere2.clone()
      this.sphere2Clone.position.copy(positionOnCurve.clone()).add(this.randomOffset)
      
      
      this.scene2.add(this.sphere2Clone) 
     this.objectsArray2.push(this.sphere2Clone) 
     //console.log(this.objectsArray2)

  
    


    } 

        }
        
      
  update() {
  
    //this.shaderMaterial.uniforms.time.value = this.time.elapsed * 5.0;
    //this.shaderMaterial2.uniforms.time.value = this.time.elapsed * 5.0;

    

    //this.shaderMaterial3.uniforms.needsUpdate = true;


    

   
   
 
      let currentPosition = 0; 
      let speed = 1.0; 
      let loopTime = 60;

      
        const t =  (speed *this.time.elapsed )/loopTime % 1;
        const t2 =  (speed * this.time.elapsed + .0004)/loopTime % 1;
        const t3 =  (speed * this.time.elapsed + .06)/loopTime % 1;
   
 
    
        const pos = this.spline.getPointAt(t);
        const pos2 = this.spline.getPointAt(t2);
        const pos3 =  this.spline.getPointAt(t3);
     

  
    const tangent = this.spline.getTangentAt(t);

    this.angle = Math.atan2(tangent.x , tangent.y );

    const offset = new THREE.Vector3(0, 15.5, 5)

    const lerpedPos = pos.lerp( pos2, this.time.elapsed * speed);

   
   
    this.camera.instance.position.copy( pos.add(offset) )
    this.camera.instance.lookAt( pos2.add(offset) )
  

  /* for(let i =0; i <= this.boxes.length -1; i++){

this.boxes[i] = pos3.add(new THREE.Vector3(0,0,-50))

  } */
    
   
   

    /* if (this.removedPointArray) {
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
      }); */
  
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
  //} 
  
  const maxAngle = Math.PI / 6; // Maximum allowed azimuth angle (45 degrees in radians)
  const minAngle = -Math.PI / 6; // Minimum allowed azimuth angle (-45 degrees in radians)
  
  // Update the azimuth angle while keeping it within the limits
  this.camera.azimuth = Math.max(minAngle, Math.min(maxAngle, this.camera.azimuth));

  
 this.q1 = new THREE.Quaternion()
this.q2 = new THREE.Quaternion()

this.q1.setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.camera.azimuth%1 )
this.q2.setFromAxisAngle(new THREE.Vector3(0, 0, 1), this.camera.azimuth%1)

this.q3 = new THREE.Quaternion()
this.q3.multiplyQuaternions(this.q1,this.q2)



this.model.quaternion.copy(this.q3)
 





//this.shaderMaterial.uniforms.tangent.value = this.angle

//this.shaderMaterial2.uniforms.tangent.value = this.angle



   const angleToRotate = THREE.MathUtils.degToRad(-45)
 
   
    const desiredRotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), angleToRotate);

   
    const maxRotation = new THREE.Quaternion().slerp(desiredRotation, 0.5); 
 
   
    



    this.forwardVector2 = new THREE.Vector3(1, 0, 0);
    this.forwardDirection2 = this.forwardVector2.clone();
    this.forwardDirection2.applyQuaternion(this.model.quaternion).add(maxRotation).normalize();
    //this.model.rotation.add(this.forwardDirection2.multiplyScalar(this.movementSpeed));

    this.forwardVector3 = new THREE.Vector3(-1,0, 0);
    this.forwardDirection3 = this.forwardVector3.clone();
    this.forwardDirection3.applyQuaternion(this.model.quaternion).add(maxRotation).normalize();  

     if (this.arrowLeftPressed) {
    this.model.rotation.z -= Math.PI/4 //* tangent.x //this.rotationSpeed;
    
    this.model.position.add(this.forwardDirection2.multiplyScalar(this.movementSpeed));
    }
    if (this.arrowRightPressed) {
    this.model.rotation.z +=   Math.PI/4 //* tangent.x//this.rotationSpeed;
   
    this.model.position.add(this.forwardDirection3.multiplyScalar(this.movementSpeed));
    } 


    if (this.arrowUpPressed) {

      this.forwardVector = new THREE.Vector3(0, 0, 1);
      this.forwardDirection = this.forwardVector.clone();
      this.forwardDirection.applyQuaternion(this.model.quaternion);
      this.model.position.add(this.forwardDirection.multiplyScalar(this.movementSpeed));
      this.camera.instance.position.copy(pos)

    } 
    
     

   
    /*   this.meshes.forEach((mesh) => {



      if (mesh.name.startsWith('Plane') && mesh.name != 'Plane054')  {
  
       this.circles = mesh
       this.circles.rotation.y += Math.PI/2 * this.time.delta * 5;
  
      
      }
    
    
  
    }); */


    
      }

    }