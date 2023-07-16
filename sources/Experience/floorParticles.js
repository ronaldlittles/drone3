import * as THREE from "three";
import Experience from "./Experience.js";
import { vertexShader } from "./particleVertex.js";
import { fragmentShader } from "./particleFragment.js";
import EventEmitter from './Utils/EventEmitter.js'

export default class FloorParticles extends EventEmitter{
  constructor() {

    super()

    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.scene = this.experience.scene;
   
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.camera = this.experience.camera;
    this.controls = this.experience.controls;
    this.resource = this.resources.items.sceneModel;
   
    //this.setParticles()
  
  }


  setParticles(){

    

    const SEPARATION = 100; 
     this.AMOUNTX = 50; 
     this.AMOUNTY = 50;

    
    this.count = 0;


    const numParticles = this.AMOUNTX * this.AMOUNTY;

				const positions = new Float32Array( numParticles * 3 );
				const scales = new Float32Array( numParticles );

				let i = 0, j = 0;

				for ( let ix = 0; ix < this.AMOUNTX; ix ++ ) {

					for ( let iy = 0; iy < this.AMOUNTY; iy ++ ) {

						positions[ i ] = ix * SEPARATION - ( ( this.AMOUNTX * SEPARATION ) / 2 ); // x
						positions[ i + 1 ] = 0; // y
						positions[ i + 2 ] = iy * SEPARATION - ( ( this.AMOUNTY * SEPARATION ) / 2 ); // z

						scales[ j ] = 1;

						i += 3;
						j ++;

					}

				}

				const geometry = new THREE.BufferGeometry();
				geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
				geometry.setAttribute( 'scale', new THREE.BufferAttribute( scales, 1 ) );


                const material = new THREE.ShaderMaterial( {

					uniforms: {
						color: { value: new THREE.Color('yellow') },
					},
					vertexShader: vertexShader.vertexShader,
					fragmentShader: fragmentShader.fragmentShader

				} );

				//

				this.particles = new THREE.Points(geometry, material);
        //this.scene.add(this.particles);
        this.particles.position.y = 200;
        this.particles.scale.setScalar(2);

        this.particles.visible = true;

            }
  

  update(){
/*
    const positions = this.particles.geometry.attributes.position.array;
    const scales = this.particles.geometry.attributes.scale.array;

    let i = 0, j = 0;

    for ( let ix = 0; ix < this.AMOUNTX; ix ++ ) {

        for ( let iy = 0; iy < this.AMOUNTY; iy ++ ) {

            positions[ i + 1 ] = ( Math.sin( ( ix + this.count ) * 0.3 ) * 50 ) +
                            ( Math.sin( ( iy + this.count ) * 0.5 ) * 50 );

            scales[ j ] = ( Math.sin( ( ix + this.count ) * 0.3 ) + 1 ) * 5 +
                            ( Math.sin( ( iy + this.count ) * 0.5 ) + 1 ) * 5;

            i += 3;
            j ++;

        }

    }

    this.particles.geometry.attributes.position.needsUpdate = true;
    this.particles.geometry.attributes.scale.needsUpdate = true;



    this.count += 1.0;

*/

  }

}