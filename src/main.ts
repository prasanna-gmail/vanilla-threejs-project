import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
console.log("pkp:  ~ file: main.ts:5 ~ OrbitControls:", OrbitControls)
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


import { getProject, types } from '@theatre/core'
import studio from '@theatre/studio'
import projectState from './state.json'

studio.initialize()

// const project = getProject('EYE')
const project = getProject('EYE', { state: projectState })

console.log("pkp:  ~ file: main.ts:12 ~ project:", project)

project.ready.then(() => sheet.sequence.play({ iterationCount: Infinity }))

const sheet = project.sheet('Animated scene')


/**
 * Camera
 */

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 10, 200,)
camera.position.z = 50




/**
 * Scene
 */

const scene = new THREE.Scene()


let mesh: THREE.Mesh

/**
 * 
 * @param callee 
 * Create mesh
 */
function createMesh(callee: string) {
  console.log("pkp:  ~ file: main.ts:36 ~ createMesh ~ callee:", callee)

  /*
 * TorusKnot
 */
  const geometry = new THREE.TorusKnotGeometry(10, 3, 300, 16)
  const material = new THREE.MeshStandardMaterial({ color: '#f00' })
  material.color = new THREE.Color('#049ef4')
  material.roughness = 0.5

  mesh = new THREE.Mesh(geometry, material)
  mesh.castShadow = true
  mesh.receiveShadow = true
  scene.add(mesh)
}
/**
 * 
 * @param callee 
 * Theatre ones
 */
function updateVariables(callee: string) {
  console.log("pkp:  ~ file: main.ts:53 ~ updateVariables ~ callee:", callee)

  /**
 * BO Theatre
 */
  // Create a Theatre.js object with the props you want to
  // animate
  const torusKnotObj = sheet.object('Torus Knot', {
    // Note that the rotation is in radians
    // (full rotation: 2 * Math.PI)
    rotation: types.compound({
      x: types.number(mesh.rotation.x, { range: [-2, 2] }),
      y: types.number(mesh.rotation.y, { range: [-2, 2] }),
      z: types.number(mesh.rotation.z, { range: [-2, 2] }),
    }),
  })

  torusKnotObj.onValuesChange((values) => {
    const { x, y, z } = values.rotation
    mesh.rotation.set(x * Math.PI, y * Math.PI, z * Math.PI)
  })

  /**
   * EO Theatre
   */
}
createMesh("init 1")

updateVariables("init 11")


/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({ antialias: true })

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.render(scene, camera)

document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 20, 100);
controls.update();


/**
 * Update the screen
 */
function tick(eee: any): void {
  // console.log("pkp:  ~ file: main.ts:138 ~ tick ~ eee:", eee)
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

/**
 * Handle `resize` events
 */
window.addEventListener(
  'resize',
  function () {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  },
  false,
)


const loader = new GLTFLoader();
let objj = null
// Load a glTF resource
loader.load(
  // resource URL
  // 'models/gltf/duck/duck.gltf',
  'models/eye.glb',
  // 'models/glTF/DamagedHelmet.gltf',
  // 'models/BoomBox.glb',
  // 'models/environment.glb',
  // called when the resource is loaded
  function (gltf: any) {

    objj = gltf.scene
    scene.add(gltf.scene);

    gltf.animations; // Array<THREE.AnimationClip>
    gltf.scene; // THREE.Group
    gltf.scenes; // Array<THREE.Group>
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object
    console.log("pkp:  ~ file: main.ts:193 ~ gltf.animations:", gltf.scenes)


  },
  // called while loading is progressing
  function (xhr: any) {
    // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  // called when loading has errors
  function (error: any) {
    console.log("pkp:  ~ file: main.ts:183 ~ error:", error)
  }
);


tick("init")
/*
 * Lights
 */

// Ambient Light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Point light
const directionalLight = new THREE.DirectionalLight('#ff0000', 30 /* , 0, 1 */)
directionalLight.position.y = 20
directionalLight.position.z = 20

directionalLight.castShadow = true

directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048
directionalLight.shadow.camera.far = 50
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.top = 20
directionalLight.shadow.camera.right = 20
directionalLight.shadow.camera.bottom = -20
directionalLight.shadow.camera.left = -20

scene.add(directionalLight)

// RectAreaLight
const rectAreaLight = new THREE.RectAreaLight('#ff0', 1, 50, 50)

rectAreaLight.position.z = 10
rectAreaLight.position.y = -40
rectAreaLight.position.x = -20
rectAreaLight.lookAt(new THREE.Vector3(0, 0, 0))

scene.add(rectAreaLight)