
import * as THREE from 'three'
import * as dat from 'lil-gui'

import Time from './Utils/Time.js'
import Sizes from './Utils/Sizes.js'
import Stats from './Utils/Stats.js'

import Resources from './Resources.js'

import Renderer from './Renderer.js'


import World from './World.js'
import Camera from './Camera.js'


import SceneWorld from './sceneworld.js'
import Controls from './Controls.js'
import assets from './assets.js'
import Mouse from './mouse.js'



//import Video from "./video.js";
   

export default class Experience
{
    static instance

    constructor(_options = {})
    {

     /*    const startButton = document.getElementById( 'startButton' );
    
        startButton.addEventListener( 'click', ()=> { */
            
        if(Experience.instance)
        {
            return Experience.instance
        }
        Experience.instance = this

   
        
        // Options
        this.targetElement = _options.targetElement

        if(!this.targetElement)
        {
            console.warn('Missing \'targetElement\' property')
            return
        }

        this.time = new Time()
        this.sizes = new Sizes()
        //this.scene2 = new THREE.Scene()
        
         
  
        this.setConfig()
        this.setDebug()
        //this.setStats()
        this.setScene()
        this.setScene2()
        this.setCamera()

        
        this.setRenderer()
        
        this.setMouse()
      
        this.setResources()
        //this.setControls()

        this.setWorld()
        //this.setVideo();
      
        
      

         const testGeometry = new THREE.PlaneGeometry(20,20)
         const testMaterial = new THREE.MeshBasicMaterial({
            color: 'blue',
            side: THREE.DoubleSide,
            //map: this.video,
        })

        const testMesh = new THREE.Mesh( testGeometry, testMaterial )
       // this.scene.add(testMesh)

        testMesh.scale.set(2,2,2)

        testMesh.scale.setScalar(5) 

         
       
       
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

       

        this.update()

       
    }

    /* setVideo() {
        this.video = new Video();
      } */

    setControls(){
        
        this.controls = new Controls()
      
    }
   
    setConfig()
    {
        this.config = {}
    
        // Debug
        this.config.debug = window.location.hash === '#debug'
      

        // Pixel ratio
        this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

        // Width and height
        const boundings = this.targetElement.getBoundingClientRect()
        this.config.width = boundings.width
        this.config.height = boundings.height || window.innerHeight

    
    }

     setDebug()
    {
        if(this.config.debug)
        {
            this.debug = new dat.GUI()
            //this.debug = new Pane()
            //this.debug.containerElem_.style.width = '320px'
            //this.debug.containerElem_.style.width = '320px'
console.log(this.debug)
            
        }
    } 

   

    

   
  
    setStats()
    {
        if(this.config.debug)
        {
            this.stats = new Stats(true)
        }
    }
    
    setScene()
    {
        this.scene = new THREE.Scene()


    }

    setScene2()
    {
        this.scene2 = new THREE.Scene()
        const color = 0x0000FF;
        
        const near = 10;
        const far = 5000;
        //this.scene2.fog = new THREE.Fog(color, near, far)

    }

   
    setCamera()
    {
        this.camera = new Camera()
       
    }

    setRenderer()
    {
        this.renderer = new Renderer({ rendererInstance: this.rendererInstance })

        this.targetElement.appendChild(this.renderer.instance.domElement)
    }

    setResources()
    {
        this.resources = new Resources(assets)
       
    }

    setWorld()
    {
        this.world = new World()
        
    }

    setSceneWorld(){

        this.sceneworld = new SceneWorld()
    }

    setMouse(){

        this.mouse = new Mouse()
        
       

    }
   
      update()
    {
       
      

        if(this.stats)
            this.stats.update() 

            

        if(this.camera)
            this.camera.update()

            //if (this.video) this.video.update();  
            

       /*  if(this.controls)
        this.controls.update() */
       
         if(this.world)
            this.world.update() 

        if(this.sceneworld)
            this.sceneworld.update()

        if(this.renderer)
            this.renderer.update()

       if(this.mouse)
       this.mouse.update() 

       
        window.requestAnimationFrame(() =>
        {
            this.update()
           
        })
    }

    resize()
    {
        // Config
        const boundings = this.targetElement.getBoundingClientRect()
        this.config.width = boundings.width
        this.config.height = boundings.height

        

        this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

        if(this.camera)
            this.camera.resize()

        if(this.renderer)
            this.renderer.resize()

        if(this.world)
            this.world.resize()

    }

    destroy()
    {
        
    }
}
