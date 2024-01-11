import * as THREE from "three";
import Experience from "./Experience.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
//import Video from './video.js'

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

    const layers = new THREE.Layers();

    //this.video = this.experience.video;

    //this.resource1 = this.resources.items.tacoBell;

     if (this.debug) {
      this.debugFolder = this.debug.addFolder("renderer");
    } 

    this.usePostprocess = true;

    this.setInstance();
    this.setPostProcess();

    //this.setPlane();
  }

  setInstance() {
    this.clearColor = "#02010e";

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

    this.instance.physicallyCorrectLights = true;
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
      bloomStrength:.9,
      bloomThreshold:.5,
      bloomRadius:.7,
    };

    this.postProcess.unrealBloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.sizes.width, this.sizes.height),
      .5,
      1.3,
      1.3
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

   
    this.postProcess.unrealBloomPass.renderTarget = this.renderTarget;

    console.log(this.renderTarget);
  }

  setPlane() {
    this.video = document.querySelector(".video");
    this.search = window.document.getElementById("search");
    this.social = window.document.getElementById("social");
    this.ssie = window.document.getElementById("ssie");
    //this.video.play();

    this.texture = new THREE.VideoTexture(this.video);

    this.plane = new THREE.BoxGeometry(2, 2, 2, 2);
    this.material = new THREE.MeshBasicMaterial({
      color: "yellow",
      side: THREE.DoubleSide,
      //map: this.resource1,
      //wireframe: true,
    });
    this.mesh = new THREE.Mesh(this.plane, this.material);
    this.mesh.scale.set(275, 200, 200);
    //this.scene2.add(this.mesh);

    this.plane = new THREE.SphereGeometry(1, 32, 32);

    this.material = new THREE.MeshBasicMaterial({
      //color: 'black',
      side: THREE.DoubleSide,
      //map: this.texture,
      transparent: true,
      opacity: 0.8,
    });

    this.mesh2 = new THREE.Mesh(this.plane, this.material);
    this.mesh2.scale.set(35, 35, 35);
    //this.scene2.add(this.mesh2);
    this.mesh2.position.y = 50;
    this.mesh2.position.x = 210;

    this.plane = new THREE.PlaneGeometry(2, 2, 2, 2);
    this.material = new THREE.MeshBasicMaterial({
      color: "purple",
      side: THREE.DoubleSide,
      map: this.renderTarget.texture,
      transparent: true,
      opacity: 1,
    });
    this.mesh3 = new THREE.Mesh(this.plane, this.material);
    this.mesh3.scale.set(275, 50, 10);
    //this.scene2.add(this.mesh3);
    this.mesh3.position.set(0, -250, 0);

    this.mesh3.name = "added";

    this.car = this.scene2.getObjectByName("added");

    //add pingpong

    const newPosition = new THREE.Vector3(-200, -250, 0);
    const oldPosition = new THREE.Vector3(200, -250, 0);

    const damp = new THREE.MathUtils.damp(
      oldPosition.x,
      newPosition.x,
      0.000000000001,
      this.time.delta * 0.000000009
    );

    const smootherstep = new THREE.MathUtils.smootherstep(
      this.time.delta,
      200,
      -200
    );

  }

  resize() {
    // Instance
    this.instance.setSize(this.config.width, this.config.height);
    this.instance.setPixelRatio(this.config.pixelRatio);

    // Post process
    //this.postProcess.composer.setSize(this.config.width, this.config.height);
    //this.postProcess.composer.setPixelRatio(this.config.pixelRatio);
  }

  update() {
    /*  this.mesh2.rotation.y += this.time.delta * .009
    this.mesh2.position.z += Math.random()*Math.sin(Math.PI*1000) * this.time.delta * .009 */

    if (this.stats) {
      this.stats.beforeRender();
    }

    if (this.usePostprocess) {
      /* this.instance.setViewport(0, 0, this.sizes.width, this.sizes.height);

        this.instance.render(this.scene2, this.camera.instance);

        this.postProcess.composer.render();
        
        this.instance.setScissorTest(true);

        this.instance.setViewport(
            this.sizes.width - this.sizes.width ,
            this.sizes.height - this.sizes.height / 6,
            this.sizes.width *2,
          100
        );
       
         this.instance.setScissor(
            this.sizes.width - this.sizes.width ,
            this.sizes.height - this.sizes.height / 6,
            this.sizes.width *2,
           100
        );  
 
       //this.instance.render(this.scene, this.camera.instance2);
        
       this.instance.setScissorTest(false); */

       //this.renderer.clear()

      this.instance.setRenderTarget(this.renderTarget);

      this.instance.render(this.scene2, this.camera.instance);

      this.instance.setRenderTarget(null);

      this.postProcess.renderToScreen = true;

      this.postProcess.composer.render();

    } else {
     
      this.postProcess.composer.render();
      //this.instance.render(this.scene2, this.camera.instance);
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
