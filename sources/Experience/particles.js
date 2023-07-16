import * as THREE from "three";
import Experience from "./Experience.js";
//import { vertexShader } from "./vertex.js";
//import  fragmentShader  from "./fragment.js";
import EventEmitter from './Utils/EventEmitter.js'
//import Video from './video.js'

export default class Particles extends EventEmitter{
  constructor() {

    super()

    this.experience = new Experience();
    this.resources = this.experience.resources;
  
   
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.camera = this.experience.camera;
    this.controls = this.experience.controls;
    this.resource = this.resources.items.sneakersModel;
    this.scene2 = this.experience.scene2;
    //this.runner = this.scene.getObjectByName("runner");
    this.world = this.experience.world;
    

   
    //this.test.setFloor()
    //this.test.setParticles()
    
    
    this.setParticles()
    //this.setParticles2()
  }


  setParticles2(){
    const vertices = [];

    for ( let i = 0; i < 100; i ++ ) {
    
      const x = THREE.MathUtils.randFloatSpread( 150 );
      const y = THREE.MathUtils.randFloatSpread( 150 );
      const z = THREE.MathUtils.randFloatSpread( 150 );
    
      vertices.push( x, y, z );
  }

const colors = new THREE.Color(1,0,0)

const geometry = new THREE.SphereGeometry(1,2,2);
geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

geometry.setAttribute( 'color', new THREE.Float32BufferAttribute(colors, 3 ) );

const material = new THREE.MeshStandardMaterial();

const points = new THREE.Mesh( geometry, material );

this.scene2.add( points );

//points.scale.setScalar(-50)

}


setParticles(){

 
this.count = 1000;
this.original =  
new THREE.Mesh(new THREE.SphereGeometry(1,32,32), new THREE.MeshPhysicalMaterial
({ color:  Math.random() * 0xffffff,
  //emissive: 'red',
  //envMap: this.cubeTexture,
  //refractionRatio: 0.98,
  //color: "red",
 
  transparent: true,
  opacity: 1.0,
  transmission: 0.9,
  metalness: 0.20,
  clearcoat:.80,
  clearcoatRoughness:1.0,
  roughness:1.0,
  thickness:.80,
  side: THREE.DoubleSide })
)


this.particles = [];



for (let i = 0; i < this.count; i++) {

  this.particle = this.original.clone();
  this.particle.name = 'particle'
 
 

  this.particle.userData.velocity = new THREE.Vector3(0,-1,1);
  this.particle.position.set(0,0,-100)
 
  this.scene2.add(this.particle);

  

  this.particle.scale.setScalar(100);

  this.particles.push(this.particle);

  //THREE.MathUtils.clamp(this.particles[i].position.x,0,0)

}
this.particle.geometry.computeBoundingBox()

return this




  }  
  update(){

  this.particle = this.particles.shift();
  this.particles.push(this.particle);

  this.velocity = this.particle.userData.velocity;
  this.velocity.x = Math.sin(Math.random() * 10000 - 5000)
  this.velocity.y = Math.random() * 0.2 + 0.2 ;
  this.velocity.z = Math.cos(Math.random() *1000 - 500)

  for (let i = 0; i < this.particles.length; i++) {
    this.particle = this.particles[i];

    //this.particle.rotation.x += this.time.delta
    //this.particle.rotation.y += this.time.delta
    //this.particle.rotation.z += this.time.delta

    this.velocity = this.particle.userData.velocity;
    
    this.velocity.z -= 2.98;

    this.particle.position.add(this.velocity);

    if (this.particle.position.z <-100) {
      this.particle.position.z = -100;
      

      this.velocity.z = -this.velocity.z;
      this.velocity.multiplyScalar(this.velocity.x);

     
      
   
    }

   

   


   // this.box = new THREE.BoxHelper( this.particle, 0xffff00 );
    //this.scene.add( this.box );
   // this.box.update()

    /*const numFaces = this.particle.geometry.attributes.position.count / 3;

    const colors = new Float32Array( numFaces * 3 * 3 );

    const color = new THREE.Color();

    for ( let f = 0; f < numFaces; f ++ ) {

      const index = 9 * f;

      const h = 0.2 * Math.random();
      const s = 0.5 + 0.5 * Math.random();
      const l = 0.5 + 0.5 * Math.random();

      color.setHSL( h, s, l );

      const d = 10 * ( 0.5 - Math.random() );

      for ( let i = 0; i < 3; i ++ ) {

        colors[ index + ( 3 * i ) ] = color.r;
        colors[ index + ( 3 * i ) + 1 ] = color.g;
        colors[ index + ( 3 * i ) + 2 ] = color.b;
      }

   
this.particle.geometry.setAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );

  }*/
  }
  


  };




  
}




