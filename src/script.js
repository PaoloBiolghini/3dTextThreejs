import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'


/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load('fonts/helvetiker_regular.typeface.json', (font) => {
    console.log("font loaded")
    const textGeometry=new TextGeometry(
        "Paolo Ciao",
        {
            font,
            size:0.5,
            height:0.2,
            curveSegments:8,
            bevelEnabled:true,
            bevelThickness:0.03,
            bevelSize:0.02,
            bevelOffset:0,
            bevelSegments:5
        }
    )
    
    //compute the border of the text
    textGeometry.computeBoundingBox()
     textGeometry.center()
    // textGeometry.translate(
    //     -(textGeometryboundingBox.max.x-0.02)*0.5,
    //     -(textGeometryboundingBox.max.y-0.02)*0.5,
    //     -(textGeometryboundingBox.max.z-0.03)*0.5,
    // )

    
    textGeometry.computeBoundingBox()
    console.log(textGeometry.boundingBox)
    const matcaptTexture=textureLoader.load('textures/matcaps/4.png')
    
    const textMaterial=new THREE.MeshNormalMaterial()
    
    const text=new THREE.Mesh(textGeometry,textMaterial)
    scene.add(text)

    console.time('donuts')
    const donutGeometry=new THREE.TorusGeometry(0.1,0.05,20,45)
    const donutMaterial=new THREE.MeshNormalMaterial()
    for(let i=0;i<1000;i++){
        
        const donut=new THREE.Mesh(donutGeometry,donutMaterial)
        scene.add(donut)

        donut.position.x=(Math.random()-0.5)*10
        donut.position.y=(Math.random()-0.5)*10
        donut.position.z=(Math.random()-0.5)*10

        donut.rotation.x=Math.random()*Math.PI
        donut.rotation.y=Math.random()*Math.PI
    }

    console.timeEnd('donuts')
})



/**
 * Object
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)


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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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