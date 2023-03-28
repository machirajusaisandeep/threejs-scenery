import * as dat from 'lil-gui'
import * as THREE from 'three'
import { createStone } from './naturalBodies'
import { createBush } from './tree'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')


const bricksColorTexture = textureLoader.load('./textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('./textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('./textures/bricks/normal.jpg')
const bricksHeightTexture = textureLoader.load('./textures/bricks/height.png')
const bricksRoughnessTexture = textureLoader.load('./textures/bricks/roughness.jpg')

const roofColorTexture = textureLoader.load('./textures/roof/color.jpg')
const roofAmbientOcclusionTexture = textureLoader.load('./textures/roof/ambientOcclusion.jpg')
const roofNormalTexture = textureLoader.load('./textures/roof/normal.jpg')
const roofHeightTexture = textureLoader.load('./textures/roof/height.png')
const roofRoughnessTexture = textureLoader.load('./textures/roof/roughness.jpg')

/**
 * House
 */


export const createHouse=()=>{
const house =new THREE.Group()

//walls 
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        transparent: true,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture,
        displacementMap: bricksHeightTexture,
        displacementScale: 0.1,
    })
)
walls.castShadow = true
walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2))
walls.position.y=2.5/2
house.add(walls)

//roof

const roof=new THREE.Mesh(
    new THREE.ConeGeometry(3.5,1,4),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        transparent: true,
        aoMap: roofAmbientOcclusionTexture,
        normalMap: roofNormalTexture,
        roughnessMap: roofRoughnessTexture,
        displacementMap: roofHeightTexture,
        displacementScale: 0.1,
    })
)
roof.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(roof.geometry.attributes.uv.array, 2))
roof.position.y=3
roof.rotation.y=Math.PI*1/4
house.add(roof)

//door

const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
)
door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2))

door.position.y=1;
door.position.z=2+0.01

house.add(door)

return house
}




