import * as THREE from "three";
import Experience from "./Experience.js";
import EventEmitter from "./Utils/EventEmitter.js";
import  {DefaultLoadingManager}  from "three/examples/jsm/loaders/LoadingManager.js";


export default class PreLoader extends EventEmitter {

  

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
    
   this.setLoader()
  
    
  }


  setLoader(){

    this.loadingManager = new THREE.DefaultLoadingManager()


    this.loadingManager.onStart = ( url, itemsLoaded, itemsTotal ) => {
      console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    }


      this.loadingManager.onLoad = () => {

        console.log( 'Loading complete!');
        this.emit('loaded')
      } 

        this.loadingManager.onProgress = ( url, itemsLoaded, itemsTotal ) => {
            console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        }

        this.loadingManager.onError = ( url ) => {
            console.log( 'There was an error loading ' + url );
        }




  }

}
