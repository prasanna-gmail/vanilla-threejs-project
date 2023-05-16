import './style.css'
import * as THREE from 'three'
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
console.log("pkp:  ~ file: main.ts:5 ~ GLTFLoader:", GLTFLoader)

/**
 * Camera
 */

const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    10,
    200,
)

camera.position.z = 50

/**
 * Scene
 */

const scene = new THREE.Scene()

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

/**
 * Update the screen
 */
function tick(eee: any): void {
    console.log("pkp:  ~ file: main.ts:138 ~ tick ~ eee:", eee)
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()


const loader = new GLTFLoader();

// Load a glTF resource
loader.load(
    // resource URL
    // 'models/gltf/duck/duck.gltf',
    'models/eye.glb',
    // called when the resource is loaded
    function (gltf) {

        scene.add(gltf.scene);

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

    },
    // called while loading is progressing
    function (xhr) {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    // called when loading has errors
    function (error) {

        console.log('An error happened');

    }
);