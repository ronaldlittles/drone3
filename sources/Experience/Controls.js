import * as THREE from 'three';
import Experience from './Experience';
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MapControls } from 'three/examples/jsm/controls/OrbitControls';
import {DragControls} from 'three/examples/jsm/controls/DragControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { Vector2 } from 'three';
import World from './World.js';
import GSAP from "gsap";
//import { TweenMax } from 'gsap';
//import Bag from './bag.js';
import { Text } from "troika-three-text";
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';

export default class Controls{
    constructor(){
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.scene2 = this.experience.scene2;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.camera = this.experience.camera;
    this.sizes = this.experience.sizes;
    this.targetElement = this.experience.targetElement;
    //this.render = this.experience.renderer;
   
   
        //this.setText();
        this.setMouse();
        //this.switchControls();
        //this.setDragControls();
        //this.setMapControls();
        //this.setTransformControls()
    }
     switchControls() {
        console.log('switched')
        //this.camera.instance.lookAt(0,0,300)
        //this.camera.instance.updateProjectionMatrix()
       
     }
    
    setMouse() {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2(0,0);

       

       
        window.addEventListener('pointermove', (event) => {
            
            this.mouse.x = event.clientX / this.sizes.width * 2 - 1;
            this.mouse.y = -(event.clientY / this.sizes.height) * 2 + 1;
            
        });

       /*  window.addEventListener('wheel', (e)=> {
            this.wheelY = e.deltaY * .00005
          
            
           
        }); */

      
        window.addEventListener('click', () => {
            
            this.time.trigger('mouseDown');
        });
      
        window.addEventListener('click', () => {

            this.time.trigger('mouseUp');
            
        });

        // touch move on mobile
        window.addEventListener('touchmove', (event) => {
            this.mouse.x = event.touches[0].clientX / this.sizes.width * 2 - 1;
            this.mouse.y = -(event.touches[0].clientY / this.sizes.height) * 2 + 1;
        });

        // touch start on mobile
        window.addEventListener('touchstart', () => {
            this.time.trigger('pointerdown');
        });

        // touch end on mobile
        window.addEventListener('touchend', () => {
            this.time.trigger('pointerup');
        });

        
       
       
        const btn = document.getElementById('search');
       
        
        
        btn.addEventListener('pointerdown', (e) => {
            e.preventDefault()
         

            //this.camera.orbitControls.autoRotate = true
          
          
            //this.camera.orbitControls.target = new THREE.Vector3(100, 0, 300)
               //this.switchControls();
            //console.log(this.camera)
              
             GSAP.to(
                this.camera.instance.rotation,
                {
                    //position: Math.PI/2,
                    duration: 1,
                    ease: 'power2.easeOut',
                   y: 50  ,
                })  
 
                //this.camera.instance.rotation.set(0, 0, -5000);
               
        })
          
        //camera to path
        //https://threejs.org/manual/en/scenegraph.html

    }

    setDragControls(){

        

       /* this.objects = this.scene.children
        this.experience.traverse((_child) => {
            if (_child.isMesh){
                this.objects.push(_child)
            }
              
        })*/
       
      
      
        
        this.controls = new DragControls( this.objects, this.camera.instance,  this.targetElement );

        this.controls.transformGroup = true;

        
        
        this.controls.addEventListener( 'dragstart', function ( event ) {
            //event.preventDefault()
          //console.log(this.controls)
        //disable other control temporarily
           
        } );
        
        this.controls.addEventListener( 'dragend', function ( event ) {

            //event.preventDefault()
            //this.orbitControls.enabled = true
          
        } );

      


    }

    setMapControls(){
        this.mapControls = new Controls(this.camera.instance, this.targetElement );

				//mapControls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

				this.mapControls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
				this.mapControls.dampingFactor = 0.05;

				this.mapControls.screenSpacePanning = false;

				this.mapControls.minDistance = 100;
				this.mapControls.maxDistance = 200;

				this.mapControls.maxPolarAngle = Math.PI /3;

				
    }

    setTransformControls(){
      
       
       
    this.scene.traverse((_child) => {
        if (_child.isMesh){
            this.objects.push(_child)
        }
          
    })
    
    this.objects = []
  
   

        this.control = new TransformControls( this.camera.instance2, this.targetElement );
        
        
        this.control.addEventListener( 'dragging-changed',  ( event )=> {

           
              
              this.camera.orbitControls.enabled = ! event.
              value;
             
    
          } );
       

       
            
           
				

        window.addEventListener( 'keydown', ( event )=> {

            switch ( event.keyCode ) {

                case 81: // Q
                    this.control.setSpace( this.control.space === 'local' ? 'world' : 'local' );
                    break;

                case 16: // Shift
                    this.this.control.setTranslationSnap( 100 );
                    this.control.setRotationSnap( THREE.MathUtils.degToRad( 15 ) );
                    this.control.setScaleSnap( 0.25 );
                    break;

                case 87: // W
                    this.control.setMode( 'translate' );
                    break;

                case 69: // E
                    this.control.setMode( 'rotate' );
                    break;

                case 82: // R
                    this.control.setMode( 'scale' );
                    break;

                

                    }
                })

                window.addEventListener( 'keyup', ( event )=> {

					switch ( event.keyCode ) {

						case 16: // Shift
						this.control.setTranslationSnap( null );
						this.control.setRotationSnap( null );
						this.control.setScaleSnap( null );
							break;

					}

				} );


            

    }

    setText(){
        const myText3 = new Text();
    this.scene.add(myText3);
    myText3.text =
      "why do alignment when I can make things draggable? The user designs the scene, I just write the code to facilitate creativity. color matching and stuff is important too some more text to see positioning at a smaller scale to see alignment because symmetry is all that is looked for. color matching and stuff is important too. There is almost a 2 color rule, unless it's some underwater fish tank type scene."

    myText3.fontSize = 15.0;
    myText3.color = "yellow";
    myText3.maxWidth = 200;
    myText3.position.set(0, 0,0);
    myText3.sync();
    }

  

    update(){
       
       

        this.raycaster.setFromCamera( this.mouse, this.camera.instance );
       
        

       /* this.intersects = this.raycaster.intersectObjects( this.scene.children, false);


        window.addEventListener('click', ()=>{
          
        for ( let i = 0; i < this.intersects.length; i ++ ) {
    
        if(this.intersects){
         
        
       this.control.attach(this.intersects[0].object);
       this.scene.add( this.control );    

       this.currentPosition = this.intersects[0].object.position 
       this.intersects[0].object.scale 
       this.intersects[0].object.rotation.y += 10

    }

        }
   })*/
       
        
    }
    

}