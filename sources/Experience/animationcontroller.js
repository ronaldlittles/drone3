import * as THREE from "three";
import Experience from "./Experience.js";

export default class AnimationController {

    constructor (material) {

        this.material = material

        this.isPlaying = false


    
        this.experience = new Experience();
        this.config = this.experience.config;
        this.debug = this.experience.debug;
        this.world = this.experience.world;
        this.scene = this.experience.scene;
        this.scene2 = this.experience.scene2;
        this.camera = this.experience.camera;


    }




    play(){

        this.isPlaying = true;
        

    }

    stop(){

        this.isPlaying = false;
    }


    update(){



    }










}