import * as THREE from "three";
import Experience from "./Experience.js";
import EventEmitter from "./Utils/EventEmitter.js";
import GSAP from "gsap";
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise.js";
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { vertexShader } from "./vertex.js";
import { fragmentShader } from "./fragment.js";
import { VertexTangentsHelper } from "three/examples/jsm/helpers/VertexTangentsHelper.js";
import { Flow } from 'three/examples/jsm/modifiers/CurveModifier.js';
import RollerCoasterGeometry from './track1.js'
import { ViewHelper } from "three/examples/jsm/helpers/ViewHelper.js";
import { DecoratedTorusKnot5c } from "three/examples/jsm/curves/CurveExtras.js";
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

    this.resource2 = this.resources.items.smoke;
    this.resource1 = this.resources.items.tacoBell;


    this.mazeGroup = new THREE.Group();
    this.scene2.add(this.mazeGroup);

    //this.setModel();
    //this.setMaze();
    this.createWall();
    //this.setWalls();

    this.setRaycaster();

    

    this.CameraHelper = new ViewHelper(this.camera.instance);
    this.scene2.add(this.CameraHelper);
    
  }

  setModel() {

    this.model = this.resource2.scene;
    this.model.name = "droneModel";
    //this.scene2.add(this.model);
    this.model.position.set(-1300, 375, 1300);
    this.model.rotation.set(0, 0, 0);
    this.model.scale.set(200,10,600)
    //this.model.scale.setScalar(200);
    //this.model.castShadow = true;
    this.model.receiveShadow = true;

   
    
    
    


    this.meshes = [];
          this.model.traverse((object) => {
            if (object.isMesh) {
              this.meshes.push(object);
            } 
          });

        /*  this.meshes[0].material.map = this.resource1
         this.meshes[0].material.transparent = true
         this.meshes[0].material.opacity = .2 */

         console.log(this.meshes)
  }


   

    setMaze(){

       
        this.maze = [
          
            '# # # # # # # # # # # # # # # # # # # # # # # # # # # #',
            '# . . . . . . . . . . . . # # . . . . . . . . . . . . #',
            '# . # # # # . # # # # # . # # . # # # # # . # # # # . #',
            '# o # # # # . # # # # # . # # . # # # # # . # # # # o #',
            '# . # # # # . # # # # # . # # . # # # # # . # # # # . #',
            '# . . . . . . . . . . . . . . . . . . . . . . . . . . #',
            '# . # # # # . # # . # # # # # # # # . # # . # # # # . #',
            '# . # # # # . # # . # # # # # # # # . # # . # # # # . #',
            '# . . . . . . # # . . . . # # . . . . # # . . . . . . #',
            '# # # # # # . # # # # #   # #   # # # # # . # # # # # #',
           
            '# # # # # # . # #   # # # # # # # #   # # . # # # # # #',
            '# . . . . . . . . . . . . # # . . . . . . . . . . . . #',
            '# . # # # # . # # # # # . # # . # # # # # . # # # # . #',
            '# . # # # # . # # # # # . # # . # # # # # . # # # # . #',
            '# o . . # # . . . . . . . P   . . . . . . . # # . . o #',
            '# # # . # # . # # . # # # # # # # # . # # . # # . # # #',
            '# # # . # # . # # . # # # # # # # # . # # . # # . # # #',
            '# . . . . . . # # . . . . # # . . . . # # . . . . . . #',
            '# . # # # # # # # # # # . # # . # # # # # # # # # # . #',
            '# . # # # # # # # # # # . # # . # # # # # # # # # # . #',
            '# . . . . . . . . . . . . . . . . . . . . . . . . . . #',
            '# # # # # # # # # # # # # # # # # # # # # # # # # # # #'
                ];

                
      
        
        
            
        }
        setRaycaster() {
          window.addEventListener( "pointerdown", (event) => {
      
        
            const raycaster = new THREE.Raycaster();
      
            raycaster.setFromCamera( this.mouse, this.camera.instance );
      
            const intersects = raycaster.intersectObjects( this.scene2.children );

            

           
            if (intersects.length > 0) {
      
              const point = intersects[0].object;
      
              //this.arrayObject1[i].position.copy( point );

              this.scene2.remove(point)
              console.log(point)
 
           }

         
      
          
           
        })
         
         
      
        }
        
        

          getPointAt2(t) {

           const radius = 50;
            const vector = new THREE.Vector3();
            const vector2 = new THREE.Vector3();
            const PI2 = Math.PI * 2;
            t = t * PI2;
    
            
            const x = Math.sin( t*2 ) *radius// Math.cos( t*2 ) * 100 ;
						const y = 0//Math.cos( t * 30 )// * 2 + Math.cos( t * 57 ) * 2 + 5;
						const z = Math.cos( t ) *radius //+ Math.sin( t  ) * 50;

         
            return vector.set( x, y, z ).multiplyScalar( 2 );
          }
    
          getTangentAt2(t) {

            const delta = 0.0001;
            const t1 = Math.max(0, t - delta);
            const t2 = Math.min(1, t + delta);
    
            return vector2
              .copy(this.getPointAt(t2))
              .sub(this.getPointAt(t1))
              .normalize();

          }
     

        
        
        
        setWalls(){

          let map = {}

          let x, y;

         const columnWidth = 160; 
         const mazeWidth = this.maze[0].length;

       

          for (let row = 0; row < this.maze.length; row++) {
             
              y = -row *160;
  
              map[y] = {};
  
             
              for (let column = 0; column < this.maze[row].length; column += 2) {

                  x = Math.floor(column - mazeWidth/2 ) * columnWidth;
  
                 let cell = this.maze[row][column];

                
                 

                 let object = null;
  
                  if (cell === '#') {

                      object = null//this.mesh.clone();
                      
                  } 
                  
                  else if (cell === "."){

                object = null//this.model.clone();

                  }


  
                  if (object !== null) {

                      object.position.set(x, y, 0);
                      map[y][x] = object;

                       //this.mazeGroup.add(object);
                      this.mazeGroup.rotation.x = -Math.PI / 2;
                      this.mazeGroup.position.y = 50 
                      
                      //this.scene2.add(object)

                  }
              }
          }

       
          
        }