import * as dat from 'lil-gui'
import * as THREE from 'three'

const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const textureLoader = new THREE.TextureLoader()
const treeColorTexture = textureLoader.load('./textures/tree/color.jpg')
const treeAmbientOcclusionTexture = textureLoader.load('./textures/tree/ambientOcclusion.jpg')
const treeNormalTexture = textureLoader.load('./textures/tree/normal.jpg')
const treeHeightTexture = textureLoader.load('./textures/tree/height.png')
const treeRoughnessTexture = textureLoader.load('./textures/tree/roughness.jpg')


export const createBush=()=>{
    return new THREE.Mesh(bushGeometry, bushMaterial)
}

export const createTree=()=>{
    const tree=new THREE.Group()
    const treeHead=new THREE.Mesh(bushGeometry, bushMaterial)
    treeHead.position.y=2;

    const treeBody=new THREE.Mesh(
        new THREE.CylinderGeometry(0.1,0.25,2,16),
        new THREE.MeshStandardMaterial({
            map: treeColorTexture,
            transparent: true,
            aoMap: treeAmbientOcclusionTexture,
            normalMap: treeNormalTexture,
            roughnessMap: treeRoughnessTexture,
            displacementMap: treeHeightTexture,
            displacementScale: 0.1,
        })
    )
    treeBody.castShadow = true
    treeBody.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(treeBody.geometry.attributes.uv.array, 2))
    treeBody.position.y=1+0.01;
    tree.add(treeHead,treeBody)
    return tree
}

export const createForest=()=>{
    const forest=new THREE.Group()
    for(let i=0;i<8;i++){
        const tree=createTree()
        tree.position.x=(Math.random()-0.2)*15
        tree.position.z=(Math.random()-0.2)*14
        forest.add(tree)
    }
    return forest
}

export const createChristmasTree=()=>{
    
}