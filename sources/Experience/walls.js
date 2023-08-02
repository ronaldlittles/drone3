import * as THREE from "three";
import Experience from "./Experience.js";
import EventEmitter from "./Utils/EventEmitter.js";
import GSAP from "gsap";
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise.js";
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';


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

    this.resource2 = this.resources.items.fireTexture;
    this.resource1 = this.resources.items.tacoBell;

    this.mazeGroup = new THREE.Group();
  this.scene2.add(this.mazeGroup);

    
    this.setMaze();
    this.createWall();
    this.setWalls();
    
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
        
        setWalls(){

          let map = {}

         let x, y;

         const columnWidth = 60; 
        const mazeWidth = this.maze[0].length;

       

          for (let row = 0; row < this.maze.length; row++) {
             
              y = -row *60;
  
              map[y] = {};
  
             
              for (let column = 0; column < this.maze[row].length; column += 2) {

                  x = Math.floor(column - mazeWidth/2 ) * columnWidth;
  
                 let cell = this.maze[row][column];

                 

                 let object = null;
  
                  if (cell === '#') {

                      object = this.mesh.clone();
                      
                  } 
                  
                  else if (cell === "."){

                    object = this.mesh2.clone();

                  }


  
                  if (object !== null) {

                      object.position.set(x, y, 0);
                      map[y][x] = object;
                      this.mazeGroup.add(object);
                      this.mazeGroup.rotation.x = -Math.PI / 2;
                      this.mazeGroup.position.y = 50
                      
                      

                  }
              }
          }

        console.log(map)
          
        }


        createWall() {
          const boxSize = 48; 
          const spacing = 0; 
        
          this.geometry = new THREE.BoxGeometry(2, 80, 96);
          this.material = new THREE.MeshBasicMaterial({
            map: this.resource1,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: .5
          });
          this.mesh = new THREE.Mesh(this.geometry, this.material);
          this.mesh.rotation.x += Math.PI / 2;
        
          // Offset the boxes so they are positioned at the center of each cell
          const offset = (boxSize + spacing) / 2;
        
          // Set the position of the maze group so that the boxes are edge-to-edge
          this.mazeGroup.position.x = 135//-((this.maze[0].length - 1) * (boxSize + spacing)) / 2 + offset;
          this.mazeGroup.position.y = -((this.maze.length - 1) * (boxSize + spacing)) / 2 + offset;




     
          this.geometry2 = new THREE.CylinderGeometry(4,4,36,36, true, 0, Math.PI);
          this.material2 = new THREE.MeshBasicMaterial({
            map: this.resource1,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: .5
          });
          this.mesh2 = new THREE.Mesh(this.geometry2, this.material2);


       



       if(this.debug){

       this.debugFolder = this.debug.addFolder()

      

      this.debugFolder
        .add(this.mazeGroup.position,'z',0)
        .min(0)
        .max(100)
        .step(0.01) 
        
       this.debugFolder
        .add(this.mazeGroup.rotation, "x", -1.650, 100.0, 0.005)

        this.debugFolder
        .add(this.mazeGroup.position, "x", -131.50, 1000.0, 0.5)


        
     
    }

        }
        






  update() {

  }


}