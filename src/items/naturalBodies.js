import * as dat from 'lil-gui'
import * as THREE from 'three'

const textureLoader = new THREE.TextureLoader()
const hillsColorTexture = textureLoader.load('./textures/hills/color.jpg')
const hillsAmbientOcclusionTexture = textureLoader.load('./textures/hills/ambientOcclusion.jpg')
const hillsNormalTexture = textureLoader.load('./textures/hills/normal.jpg')
const hillsRoughnessTexture = textureLoader.load('./textures/hills/roughness.jpg')

hillsColorTexture.wrapS = THREE.RepeatWrapping
hillsAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
hillsNormalTexture.wrapS = THREE.RepeatWrapping
hillsRoughnessTexture.wrapS = THREE.RepeatWrapping

hillsColorTexture.wrapT = THREE.RepeatWrapping
hillsAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
hillsNormalTexture.wrapT = THREE.RepeatWrapping
hillsRoughnessTexture.wrapT = THREE.RepeatWrapping

export const createHills=()=>{
    const hillGeometry=new THREE.ConeGeometry(10,12,16)

    const sunLight = new THREE.PointLight('#FBD31A', 3, 7)
sunLight.castShadow = true
sunLight.shadow.mapSize.width = 256
sunLight.shadow.mapSize.height = 256
sunLight.shadow.camera.far = 7

sunLight.position.set(7.5,-0.07,5)





    const hillMaterial= new THREE.MeshStandardMaterial({
        map: hillsColorTexture,
        aoMap: hillsAmbientOcclusionTexture,
        normalMap: hillsNormalTexture,
        roughnessMap: hillsRoughnessTexture
    })

    
    
    const hill1=new THREE.Mesh(
       hillGeometry,hillMaterial
    )
    const hill2=new THREE.Mesh(
        hillGeometry,hillMaterial
    )
    hill2.position.x=16
    const hillGroup=new THREE.Group()
    hillGroup.add(hill1,sunLight,hill2)
    hill1.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(hill1.geometry.attributes.uv.array, 2))
    hill2.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(hill2.geometry.attributes.uv.array, 2))
    return hillGroup
}

export const createStone=()=>{
    const stoneGeometry=new THREE.DodecahedronGeometry(0.45,0)
const stoneMaterial=new THREE.MeshStandardMaterial({
    color:"#7C969D"
})
const stone=new THREE.Mesh(stoneGeometry,stoneMaterial)
return stone
}

export const createStones=()=>{
const stones = new THREE.Group()

for(let i=0;i <50;i++){
const angle = Math.random() * Math.PI*2;
const radius=5+Math.random()*5;
const x=Math.sin(angle)*radius
const z=Math.cos(angle+0.5)*radius

const stone=createStone()
stone.position.set(x,0.3,z)
stone.rotation.z=(Math.random()-0.5)*0.4
stone.rotation.y=(Math.random()-0.5)*0.4


stones.add(stone)

}

return stones
}

export const createSun=()=>{
    
    const sunGeometry=new THREE.SphereGeometry(4)
    const sunMaterial=new THREE.MeshStandardMaterial({
        color:"#FCE06D"
    })
    const sun=new THREE.Mesh(sunGeometry,sunMaterial)
    const sunGroup=new THREE.Group()
    sunGroup.add(sun)
    
    const sunArrowGeometry=new THREE.ConeGeometry(2,12,16)
    const sunArrow1=new THREE.Mesh(sunArrowGeometry,sunMaterial)
    const sunArrow2=new THREE.Mesh(sunArrowGeometry,sunMaterial)
    sunArrow2.position.x=-2
    sunArrow2.position.y=-1
    sunArrow2.rotation.z=0.4

    const sunArrow3=new THREE.Mesh(sunArrowGeometry,sunMaterial)
    sunArrow3.position.x=-0.25
    sunArrow3.position.y=-0.5
    sunArrow3.rotation.z=0.4
    
    const sunArrow4=new THREE.Mesh(sunArrowGeometry,sunMaterial)
    sunArrow4.position.x=0.75
    sunArrow4.position.y=0
    sunArrow4.rotation.z=-0.3

    const sunArrow5=new THREE.Mesh(sunArrowGeometry,sunMaterial)
    sunArrow5.position.x=1.25
    sunArrow5.position.y=0
    sunArrow5.rotation.z=-0.5

    const sunArrow6=new THREE.Mesh(sunArrowGeometry,sunMaterial)
    sunArrow6.position.x=1.5
    sunArrow6.position.y=0
    sunArrow6.rotation.z=-0.7

    const sunArrow7=new THREE.Mesh(sunArrowGeometry,sunMaterial)
    sunArrow7.position.x=-0.75
    sunArrow7.position.y=-0.5
    sunArrow7.rotation.z=0.5


    sunGroup.add(sunArrow1,sunArrow2,sunArrow3,sunArrow4,sunArrow5,sunArrow6,sunArrow7)

    return sunGroup
}