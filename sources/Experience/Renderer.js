import * as THREE from "three";
import Experience from "./Experience.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
//import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

export default class Renderer {
  constructor(_options = {}) {
    this.experience = new Experience();
    
    this.config = this.experience.config;
    this.debug = this.experience.debug;
    this.stats = this.experience.stats;
    this.time = this.experience.time;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.scene2 = this.experience.scene2;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;

    this.world = this.experience.world;
    const layers = new THREE.Layers();


    
    //this.video = this.experience.video;

    //this.resource1 = this.resources.items.tacoBell;

     if (this.debug) {
      this.debugFolder = this.debug.addFolder("renderer");
    } 

    this.usePostprocess = true;

    this.setInstance();
    this.setPostProcess();

  this.setCapture()
    
  
const buttonLeft2 = document.getElementById('left2');
const buttonLeft3 = document.getElementById('left3');

// Add event listeners to the buttons
buttonLeft2.addEventListener('click', () => {
  this.currentScene = this.scene;
  // You may need to call the update method here to render the new scene
  
});

buttonLeft3.addEventListener('click', () => {
  this.currentScene = this.scene2;
  // You may need to call the update method here to render the new scene
  
});

    this.currentScene = this.scene2;


this.switchScene = function() {
  if (this.currentScene === this.scene) {
    this.currentScene = this.scene;
  } else {
    this.currentScene = this.scene2;
  }
}
    
  }



  setInstance() {
    this.clearColor = "#ffffff"; //#02010e

    // Renderer
    this.instance = new THREE.WebGLRenderer({
      alpha: false,
      antialias: true,
      //autoClear: false,
    });
    /* this.instance.domElement.style.position = "absolute";
    this.instance.domElement.style.top = 0;
    this.instance.domElement.style.left = 0;
    this.instance.domElement.style.width = "100%";
    this.instance.domElement.style.height = "100%"; */

    this.instance.setClearColor(this.clearColor, 1);
    this.instance.setSize(this.config.width, this.config.height);
    this.instance.setPixelRatio(this.config.pixelRatio);

    this.instance.physicallyCorrectLights = false;
    //this.instance.gammaOutPut = true
    this.instance.outputEncoding = THREE.sRGBEncoding;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.shadowMap.enabled = true;
    this.instance.toneMapping = THREE.NoToneMapping;
    this.instance.toneMappingExposure = 1;

    this.context = this.instance.getContext();

    // Add stats panel
    if (this.stats) {
      this.stats.setRenderPanel(this.context);
    }

    // Debug
    if (this.debug) {
      this.debugFolder.addColor(this, "clearColor").onChange(() => {
        this.instance.setClearColor(this.clearColor);
      });

      this.debugFolder
        .add(this.instance, "toneMapping", {
          NoToneMapping: THREE.NoToneMapping,
          LinearToneMapping: THREE.LinearToneMapping,
          ReinhardToneMapping: THREE.ReinhardToneMapping,
          CineonToneMapping: THREE.CineonToneMapping,
          ACESFilmicToneMapping: THREE.ACESFilmicToneMapping,
        })
        .onChange(() => {
          this.scene2.traverse((_child) => {
            if (_child instanceof THREE.Mesh)
              _child.material.needsUpdate = true;
          });
        });

      this.debugFolder.add(this.instance, "toneMappingExposure").min(0).max(10);
    }
  }

  setPostProcess() {
    this.postProcess = {};

    this.postProcess.renderPass = new RenderPass(
      this.scene2,
      this.camera.instance
    );

    const params = {
      exposure:.5,
      bloomStrength:0,
      bloomThreshold:0,
      bloomRadius:0,
    };

    this.postProcess.unrealBloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.sizes.width, this.sizes.height),
      0,
      0,
      0
    );

    this.postProcess.unrealBloomPass.exposure = params.exposure;
    this.postProcess.unrealBloomPass.threshold = params.bloomThreshold;
    this.postProcess.unrealBloomPass.strength = params.bloomStrength;
    this.postProcess.unrealBloomPass.radius = params.bloomRadius;

    if (this.debug) {
      this.debugFolder
     .add(this.postProcess.unrealBloomPass, "exposure", 0)
      .min(0)
      .max(10)
      .step(0.0001); 
      this.debugFolder
        .add(this.postProcess.unrealBloomPass, "threshold", 0)
        .min(0)
        .max(10)
        .step(0.0001);
      this.debugFolder
        .add(this.postProcess.unrealBloomPass, "strength", 0)
        .min(0)
        .max(10)
        .step(0.0001);
      this.debugFolder
        .add(this.postProcess.unrealBloomPass, "radius", 0)
        .min(0)
        .max(10)
        .step(0.0001);
    }

    this.postProcess.unrealBloomPass.enabled = true;

    //this.postProcess.outputPass = new OutputPass();

    this.renderTarget = new THREE.WebGLRenderTarget(
      this.sizes.width,
      this.sizes.height,

      {
        generateMipmaps: false,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        encoding: THREE.sRGBEncoding,
      }
    );

    

    

    this.renderTarget2 = new THREE.WebGLRenderTarget(
      this.sizes.width,
      this.sizes.height,

      {
        generateMipmaps: false,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        encoding: THREE.sRGBEncoding,
      }
    );

    this.postProcess.composer = new EffectComposer(
      this.instance,
      this.renderTarget
    );

    this.postProcess.composer.setSize(this.config.width, this.config.height);

    this.postProcess.composer.setPixelRatio(this.config.pixelRatio);

    this.postProcess.composer.addPass(this.postProcess.renderPass);

    this.postProcess.composer.addPass(this.postProcess.unrealBloomPass);

    //this.postProcess.composer.addPass(this.postProcess.outputPass);

   
    this.postProcess.unrealBloomPass.renderTarget = this.renderTarget;

    

  }

  // Assuming `captureButton` is the button element to trigger the capture process

  setCapture(){



  this.instance.setRenderTarget(this.renderTarget2);

 this.instance.render(this.scene, this.camera.instance);

 this.instance.setRenderTarget(null)

  
  



  }




  resize() {
    // Instance
    this.instance.setSize(this.config.width, this.config.height);
    this.instance.setPixelRatio(this.config.pixelRatio);

    // Post process
    this.postProcess.composer.setSize(this.config.width, this.config.height);
    this.postProcess.composer.setPixelRatio(this.config.pixelRatio);
  }

  update() {
    /*  this.mesh2.rotation.y += this.time.delta * .009
    this.mesh2.position.z += Math.random()*Math.sin(Math.PI*1000) * this.time.delta * .009 */

    if (this.stats) {
      this.stats.beforeRender();
    }

    if (this.usePostprocess) {

      this.instance.setRenderTarget(this.renderTarget)
      
      this.instance.render(this.scene2, this.camera.instance2)

      
  

       this.instance.setRenderTarget(null)

      this.instance.autoClear = false

      this.instance.clear()
      
      this.instance.render(this.scene,this.camera.instance2)//this.camera.orthographicCamera.renderTarget(this.currentScene, );

      this.instance.render(this.currentScene, this.camera.instance);

     
    } else {
     
      this.postProcess.composer.render();
    }

   

    if (this.stats) {

      this.stats.afterRender();

    }

  }

  destroy() {
    this.instance.renderLists.dispose();
    this.instance.dispose();
    this.renderTarget.dispose();
    this.postProcess.composer.renderTarget1.dispose();
    this.postProcess.composer.renderTarget2.dispose();
  }
}
