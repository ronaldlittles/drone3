import * as THREE from "three";
import Experience from "./Experience.js";
import {vertexShader} from './shaders/vertex.js'
import {fragmentShader} from './fragment.js'
import {Water} from 'three/examples/jsm/objects/Water.js'


export default class Car {
  constructor() {

    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.camera = this.experience.camera;
  
    this.resource = this.resources.items.carModel;
    this.resource1 =  this.resources.items.waterTexture
  
    //this.setModel();
    //this.setWater()
    //this.setSound();
    
    //this.setAnimation();

    

  }

  setSound(){

  const listener = new THREE.AudioListener();
  this.camera.instance.add( listener );

  const sound = new THREE.Audio( listener );

  const audioLoader = new THREE.AudioLoader();
  audioLoader.load( '/assets/icecubefunk.wav', function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop( true );
    sound.setVolume( .5 );
    sound.play();
  });

  }


setWater(){
  
  this.waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );

  this.water = new Water(
    this.waterGeometry,
    {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: this.resource1,
      waterColor: 0x0000ff,
      distortionScale: 3.7,
      size: .01,
      fog: this.scene.fog !== undefined
    }
  );

  this.water.rotation.x = - Math.PI / 2;
  this.water.position.y = -.5
  //this.scene.add( this.water );
  console.log(this.resource.scene)

}
  

  setModel() {
    this.shaderMaterial = new THREE.ShaderMaterial({
      //side:THREE.BackSide,
      uniforms:
      {
        
         time: {value: 1.0},
         texture1: { value: this.resources.items.lennaTexture},
         texture2: { value: this.resources.items.yellow }
         
      },

      vertexShader: vertexShader.vertexShader,
      fragmentShader: fragmentShader.fragmentShader,

    })

    
    this.model = this.resource.scene;
    this.model.name = "car"

    this.model.scale.set(.005, .005, .005);

    this.model.rotation.y = Math.PI * .5;

    this.model2 = this.model.clone()
  
   // for ( let i = 0; i < 200; i ++ ) {

   // this.model.position.x =Math.random() * 1800 - 800;
    this.model.position.y = 0;
    this.model.position.z = -42;
    //this.model.position.x = -57;

   // } 

   
    //this.scene.add(this.model);
    //this.scene.add(this.model2)

    this.model2.position.set(0,-100,0)
    this.model2.scale.setScalar(10000)

}


update(){
  //this.water.material.uniforms.time.value += this.time.delta

    /* this.model2.rotation.y += this.time.delta*.0009
    this.model2.rotation.z += this.time.delta*.00009
    this.model2.rotation.x += this.time.delta*.00009 */
}


}