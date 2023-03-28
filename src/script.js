import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { PlaneGeometry } from 'three'
import { createHouse } from './items/house'
import { createForest, createTree } from './items/tree'
import { skyColor } from './items/sky'
import { createHills, createStones, createSun } from './items/naturalBodies'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()
gui.hide()

// Canvas
const canvas = document.querySelector('canvas.webgl')

//Fog
const fogColor="#CFD4D3"
const fog=new THREE.Fog(fogColor,10,40)

// Scene
const scene = new THREE.Scene()
scene.fog=fog

const textureLoader = new THREE.TextureLoader()
const floorColorTexture = textureLoader.load('/textures/floor/color.jpg')
const floorAmbientOcclusionTexture = textureLoader.load('/textures/floor/ambientOcclusion.jpg')
const floorNormalTexture = textureLoader.load('/textures/floor/normal.jpg')
const floorRoughnessTexture = textureLoader.load('/textures/floor/roughness.jpg')

//sun
const sun=createSun()
sun.position.z=-13
sun.position.y=5.084
sun.position.x=1.15
scene.add(sun)

//hill
const hillGroup=createHills()
hillGroup.position.z=-10
hillGroup.position.y=6
hillGroup.position.x=-7
scene.add(hillGroup)

//forest
const forest=createForest()
forest.position.x=-2
forest.position.z=10
forest.rotation.y=10

const forestControl=gui.addFolder('forest Group')
forestControl.add(forest.position, 'x').min(- 10).max(10).step(0.001)
forestControl.add(forest.position, 'y').min(- 10).max(10).step(0.001)
forestControl.add(forest.position, 'z').min(- 10).max(10).step(0.001)
scene.add(forest)

//stones
const stones=createStones()
scene.add(stones)

//house
const house1=createHouse()
const house2=createHouse()
house2.position.x=6.5

const houseGroup=new THREE.Group()
houseGroup.add(house1,house2)
houseGroup.position.x=4;
houseGroup.position.z=12;

const houseGroupControl=gui.addFolder('House Group')
houseGroupControl.add(houseGroup.position, 'x').min(- 10).max(10).step(0.001)
houseGroupControl.add(houseGroup.position, 'y').min(- 10).max(10).step(0.001)
houseGroupControl.add(houseGroup.position, 'z').min(- 10).max(10).step(0.001)

scene.add(houseGroup)


// Floor
floorColorTexture.repeat.set(8, 8)
floorAmbientOcclusionTexture.repeat.set(8, 8)
floorNormalTexture.repeat.set(8, 8)
floorRoughnessTexture.repeat.set(8, 8)

floorColorTexture.wrapS = THREE.RepeatWrapping
floorAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorRoughnessTexture.wrapS = THREE.RepeatWrapping

floorColorTexture.wrapT = THREE.RepeatWrapping
floorAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorRoughnessTexture.wrapT = THREE.RepeatWrapping

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.MeshStandardMaterial({
        map: floorColorTexture,
        aoMap: floorAmbientOcclusionTexture,
        normalMap: floorNormalTexture,
        roughnessMap: floorRoughnessTexture
    })
)
floor.receiveShadow = true
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))

floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#FFE87C', 0.5)
gui.addFolder('Ambient Light').add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)


// Directional light
const sunLight = new THREE.DirectionalLight('#b9d5ff', 0.7)
sunLight.position.set(-3.5, 5, 2)
scene.add(sunLight)

const pseudoSunLight = new THREE.DirectionalLight('#b9d5ff', 0.7)
pseudoSunLight.position.set(-5, 6, 2.3)
scene.add(pseudoSunLight)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 8
camera.position.z =25

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(skyColor)

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()