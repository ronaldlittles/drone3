import * as THREE from "three";
import Experience from "./Experience.js";
import EventEmitter from "./Utils/EventEmitter.js";
import GSAP from "gsap";
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise.js";
import { vertexShader } from "./vertex.js";
import { fragmentShader } from "./fragment.js";
import { VertexTangentsHelper } from "three/examples/jsm/helpers/VertexTangentsHelper.js";
import { FigureEightPolynomialKnot } from "three/examples/jsm/curves/CurveExtras.js";
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

    this.resource1 = this.resources.items.me;
    this.resource2 = this.resources.items.wallTexture;
    this.resource3 = this.resources.items.droneModel;
    this.resource4 = this.resources.items.buildingModel;
    this.resource5 = this.resources.items.baloonsModel;
    this.resource6 = this.resources.items.hdr;

  

    this.setModel();
   
    this.createWall();

    this.setBoxes();

    this.setRaycaster();

    

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


    let length = 250;
    this.boxes = [];
    
    this.boxGeometry = new THREE.CylinderGeometry(1, 1, 5, 32, 1);
    
    this.purpleMaterial = new THREE.MeshStandardMaterial({
      color: 'yellow',
      opacity: 1,
      transparent: true,
     
    });
    
    this.yellowMaterial = new THREE.MeshBasicMaterial({ 
      color: 'purple',
        //map: this.resource1,
        opacity: 1,
        transparent: true,
        side: THREE.DoubleSide,

    });


   

      
    
      for (let i = 0; i < length; i++) {

      const material = i % 2 === 0 ? this.purpleMaterial : this.yellowMaterial;
    
      this.box1 = new THREE.Mesh( this.boxGeometry, material);
  

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
    this.model.upVector = new THREE.Vector3(0, 1, 0);
    this.model.castShadow = true;
    this.model.visible = true;
    this.model.scale.set(1.3,.7,1)
    //this.model.scale.setScalar(30)
    this.scene2.add(this.model);

   

    this.model2 = this.resource4.scene;
    this.model2.scale.setScalar(6)
    this.model2.castShadow = true;
    this.model2.position.y = -250;
    this.model2.receiveShadow = true;

    //this.scene2.add(this.model2);
    
    this.model3 = this.resource5.scene;

    this.model3.scale.setScalar(750)
    //this.model3.castShadow = true;
    this.model3.position.y = -300;
    //this.model3.receiveShadow = true; 
    

    //this.scene2.add(this.model3);

    
   

    
    this.camera.instance.add(this.model)
    this.model.translateZ(-100)
    this.model.translateY(15)



   
      //USE THE FOLLOWING TO TRAVERSE ANY OF THE MODELS PROPERTIES

                /* this.meshes = [];
                      this.model.traverse((object) => {
                        if (object.isMesh) {
                          this.meshes.push(object);
                        } 
                      });  */


        
        
        }


   

  
        setRaycaster() {

          this.label = document.createElement("div");
          this.label.style.position = "absolute";
          this.label.style.top = "0px";
          this.label.style.right = "calc(50% - 100px)";
          this.label.style.backgroundColor = 'transparent';
          this.label.style.color = "white";
          this.label.style.padding = "5px";
          this.label.style.fontFamily = "sans-serif";
          this.label.style.fontSize = "64px";
          this.label.style.textShadow = "2px 2px #ff0000";
          this.label.style.pointerEvents = "none"; // Make sure the this.label doesn't interfere with mouse events
          document.body.appendChild(this.label);
          

          this.label3 = document.createElement("div");
          this.label3.style.position = "absolute"; // Change to absolute positioning
          this.label3.style.bottom = "0"; // Align to the bottom
          this.label3.style.left = "0"; // Align to the left
          this.label3.style.fontSize = "36px";
          this.label3.style.backgroundColor = 'transparent';
          this.label3.style.color = "red";
          this.label3.style.padding = "5px";
          this.label3.style.fontFamily = "sans-serif";
          this.label3.style.textShadow = "2px 2px #000000";
          document.body.appendChild(this.label3);
          this.label3.textContent = 'this.oldNormalY';
          
          this.label4 = document.createElement("div");
          this.label4.style.position = "absolute"; // Change to absolute positioning
          this.label4.style.bottom = "0"; // Align to the bottom
          this.label4.style.right = "0"; // Align to the right
          this.label4.style.fontSize = "36px";
          this.label4.style.backgroundColor = 'transparent';
          this.label4.style.color = "red";
          this.label4.style.padding = "5px";
          this.label4.style.fontFamily = "sans-serif";
          this.label4.style.textShadow = "2px 2px #000000";
          document.body.appendChild(this.label4);
          this.label4.textContent = 'this.newNormalY';
          


          window.addEventListener("pointerdown", (event) => {

            const raycaster = new THREE.Raycaster();

            raycaster.setFromCamera(this.mouse, this.camera.instance);
         
              const intersects = raycaster.intersectObjects(this.objectsArray2, true);
        
              if (intersects.length > 0) {

               this.pointY = intersects[0].point.y;
               this.pointZ = intersects[0].point.z;
               
               this.label1 = this.pointY.toFixed(4)
               this.label2 = this.pointZ.toFixed(4)
            
              this.label.textContent = `Index: ${this.label1} ${this.label2 }`;
              
            } else {
             
              this.label.textContent = this.newNormalY;
            }
          
           

          })

          

        }
          
          
        
         

      createWall() {

      this.video = document.querySelector(".video");
        
        this.video.play();
    
        this.texture = new THREE.VideoTexture(this.video); 

        
     

      /*   this.shaderMaterial3 = new THREE.ShaderMaterial({
       
          side: THREE.DoubleSide,
          
          transparent: true,
          opacity: 1.0,
          
          uniforms: {
            time: { value: this.time.elapsed },
              
          },
    
          vertexShader: vertexShader.vertexShader,
          fragmentShader: fragmentShader3.fragmentShader3,
    
        }); */
        
       
       
      this.shaderMaterial2 = new THREE.ShaderMaterial({
       
      side: THREE.DoubleSide,
      
      transparent: true,
      opacity: .5,
      
      uniforms: {
         
          
          
          uvScale: { value: new THREE.Vector2(100,10)}
      },

      vertexShader: vertexShader.vertexShader2,
      fragmentShader: fragmentShader.fragmentShader,

    });  

   

    this.shaderMaterial = new THREE.ShaderMaterial({
     
      side: THREE.DoubleSide,
      //transparent: true,
      // opacity: 1,
    
      uniforms: {
   
        texture1: { value: this.resource2},
        uNoise: { value: this.iNoise},
        uvScale: { value: new THREE.Vector2()}

      },
   
      vertexShader: vertexShader.vertexShader,
      fragmentShader: fragmentShader.fragmentShader,
   
    });


this.shaderMaterial.envMap = this.scene2.environment
this.shaderMaterial.envMapIntensity = 1
this.shaderMaterial.reflectivity = 1



    this.displacementMaterial = new THREE.MeshMatcapMaterial({
      
      //wireframe: true,
      //color: 'black',
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1,
      //map: this.resource1,
      bumpMap: this.resource1,
      bumpScale: 1,
      //displacementMap: this.resource2,
      //displacementScale: 1,

    });


    this.yellowMaterial2 = new THREE.MeshStandardMaterial({ 

            //emissive: 0xff0000,
            //emissiveIntensity:.1, 
            map: this.resource2,
            opacity: 1,
            transparent: true,
            
        });


    this.lineMaterial = new THREE.MeshBasicMaterial( { 

      //linewidth: 1,
      //dashed: true,
      color: 0xff0000,
    
    } );
      


        
        this.numPoints = 1500
       
        this.points = [];

        let radius = 1000;
        
        for (let i = 0; i <= this.numPoints; i++) {

            let t = (i / this.numPoints) * Math.PI * 4

            var x = Math.sin(t*2) * radius;
           
            var z = Math.cos( t ) * radius;

            var y = Math.sin(Math.cos(t * 2) * Math.PI) * 25;

           /*  const x = Math.sin( t * 3 ) * Math.cos( t * 4 ) * 50;
						const y = Math.sin( t * 10 ) * 2 + Math.cos( t * 17 ) * 2 + 5;
						const z = Math.sin( t ) * Math.sin( t * 4 ) * 50; */


          
            this.points.push(new THREE.Vector3(x, y, z).multiplyScalar( 2 ));

        }

       

    this.spline = new THREE.CatmullRomCurve3(this.points);

    this.spline.curveType = 'catmullrom';
   
    

    this.spacedPoints = this.spline.getSpacedPoints(1500).slice(800,1200)
    this.spacedPoints2 = this.spline.clone().getSpacedPoints(1500).slice(200,400)

    this.spline2 = new THREE.CatmullRomCurve3(this.spacedPoints);
    this.spline3 = new THREE.CatmullRomCurve3(this.spacedPoints2);


    /* this.splineReverse = this.spline.points
    this.rev = this.splineReverse.toReversed()
    this.spline4 = new THREE.CatmullRomCurve3(this.rev); */
   
  
const racetrackShape = new THREE.Shape();

racetrackShape.moveTo(0, -80);

racetrackShape.lineTo(2 ,-80); 
racetrackShape.lineTo(0, 80);
racetrackShape.lineTo(-2, -80);



const racetrackShape2 = new THREE.Shape();

racetrackShape2.moveTo(0, -90);
racetrackShape2.lineTo(10, -90);  
racetrackShape2.lineTo(10, -70);   
racetrackShape2.lineTo(-5, -70); 
racetrackShape2.lineTo(-5, -90); 


const racetrackShape3 = new THREE.Shape();

racetrackShape3.moveTo(0, 90);
racetrackShape3.lineTo(10, 90);  
racetrackShape3.lineTo(10, 70);  
racetrackShape3.lineTo(-5, 70);  
racetrackShape3.lineTo(-5, 90); 



const racetrackShape4 = new THREE.Shape();



const outerRadius = 250;
const innerRadius = 140;

//racetrackShape4.absarc(0, 0, outerRadius , Math.PI , 0, true)

const holePath = new THREE.Path();

holePath.absarc(-80, 80, innerRadius, 0, Math.PI, true);

racetrackShape4.holes.push(holePath);


const racetrackShape6 = new THREE.Shape();

racetrackShape6.moveTo(-.2, -1);

racetrackShape6.lineTo(.2 ,-1); 
racetrackShape6.lineTo(-.2, 1);
racetrackShape6.lineTo(-.2, -1);



 

    this.extrudeSettings = {

      steps: 500,
      depth: 100,
      
      extrudePath: this.spline,

    }

     this.extrudeSettings2 = {

      steps: 1000,
      depth: 100,
      
      extrudePath: this.spline2,

    }

    this.extrudeSettings3 = {

      steps: 150,
      depth: 100,
      
      extrudePath: this.spline3,

    } 
    
 
    this.tubeGeo = new THREE.ExtrudeGeometry(racetrackShape, this.extrudeSettings);
    this.tubeGeo2 = new THREE.ExtrudeGeometry(racetrackShape2, this.extrudeSettings);
    this.tubeGeo3 = new THREE.ExtrudeGeometry(racetrackShape3, this.extrudeSettings);

    this.tubeGeo4 = new THREE.TubeGeometry(this.spline2, 100, 200, 100, false);
    this.tubeGeo5 = new THREE.TubeGeometry(this.spline3, 100, 200, 100, false);

    this.tubeGeo6 = new THREE.ExtrudeGeometry(racetrackShape6, this.extrudeSettings2);
    

    this.tube = new THREE.Mesh(this.tubeGeo, this.displacementMaterial) 

   
    this.scene2.add(this.tube);
    
    this.tube.position.y =-10 

    //this.tube.visible = false;
  
 
    this.tube2 = new THREE.Mesh(this.tubeGeo2, this.shaderMaterial)   


    this.scene2.add(this.tube2);

    //this.tube2.position.y =-12

  
    this.tube3 = new THREE.Mesh( this.tubeGeo3, this.shaderMaterial)  

    this.scene2.add(this.tube3);
        
    //this.tube3.position.y =-12


      this.tube4 = new THREE.Mesh(this.tubeGeo4, this.displacementMaterial) 

      this.scene2.add(this.tube4);

      this.tube4.position.y = -10; 

      
      this.tube5 = new THREE.Mesh(this.tubeGeo5, this.displacementMaterial) 

      this.scene2.add(this.tube5);

      this.tube5.position.y = -10;


      this.tube6 = new THREE.Mesh(this.tubeGeo6, this.lineMaterial) 

      this.scene2.add(this.tube6);
     
      this.tube6.position.y = -8;


        this.resource6.wrapS = THREE.RepeatWrapping;

        this.resource6.wrapT = THREE.RepeatWrapping;
    
        this.resource6.repeat.set(.9,.5)

        this.resource1.wrapS = THREE.RepeatWrapping;

        this.resource1.wrapT = THREE.RepeatWrapping;
    
        this.resource1.repeat.set(36,10)


        this.resource2.wrapS = THREE.RepeatWrapping;

        this.resource2.wrapT = THREE.RepeatWrapping;
    
        this.resource2.repeat.set(.05,.01)


 

          //Gonna be the skybox

          this.sphere = new THREE.Mesh(

          new THREE.SphereGeometry(1,32,32),

          new THREE.MeshStandardMaterial({

             color: Math.random() * 0xffffff,
             //map: this.resource2, 
             side: THREE.DoubleSide,
             transparent: true,
             opacity: .3,
           

          })

          )

        this.sphere.scale.setScalar(1350)
        //this.scene2.add(this.sphere)
       

       
          this.sphere2 = new THREE.Mesh(
 
           new THREE.SphereGeometry(1,32,32),

            new THREE.MeshPhysicalMaterial({

              wireframe: true,
              //map: this.resource2,
              color: Math.random() * 0xffffff,
              side: THREE.DoubleSide,
              transparent: true,
              opacity: .1,
              emissive: 0x00ff00,
              emissiveIntensity: .5, 
            
            })   
            
          )

          this.sphere2.scale.setScalar(5)
          this.sphere2.rotation.y += Math.PI/3
    
   
  

    
    
   
    const numObjects = 750; // Number of objects to place on each side
    this.spacing = 50; // Adjust this value for spacing
    this.scaleFactor = 2.0;

    this.objectsArray1 = [];
    this.objectsArray2 = [];

    for (let i = 0; i < numObjects; i++) {

    const t = i / (numObjects - 1); // Ranges from 0 to 1

   
    const positionOnCurve = this.spline.getPointAt(t);
    this.tangent = this.spline.getTangentAt(t);

  
    const referenceVector = new THREE.Vector3(1,0, 0);

    this.normal = new THREE.Vector3();
    this.normal.crossVectors(referenceVector, this.tangent).normalize();

    this.binormal = new THREE.Vector3();
    this.binormal.crossVectors(this.tangent, this.normal).normalize(); 

   
    this.offset = this.normal.multiplyScalar(this.spacing * (i % 2 === 0 ? 1.5 : -1.5)); 

    const angle = Math.atan2(this.tangent.x , this.tangent.z );

    

    this.positionLeft = positionOnCurve.clone().add(this.offset);
    this.positionRight = positionOnCurve.clone().sub(this.offset);

    this.sphereLeft = this.model2.clone();
    this.sphereLeft.isWall = true
    this.sphereLeft.position.copy(this.positionLeft.multiplyScalar(this.scaleFactor));

    this.sphereLeft.position.add(new THREE.Vector3(0,-50,0))
   
    this.sphereLeft.setRotationFromAxisAngle(new THREE.Vector3(0, 1, 0), angle+ Math.PI/2 );
    
    this.objectsArray1.push(this.sphereLeft)
    this.scene2.add(this.sphereLeft);


    this.sphereRight = this.sphere2.clone();
    
    this.sphereRight.position.copy(this.positionRight.multiplyScalar(this.scaleFactor));

    this.sphereRight.setRotationFromAxisAngle(new THREE.Vector3(0, 1, 0), angle + Math.PI/2);

    

    this.randomOffset = new THREE.Vector3(
      
      (Math.random() * 2 - 1 ) * 10,
      (Math.random() * 2 - 1 ) * 100,
      (Math.random() * 2 - 1 ) * 30,
      
      )

      this.sphere2Clone = this.sphere2.clone()
      this.sphere2Clone.position.copy(positionOnCurve.clone()).add(this.randomOffset)
      
      
      this.scene2.add(this.sphere2Clone) 
      this.objectsArray2.push(this.sphere2Clone) 
     

    }  

        }
        
      
  update() {
  
    //this.iNoise += .0001 * this.time.delta;
    //console.log( this.tubeGeo.attributes.normal.array[i] )

    

      this.sphere2.rotation.x += Math.PI * this.time.elapsed * .1;

      let currentPosition = 0; 
      let speed = .8; 
      let loopTime = 60;
      const lookAt = new THREE.Vector3();

      
        const t =  (speed *this.time.elapsed )/loopTime % 1;
        const t2 =  (speed * this.time.elapsed + .0004)/loopTime % 1;
        const t3 =  (speed * this.time.elapsed + .06)/loopTime % 1;
   
 
    
        const pos = this.spline.getPointAt(t);
        const pos2 = this.spline.getPointAt(t2);
        const pos3 =  this.spline3.getPointAt(t3);
     
        

    

   
  
    const tangent = this.spline.getTangentAt(t).normalize();

    this.angle = Math.atan2(tangent.x , tangent.y );

    const offset = new THREE.Vector3(0, 5, 0)

    

    this.referenceVector = new THREE.Vector3(0,1,0); 

    this.normal = new THREE.Vector3().normalize();
    this.normal.crossVectors( this.referenceVector, tangent ).normalize();

    this.binormal = new THREE.Vector3();
    this.binormal.crossVectors(tangent, this.normal).normalize(); 

    this.label.textContent = this.binormal.y;

    //CAMERA MOVEMENT
   
    this.camera.instance.position.copy( pos.add(tangent).add( offset ) )

    this.camera.instance.lookAt( pos2.add(tangent).add( offset )  ) + (pos2.y/10)

    this.model.rotation.y = tangent.y
    this.model.rotation.z = tangent.z 
    this.model.rotation.x = Math.sin(pos2.x  * .005) * .1

    //this.camera.instance.rotation.z = tangent.z * .05 + this.binormal.z

   
    
    const maxAngle = Math.PI / 6; 
    const minAngle = -Math.PI / 6; 
    
    this.camera.azimuth = Math.max(minAngle, Math.min(maxAngle, this.camera.azimuth));
  
    this.q1 = new THREE.Quaternion()
    this.q2 = new THREE.Quaternion()

    this.q1.setFromAxisAngle(new THREE.Vector3(.02, 0, 0), pos.x )
    this.q2.setFromAxisAngle(new THREE.Vector3(.04, 0, 0), pos.x)

    this.q3 = new THREE.Quaternion()
    this.q3.multiplyQuaternions(this.q1,this.q2)



    //this.model.quaternion.copy(this.q3)
 


    const angleToRotate = THREE.MathUtils.degToRad(-45)
 
    const desiredRotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), angleToRotate);
   
    const maxRotation = new THREE.Quaternion().slerp(desiredRotation, 0.5); 
 
   
    this.forwardVector2 = new THREE.Vector3(1, 0, 0);
    this.forwardDirection2 = this.forwardVector2.clone();
    this.forwardDirection2.applyQuaternion(this.model.quaternion).add(maxRotation).normalize();
    

    this.forwardVector3 = new THREE.Vector3(-1,0, 0);
    this.forwardDirection3 = this.forwardVector3.clone();
    this.forwardDirection3.applyQuaternion(this.model.quaternion).add(maxRotation).normalize(); 

   

     if (this.arrowLeftPressed) {

    this.model.rotation.z += Math.PI/4;
   
    this.model.rotation.y +=  Math.abs(this.normal.y)//Math.PI/6;

    }


    if (this.arrowRightPressed) {

    this.model.rotation.z -= Math.PI/4;
    
    this.model.rotation.y -=  Math.PI/6;

    } 


    if (this.arrowUpPressed) {

      this.forwardVector = new THREE.Vector3(0, 0, 1);
      this.forwardDirection = this.forwardVector.clone();
      this.forwardDirection.applyQuaternion(this.model.quaternion);
      this.model.position.add(this.forwardDirection.multiplyScalar(this.movementSpeed));
      this.camera.instance.position.copy(pos)

    } 
    
  
      }

      resize() {
        // Instance
        this.camera.instance.setSize(this.config.width, this.config.height);
        this.camera.instance.setPixelRatio(this.config.pixelRatio);
    
       
      }

    }