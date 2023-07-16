import * as THREE from "three";
import Experience from "./Experience.js";
import SceneWorld from "./sceneworld.js";
import Box from "./box.js";

import Font from './font.js'


import Car from "./car.js";
import Streetlamp from "./streetlamp.js";
import Controls from "./Controls.js";
import Floor from "./floor.js";
import Particles from './particles.js'
import FloorParticles from "./floorParticles.js";
import { RollerCoasterGeometry } from "three/examples/jsm/misc/RollerCoaster.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import Video from "./video.js";
import Menu from "./menu.js";
import Raycaster from "./raycaster.js";
import Drawing from './drawing.js';
//import TShirt from './tshirt.js'
//import RaceTrack from './raceTrack.js'
export default class World {
  constructor(_options) {
    this.experience = new Experience();
    this.config = this.experience.config;
    this.scene = this.experience.scene;
    this.scene2 = this.experience.scene2;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.controls = this.experience.controls;
    this.mouse = this.experience.mouse;

    //this.resource = this.resources.items.lennaTexture

    this.resources.on("_groupEnd", (_group) => {
      if (_group.name === "base") {
        //this.setRaceTrack()
        this.setRaycaster();
        //this.setSceneWorld();
        this.setBox();
        //this.setDrawing();
        this.setCar();
        this.setMenu();
        //this.setFloor()
        //this.setParticles()
        //this.setTShirt()
        //this.setFont();
        //this.setRoom()
        this.setLamp();
        //this.setVideo();
      }
    });
  }

  /*  setRaceTrack(){

    this.racetrack = new RaceTrack()

    console.log(this.racetrack)

  } */

  setRaycaster() {

    this.raycaster = new Raycaster();

  }

  setDrawing(){

    this.setdrawing = new Drawing();

  }

  setTShirt() {
    this.tshirt = new TShirt();
  }

   setVideo() {
    this.video = new Video();
  } 

  setRoom() {
    this.room = new RoomEnvironment();
    this.scene2.add(this.room);
    this.room.scale.setScalar(100);
    this.room.position.set(0, -100, 0);
  }

  setControls() {
    this.controls = new Controls();
  }

  setFloorParticles() {
    this.floorparticles = new FloorParticles();
  }

  setParticles() {
    this.particles = new Particles();
    console.log(Particles.prototype);
  }

  setFloor() {
    this.floor = new Floor();
  }

  setBag() {
    this.bag = new Bag();
  }

  setSceneWorld() {
    this.sceneworld = new SceneWorld();
  }

  setCar() {
    this.car = new Car();
  }

  setBox() {
    this.box = new Box();
  }

  setFont() {
    this.font = new Font();
  }

  setLamp() {
    this.picframe = new Streetlamp();
  }

  setMenu() {
    this.menu = new Menu();
  }

  resize() {}

  update() {
    //if(this.floorparticles)
    //this.floorparticles.update()

    //if(this.racetrack)
    //this.racetrack.update()

    //if(this.tshirt)
    //this.tshirt.update()

    if (this.raycaster) this.raycaster.update();

    if (this.setdrawing) this.setdrawing.update();

    //if (this.video) this.video.update();

    if (this.particles) this.particles.update();

    //if (this.font) this.font.update();

    if (this.floor) this.floor.update();

    if (this.box) this.box.update();

    if (this.car) this.car.update();

    if (this.sceneworld) this.sceneworld.update();

    if (this.picframe) this.picframe.update();

    if (this.menu) this.menu.update();
  }

  destroy() {}
}
