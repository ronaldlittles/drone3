
        import * as THREE from "three";
        import Experience from "./Experience.js";
        import EventEmitter from "./Utils/EventEmitter.js";
        import CANNON from 'cannon';
        import { TextureLoader } from 'three';
        import {ParametricGeometry} from 'three/examples/jsm/geometries/ParametricGeometry.js';
        import { ParametricGeometries } from 'three/examples/jsm/geometries/ParametricGeometries.js'; 

        export default class TShirt extends EventEmitter {
            constructor() {
          
              super();
          
              this.experience = new Experience();
              this.resources = this.experience.resources;
          
              this.time = this.experience.time;
              this.debug = this.experience.debug;
              this.camera = this.experience.camera;
              this.controls = this.experience.controls;
              this.scene2 = this.experience.scene2;
              this.world1 = this.experience.world;

              this.setTShirt()

            }

            setTShirt(){

              var dt = 1/60, R = 0.2;

              var clothMass = 1;  // 1 kg in total
              var clothSize = 1; // 1 meter
              var Nx = 12;
              var Ny = 12;
              var mass = clothMass / Nx*Ny;
  
              var restDistance = clothSize/Nx;
  
              var ballSize = .1;

              let third = new THREE.Vector3()
  
              var clothFunction = plane(restDistance * Nx, restDistance * Ny, third);
  
              function plane(width, height, third) {
                  return function(u, v) {
                      var x = (u-0.5) * width;
                      var y = (v+0.5) * height;
                      var z = third;
                      return new THREE.Vector3(x, y, z);
                  };
              }
  
              //if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
  
              var container, stats;
              var camera, scene, renderer;
  
              var clothGeometry;
              var sphereMesh, sphereBody;
              var object;
              var particles = [];
              var world;
  
              initCannon();
              init();
              animate();
  
              function initCannon(){
                  world = new CANNON.World();
                  world.broadphase = new CANNON.NaiveBroadphase();
                  world.gravity.set(0,-9.82,0);
                  world.solver.iterations = 20;
  
                  // Materials
                  var clothMaterial = new CANNON.Material();
                  var sphereMaterial = new CANNON.Material();
                  var clothSphereContactMaterial = new CANNON.ContactMaterial(  clothMaterial,
                                                                                sphereMaterial,
                                                                                0.0, // friction coefficient
                                                                                0.0  // restitution
                                                                                );
                  // Adjust constraint equation parameters for ground/ground contact
                  clothSphereContactMaterial.contactEquationStiffness = 1e9;
                  clothSphereContactMaterial.contactEquationRelaxation = 3;
  
                  // Add contact material to the world
                  world.addContactMaterial(clothSphereContactMaterial);
  
                  // Create sphere
                  var sphereShape = new CANNON.Sphere(ballSize*1.3);
                  sphereBody = new CANNON.Body({
                      mass: 0
                  });
                  sphereBody.addShape(sphereShape);
                  sphereBody.position.set(0,0,0);
                  world.addBody(sphereBody);
  
                  // Create cannon particles
                  for ( var i = 0, il = Nx+1; i !== il; i++ ) {
                      particles.push([]);
                      for ( var j = 0, jl = Ny+1; j !== jl; j++ ) {
                          var idx = j*(Nx+1) + i;
                          var p = clothFunction(i/(Nx+1), j/(Ny+1));
                          var particle = new CANNON.Body({
                              mass: j==Ny ? 0 : mass
                          });
                          particle.addShape(new CANNON.Particle());
                          particle.linearDamping = 0.5;
                          particle.position.set(
                              p.x,
                              p.y-Ny * 0.9 * restDistance,
                              p.z
                          );
                          particles[i].push(particle);
                          world.addBody(particle);
                          particle.velocity.set(0,0,-0.1*(Ny-j));
                      }
                  }
                  function connect(i1,j1,i2,j2){
                      world.addConstraint( new CANNON.DistanceConstraint(particles[i1][j1],particles[i2][j2],restDistance) );
                  }
                  for(var i=0; i<Nx+1; i++){
                      for(var j=0; j<Ny+1; j++){
                          if(i<Nx) connect(i,j,i+1,j);
                          if(j<Ny) connect(i,j,i,j+1);
                      }
                  }
              }
  
              function init() {
  
                  container = document.createElement( 'div' );
                  document.body.appendChild( container );
  
                  // scene
  
                  scene= new THREE.Scene();
  
                  scene.fog = new THREE.Fog( 0x000000, 500, 10000 );
                  //scene.background = '0xffffff'
                  // camera
  
                  camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.5, 10000 );
  
                  camera.position.set(Math.cos( Math.PI/4 ) * 3,
                                      0,
                                      Math.sin( Math.PI/4 ) * 3);
  
                  scene.add( camera );
  
  
                  /* // Controls
                  controls = new THREE.TrackballControls( camera );
  
                  controls.rotateSpeed = 1.0;
                  controls.zoomSpeed = 1.2;
                  controls.panSpeed = 0.8;
  
                  controls.noZoom = false;
                  controls.noPan = false;
  
                  controls.staticMoving = true;
                  controls.dynamicDampingFactor = 0.3;
  
                  controls.keys = [ 65, 83, 68 ]; */
  
  
                  // lights
                  var light, materials;
                  scene.add( new THREE.AmbientLight( 0x666666 ) );
  
                  light = new THREE.DirectionalLight( 0xffffff, 1.75 );
                  var d = 5;
  
                  light.position.set( d, d, d );
  
                  light.castShadow = true;
                  //light.shadowCameraVisible = true;
  
                  light.shadowMapWidth = 1024*2;
                  light.shadowMapHeight = 1024*2;
  
                  light.shadowCameraLeft = -d;
                  light.shadowCameraRight = d;
                  light.shadowCameraTop = d;
                  light.shadowCameraBottom = -d;
  
                  light.shadowCameraFar = 3*d;
                  light.shadowCameraNear = d;
                  light.shadowDarkness = 0.5;
  
                  scene.add( light );
  
                  /*
                  light = new THREE.DirectionalLight( 0xffffff, 0.35 );
                  light.position.set( 0, -1, 0 );
  
                  scene.add( light );
                  */
  
                  // cloth material
  
                  var clothTexture = new TextureLoader().load( './tshirtnobackground.png' ); // circuit_pattern.png
                  clothTexture.wrapS = clothTexture.wrapT = THREE.RepeatWrapping;
                  clothTexture.anisotropy = 16;
  
                  //const videoTexture = new THREE.VideoTexture(video)
  
                 // const clothMaterial2 = new THREE.MeshLambertMaterial({map: videoTexture})
  
                  var clothMaterial = new THREE.MeshPhongMaterial( {
                      map: clothTexture,
                      alphaTest: 0.5,
                      ambient: 0x000000,
                      color: 0xffffff,
                      specular: 0x333333,
                      emissive: 0x222222,
                      //shininess: 5,
                      side: THREE.DoubleSide
                  } );
  
                  // cloth geometry
                  clothGeometry = new ParametricGeometry( clothFunction, Nx, Ny, true );
                  clothGeometry.dynamic = true;
                  clothGeometry.computeFaceNormals();
  
                  // cloth mesh
                  object = new THREE.Mesh(clothGeometry, clothMaterial);
                  object.position.set(0, 0, 0);
                  object.castShadow = true;
                  //object.receiveShadow = true;
                  this.scene2.add( object );
                 
                  // sphere
                  var ballGeo = new THREE.SphereGeometry( ballSize, 20, 20 );
                  var ballMaterial = new THREE.MeshPhongMaterial( { color: '#FFFFFFFF', opacity: 0, transparent: true } );
  
                  sphereMesh = new THREE.Mesh( ballGeo, ballMaterial );
                  sphereMesh.castShadow = true;
                  //sphereMesh.receiveShadow = true;
                  this.scene2.add( sphereMesh );
                 
  
  /* 
                  renderer = new THREE.WebGLRenderer( { antialias: true } );
                  renderer.setSize( window.innerWidth, window.innerHeight );
                  renderer.setClearColor( scene.fog.color );
  
                  container.appendChild( renderer.domElement );
  
                  renderer.gammaInput = true;
                  renderer.gammaOutput = true;
                  renderer.physicallyBasedShading = true;
  
                  renderer.shadowMapEnabled = true;
  
                  window.addEventListener( 'resize', onWindowResize, false ); */
  
                  camera.lookAt( sphereMesh.position );
              }
  
              //
  
              function onWindowResize() {
  
                  camera.aspect = window.innerWidth / window.innerHeight;
                  camera.updateProjectionMatrix();
                  controls.handleResize();
  
                  renderer.setSize( window.innerWidth, window.innerHeight );
  
              }
  
              function animate() {
                  requestAnimationFrame( animate );
                  controls.update();
                  world.step(dt);
                  var t = world.time;
                  sphereBody.position.set(R * Math.sin(t), 0, R * Math.cos(t));
                  render();
              }
  
              function render() {
  
                  for ( var i = 0, il = Nx+1; i !== il; i++ ) {
                      for ( var j = 0, jl = Ny+1; j !== jl; j++ ) {
                          var idx = j*(Nx+1) + i;
                          clothGeometry.vertices[idx].copy(particles[i][j].position);
                      }
                  }
  
                  clothGeometry.computeFaceNormals();
                  clothGeometry.computeVertexNormals();
  
                  clothGeometry.normalsNeedUpdate = true;
                  clothGeometry.verticesNeedUpdate = true;
  
                  sphereMesh.position.copy(sphereBody.position);
  
                  renderer.render( scene, camera );
  
              }
            }

            update(){

            }

        }