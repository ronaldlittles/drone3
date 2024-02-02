import * as THREE from "three";
import Experience from "./Experience.js";
import {vertexShader} from './shaders/vertex.js'
import {smokeFragment} from './smokeFragment.js'
import GSAP from "gsap";


export default class SceneWorld {
  constructor() {

    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.camera = this.experience.camera;
    this.controls = this.experience.controls;
  
   /*  if (this.debug) {
      this.debugFolder = this.debug.addFolder("runner");
    } */
    
    this.resource = this.resources.items.carModel;
    this.resource1 = this.resources.items.runningModel;
   
    //this.setModel();
    //this.setAnimation();

  }

  

  

  setModel() {
    
    this.shaderMaterial = new THREE.ShaderMaterial({
      side:THREE.FrontSide,
      //transparent: true,
      //opacity: 1.0,
      uniforms:
      {
        
         time: {value: 1.0},
         texture1: { value: this.resources.items.lavaTexture},
         texture2: { value: this.resources.items.yellow }
         
      },

      vertexShader: vertexShader.vertexShader,
      fragmentShader: smokeFragment.fragmentShader,

    })

    /*this.shaderMaterial.uniforms.texture1.value.wrapS = this.shaderMaterial.uniforms.texture1.value.wrapT = THREE.RepeatWrapping;
    this.shaderMaterial.uniforms.texture2.value.wrapS = this.shaderMaterial.uniforms.texture2.value.wrapT = THREE.RepeatWrapping;

    this.shaderMaterial.uniforms.texture2.value.repeat.set(4,64)*/

    this.model = this.resource.scene;
    this.model.scale.set(1, 1, 1);

   

    this.scene.add(this.model);
    //this.model.position.z =  250
    
   
    

    //this.model.visible = false
    this.model.name = "car"
   
    
   /* console.log(GSAP)
    const btn = document.querySelector('.controls_switch');
    btn.addEventListener('pointerdown', (e) => {
    GSAP.to(
      this.model.rotation,
      {
          ease: 'elastic',
          duration: 5,
          z: 200.5,
          x: 12.5,
          y: 12.5
      }
)

}) */
this.material = new THREE.MeshBasicMaterial({color:'yellow'})
this.geometry = new THREE.CircleGeometry(1,36,36)
this.mesh = new THREE.Mesh(this.geometry, this.material)
//this.scene.add(this.mesh)
this.mesh.scale.setScalar(1600)
this.mesh.position.z = -1000
this.mesh.position.y = -500
this.mesh.rotation.x = Math.PI/2


   
    /*console.log(this.model.children[0].children[0].children[1].material)
this.model.children[0].children[0].children[1].material =  this.shaderMaterial*/
  

  }

  setAnimation() {

    this.model1 = this.resource1.scene
    this.scene.add(this.model1)
    this.model1.scale.set(.16,.16,.16)
    //this.model1.name = 'runner'
    //this.model1.rotation.set(0,Math.PI/2,0)
    //this.model1.geometry.computeBoundingBox()

    console.log(this.model1.children[0].children[1].geometry.boundingBox.max)


  this.model1bbm = this.model1.children[0].children[1].geometry.boundingBox.max

    this.animation = {};

    // Mixer
    this.animation.mixer = new THREE.AnimationMixer(this.model1);
    console.log(this.animation.mixer)
    // Actions
    this.animation.actions = {};
    console.log(this.animation.actions)
    this.animation.actions.idle = this.animation.mixer.clipAction(
      this.resource1.animations[0]
    );
    this.animation.actions.walking = this.animation.mixer.clipAction(
      this.resource1.animations[1]
    );
    this.animation.actions.running = this.animation.mixer.clipAction(
      this.resource1.animations[2]
    );

    this.animation.actions.current = this.animation.actions.idle;
    this.animation.actions.current.play();

    // Play the action
    this.animation.play = (name) => {
      const newAction = this.animation.actions[name];
      const oldAction = this.animation.actions.current;

      newAction.reset();
      newAction.play();
      newAction.crossFadeFrom(oldAction, 0);

      this.animation.actions.current = newAction;
    };
   
    this.animation.play("walking")
    


    // Debug
   /*  if (this.debug) {
      const debugObject = {
        playIdle: () => {
          this.animation.play("idle");
        },
        playWalking: () => {
          this.animation.play("walking");
        },
        playRunning: () => {
          this.animation.play("running");
        },
      };
      this.debugFolder.add(debugObject, "playIdle");
      this.debugFolder.add(debugObject, "playWalking");
      this.debugFolder.add(debugObject, "playRunning");
    } */

   
  }

 


  update() {

    
    
    //this.mesh.rotation.z += this.time.delta * .00009
    //this.shaderMaterial.uniforms.time.value +=  this.time.delta
   //this.model.getObjectByName('hoodie').rotation.y += this.time.delta*.001
   //this.shaderMaterial.uniforms.time.value += this.time.delta*.1;
   //this.camera.modes.default.instance.rotation.x += this.time.delta
   // * .01;
    //this.animation.mixer.update();
   //this.model.position.y = this.time.delta 
  }

  destroy(){
    this.shaderMaterial.dispose()
    this.shaderMaterial.destroy()

  }

}
