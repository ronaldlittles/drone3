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

   
    
    this.resource2 = this.resources.items.fireTexture;
    this.resource1 = this.resources.items.forrest;
    //this.vid = this.resources.items.video2

    //this.setVideo();
    //this.setVideo2();
   
    //this.setLiveVideo();
   
   
    //this.setVideoTexture();

    this.setSound();
   
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

  setSound(){

         
      const listener = new THREE.AudioListener();
      this.camera.instance.add( listener );

      
      const sound = new THREE.Audio( listener );

     
      const audioLoader = new THREE.AudioLoader();
      audioLoader.load( '/assets/mixkitfunky.mp3', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 0.5 );
        sound.play();
      });

            
      this.analyser = new THREE.AudioAnalyser( sound, 32 );

      console.log(this.analyser)

     
      //this.data = this.analyser.getAverageFrequency();

  }

  setPlane() {

    this.shaderMaterial = new THREE.ShaderMaterial({

      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1.0,
     

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
     uniform float time;

     float s(float lambda) {
      return 3.0 * lambda * lambda - 2.0 * lambda * lambda * lambda;
    }
   
     void main()
     {
   
    
   
       float terrainScale = .01;
      float terrainHeight = .000005;

      // Map vertex position to the range [-0.5, 0.5] based on the terrain scale
      vec3 pos = (position.xyz / terrainScale) - 0.5;
    
      // Apply lambda function to the x and z coordinates (corners)
      //pos.x = s(pos.x)*terrainHeight;
      //pos.z = s(pos.z);
    
      // Combine position with height based on the lambda function
      vec3 finalPosition = vec3(pos);
    
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      vUv = uv;


   
     }
     
         `,
      fragmentShader: `
      #include <common>

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
     
       vec2 T2 = vec2(sin(vUv.x + time * 5.0), scaledDistance );
     
       vec4 color =  texture2D( texture1, T2);
       float cal = fract(atan(pNoise.x));
      
       float l = linearToRelativeLuminance( color.rgb );
       float animationSpeed = 0.1;
       float blueOffset =  sin(time * animationSpeed) * 0.5 + 0.5; 
   
       color.r = texture2D(texture1, vec2(vUv.x - blueOffset, vUv.y )).r;
       color.b = texture2D(texture1, vec2(vUv.x - blueOffset, vUv.y)).b;
       color.g = texture2D(texture1, vec2(vUv.y - blueOffset, vUv.x)).g;
       
       gl_FragColor = color;
       
     

     }
     `
    });



    const length = 15;
    const spacing = 100; // Adjust this value to change the spacing between the planes
    const totalWidth = spacing * length; // Calculate the total width occupied by the planes
    const offsetX = -totalWidth / 2; // Calculate the offset to center the planes
   
   
    this.planes = [];
  
    for (let i = 0; i <= length; i++) {

      this.plane = new THREE.Mesh(

        new RoundedBoxGeometry(2, 2 , 2, 4, 4),

        this.shaderMaterial
       
      );
  
      this.planes.push(this.plane);
      this.scene2.add(this.planes[i]);
  
     
      const posX = offsetX + i * spacing 
      this.plane.position.set(posX, 200, 0);
  
      this.plane.scale.set(25,25,25);

      this.plane.name = "videoplaneboxes";

    } 
 

    this.perlin = new ImprovedNoise();
    this.noise = this.perlin.noise(Math.atan(Math.PI/2 + this.time.elaspsed), Math.cos(this.time.elaspsed), Math.sin(2*this.time.elaspsed))





    ///////SHADER RACE TRACK////////

    this.roundedBox = new THREE.BoxGeometry(2, 2, 2, 24, 24, 24);

    //const uRandom = this.roundedBox.attributes.position.count * 3;

   //const customPositions = new Float32Array(uRandom); 



     /* for (let i = 0; i < customPositions.length; i += 3) {

       let x = this.roundedBox.attributes.position.array[i];
       let y = this.roundedBox.attributes.position.array[i + 1];
       let z = this.roundedBox.attributes.position.array[i + 2];

      

       customPositions[i] = x;
       customPositions[i + 1] = y;
       customPositions[i + 2] = z;

     } */

    
      this.roundedBox.setAttribute("aPosition", this.roundedBox.attributes.position);
     

      

     //////////////////////////////////////////////////////////////////////////////////////////////
    ;

     this.geometry = new THREE.BoxGeometry(2,2,2,100,100,100)

     this.plane2 = new THREE.Mesh(this.roundedBox, this.shaderMaterial);

     this.plane2.scale.setScalar(50);

     this.plane2.position.set(0, 300, 290);

     this.plane2.name = "RACETRACK";

     //this.scene2.add(this.plane2);

   
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

    this.shaderMaterial.uniforms.time.value += this.time.delta * 5;
    this.shaderMaterial.uniforms.pNoise.value.x += this.time.delta * 2;

   this.data = this.analyser.getFrequencyData();

    for(let i =0; i<this.planes.length; i++){

      this.planes[i].scale.y = this.data[i]*.5;

      this.planes[10].scale.y = this.data[5]*.5;
      this.planes[11].rotation.z = this.data[6]*.5;

     this.planes[10].rotation.z += this.data[5]*5;

      

    } 



  }
  

}


