import * as THREE from "three";
import Experience from "./Experience.js";
//import { vertexShader } from "./vertex.js";
//import { fragmentShader } from "./fragment.js";
import EventEmitter from "./Utils/EventEmitter.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import GSAP from "gsap";
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise.js";



//import '@tensorflow/tfjs-backend-webgl';
//import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
export default class Video extends EventEmitter {
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

   
    
    this.resource1 = this.resources.items.fireTexture;
    this.resource2 = this.resources.items.wallTexture;
    //this.vid = this.resources.items.video2

    //this.setVideo();
    //this.setVideo2();
   
    //this.setLiveVideo();
   
   
    //this.setVideoTexture();
   
    this.setPlane();
    
  }

  setLiveVideo() {
    /* this.liveVideo = document.querySelector(".video");

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const constraints = {
        video: { width: 640, height: 480, facingMode: "user" },
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.liveVideo.srcObject = stream;
          this.liveVideo.play();
        })
        .catch(function (error) {
          console.error("Unable to access the camera/webcam.", error);
        });
    } else {
      console.error("MediaDevices interface not available.");
    }

    this.texture3 = new THREE.VideoTexture(this.liveVideo);

    this.texture3.name = "liveVideoTexture";

    return this.texture3;
 */
    //console.log(handPoseDetection)

    /*  const model = handPoseDetection.SupportedModels.MediaPipeHands;
        const detectorConfig = {
          runtime: 'mediapipe', // or 'tfjs'
          modelType: 'lite'
        };

       
       async function runit(){

       detector = await handPoseDetection.createDetector(model, detectorConfig);
    

       const hands = await detector.estimateHands(this.liveVideo);
    
       }

      runit() */
  }

 /*  setVideoTexture() {
    this.material = new THREE.MeshBasicMaterial({
      //color: 'blue',
      side: THREE.DoubleSide,

      map: this.resource1,
    });

    return this.material;
  } 

  setVideo() {
    this.video = document.querySelector(".video");

    this.video.play();

    this.texture = new THREE.VideoTexture(this.video);

    this.texture.name = "videoTexture";

    return this.texture;
  }

  setVideo2() {
    this.video2 = document.querySelector(".video");
    this.video2.src = "./assets/water.mp4";
    //this.video2.play()
    this.video2.name = "video2";

    this.texture2 = new THREE.VideoTexture(this.video2);
    this.texture2.name = "videoTexture2";

    return this.texture2;
  }*/

  setPlane() {
  
   /*  const length = 5;
    const spacing = 300; // Adjust this value to change the spacing between the planes
    const totalWidth = spacing * length; // Calculate the total width occupied by the planes
    const offsetX = -totalWidth / 2; // Calculate the offset to center the planes
   
    const maxY = 750; // Maximum X position
    this.planes = [];
  
    for (let i = 0; i <= length; i++) {
      this.plane = new THREE.Mesh(
        new RoundedBoxGeometry(2, .2, 2, 4, 4),
        new THREE.MeshBasicMaterial({
          color: "white",
          map: this.renderer.renderTarget.texture,
          side: THREE.DoubleSide,
        })
      );
  
      this.planes.push(this.plane);
      this.scene2.add(this.planes[i]);
  
     
      const posX = offsetX + i * spacing 
      this.plane.position.set(posX, 200, 0);
  
      this.plane.scale.setScalar(100);
      this.plane.name = "videoplane";
    } */
 

    this.perlin = new ImprovedNoise();
    this.noise = this.perlin.noise(2.0, 2.0, 2.0);

   /*  this.roundedBox = new THREE.BoxGeometry(2, 2, 2, 24, 24, 24);
    const uRandom = this.roundedBox.attributes.position.count * 3;

    const customPositions = new Float32Array(uRandom); */

  console.log(this.noise)

    
  // INLINE SHADERMATERIAL clouds on a plane with low alpha to be used as a overlay

  this.shaderMaterial = new THREE.ShaderMaterial({

       side: THREE.DoubleSide,
       transparent: true,
       opacity: .5,
      

       uniforms: {
         pNoise: { value: new THREE.Vector3(this.noise) },

         mouse: { value: this.mouse },
         fogColor: { value: new THREE.Vector3(0, 0, 0.1) },
         fogDensity: { value: 4.5 },

         uvScale: { value: new THREE.Vector2(1.0, 1.0) },
         time: { value: 1.0 },
         u_Resolution: {
           value: new THREE.Vector2(
             window.innerHeight / 2,
             window.innerWidth / 2
           ),
         },
         texture1: { value: this.resource1 },
         //texture2: { value: this.resource2 },
       },

       vertexShader: `

      attribute vec3 aPosition;
    
      uniform vec2 uvScale;
      varying vec2 vUv;
    
      void main()
      {
    
        vUv = uvScale * uv;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * mvPosition;
    
      }
      
          `,
       fragmentShader: `

      varying vec2 vUv;
      uniform float time;
      uniform vec2 resolution;
      uniform vec2 uvScale;
      uniform sampler2D texture1; 
      uniform vec3 pNoise;
      
      void main() {
        
      
        vec2 center = vec2(0.5, 0.5);
      
        vec2 st =  gl_FragCoord.xy/1.0-resolution.xy ;
      
        float distance =  length( pNoise.xy - center );
      
        float scaledDistance = 1.0 - distance / 0.05;
      
        vec2 T2 = vec2(sin(vUv.x + time * 5.0), vUv.y  );
      
        vec4 color =  texture2D( texture1, vec2(sin(vUv.x + time), vUv.y + distance ) );

        //vec4 color = vec4(.5);
         
        
        gl_FragColor = vec4(color);

      }
      `
     });

     //this.shaderMaterial.uniforms.needsUpdate = true;

     /* const frequency = 2.5;

     for (let i = 0; i < customPositions.length; i += 3) {
       let x = this.roundedBox.attributes.position.array[i];
       let y = this.roundedBox.attributes.position.array[i + 1];
       let z = this.roundedBox.attributes.position.array[i + 2];

       const patternedX = x + Math.sin(x * frequency);
       const patternedY = y + Math.cos(y * frequency);
       const patternedZ = z + Math.cos(z * frequency);

       customPositions[i] = patternedX;
       customPositions[i + 1] = patternedY;
       customPositions[i + 2] = patternedZ;
     }

     this.roundedBox.setAttribute(
       "aPosition",
       new THREE.BufferAttribute(customPositions, 3)
     );

     this.roundedBox.attributes.position.needsUpdate = true; */

     //////////////////////////////////////////////////////////////////////////////////////////////

     this.geometry1 = new THREE.PlaneGeometry(2,1.5);

     this.plane2 = new THREE.Mesh(this.geometry1, this.shaderMaterial);

     this.plane2.scale.setScalar(750);

     this.plane2.position.set(0, 300, 1190);

     this.plane2.name = "bigboxwithtacobellonit";

     this.scene2.add(this.plane2);

   
    /* if(this.debug){
      this.debugFolder = this.debug.addFolder()

       const rotationData = {
        scaleX: 0,
        rotateX: 0,
      }; 

      this.debugFolder
        .add( this.plane.rotation,'x',0)
        .min(0)
        .max(10)
        .step(0.001) 
        .onChange(() => {
          this.plane.rotation.x = (rotationData.rotateX * Math.PI) / 180;
        }); 

       this.debugFolder
        .add(this.shaderMaterial.uniforms.pNoise, "value", -1.0, 1.0, 0.05)

        
        .onChange(() => {
          this.shaderMaterial.uniforms.pNoise.value += 0.05;
        }); 
    }*/
   
    
  }

  update() {

    this.shaderMaterial.uniforms.time.value += this.time.delta * .05;
    this.shaderMaterial.uniforms.pNoise.value.x += this.time.delta * .002;

  }
  

}


