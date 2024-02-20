import * as THREE from "three";
import Experience from "./Experience.js";
import EventEmitter from "./Utils/EventEmitter.js";

export default class Debugger extends EventEmitter {

  

  constructor(_options = {}) {

    super()

    this.experience = new Experience();
    this.config = this.experience.config;
    this.debug = this.experience.debug;
    this.world = this.experience.world;

    this.scene = this.experience.scene;
    this.scene2 = this.experience.scene2;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
   
    this.renderer = this.experience.renderer;
    this.targetElement = this.experience.targetElement;
    this.world = this.experience.world;
    
   

    this.resource1 = this.resources.items.me;
    this.resource2 = this.resources.items.fluffy;
    this.resource3 = this.resources.items.sceneModel
    this.resource6 =  this.resources.items.hdr

    console.log(this.world)
    this.uniformsChanged = false;
   

    //this.addToDebugger = this.addToDebugger.bind(this)
   //this.addToDebugger(this.world.box.lights)   //this.addToShaderDebugger(this.world.walls.shaderMaterial)
    //this.addToShaderDebugger(this.world.walls.shaderMaterial5)  
    //this.addToShaderDebugger(this.world.walls.shaderMaterial)  
    
    
  }
  
  

  addToDebugger(object, folder = this.debug, depth = 0, visited = new Set()) {
    if (depth > 3 || visited.has(object)) {
        return;
    }
    visited.add(object);
    for (let name in object) {
        if (name === 'parent' || name === 'children') {
            continue; // Skip parent and children
        }
        let value = object[name];
        if (typeof value === 'number') {
            folder.add(object, name).listen();
        } else if (value instanceof THREE.Vector2) {
            let subFolder = folder.addFolder(name + ' (vec2)');
            subFolder.add(object[name], 'x').listen();
            subFolder.add(object[name], 'y').listen();
        } else if (value instanceof THREE.Vector3) {
            let subFolder = folder.addFolder(name + ' (vec3)');
            subFolder.add(object[name], 'x').listen();
            subFolder.add(object[name], 'y').listen();
            subFolder.add(object[name], 'z').listen();
        } else if (typeof value === 'object' && value !== null) {
            let subFolder = folder.addFolder(name);
            this.addToDebugger(value, subFolder, depth + 1, visited);
        }
    }
}
    

    addToShaderDebugger(object, folder = this.debug) {
        for (let name in object) {
            let value = object[name];
            if (typeof value === 'number') {
                folder.add(object, name).listen().onChange((newValue) => {
                    object[name] = newValue;
                    this.uniformsChanged = true;
                });
            } else if (value instanceof THREE.Vector2) {
                let subFolder = folder.addFolder(name + ' (vec2)');
                subFolder.add(object[name], 'x').listen().onChange((newValue) => {
                    object[name].x = newValue;
                    this.uniformsChanged = true;
                });
                subFolder.add(object[name], 'y').listen().onChange((newValue) => {
                    object[name].y = newValue;
                    this.uniformsChanged = true;
                });
            } else if (value instanceof THREE.Vector3) {
                let subFolder = folder.addFolder(name + ' (vec3)');
                subFolder.add(object[name], 'x').listen().onChange((newValue) => {
                    object[name].x = newValue;
                    this.uniformsChanged = true;
                });
                subFolder.add(object[name], 'y').listen().onChange((newValue) => {
                    object[name].y = newValue;
                    this.uniformsChanged = true;
                });
                subFolder.add(object[name], 'z').listen().onChange((newValue) => {
                    object[name].z = newValue;
                    this.uniformsChanged = true;
                });
            } else if (typeof value === 'object' && value !== null) {
                let subFolder =  folder.addFolder(name);
                this.addToShaderDebugger(value, subFolder);
            }
        }
    }



    


    update() {

      if (this.uniformsChanged) {
        // Update uniforms in shader here
        this.uniformsChanged = false;
    }
   
        
    }


}



