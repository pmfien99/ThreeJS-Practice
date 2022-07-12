//RENDERER SETUP
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.querySelector('.webGLContainer')
    .appendChild(renderer.domElement)

//SCENE SETUP
const scene = new THREE.Scene()

//CAMERA 
const camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 50)
camera.lookAt(0, 0, 0)

let myCube; 
const cubeGroup = new THREE.Group(); 

const modelLoader = new THREE.GLTFLoader;
modelLoader.load('./assets/sqrRing.glb', (glb) => {

    glb.scene.traverse(child => {
        if (child instanceof THREE.Mesh) {
            myCube = child; 
            myCube.material = new THREE.MeshNormalMaterial();
        }
    })

    for (let i = 0; i < 20; i++) {
        const copyCube = myCube.clone();
        copyCube.scale.set(i, i, i);
        cubeGroup.add(copyCube);
    }

    scene.add(cubeGroup);

});


//RENDER LOOP
function update() {

    let i = 0;
    while (i < cubeGroup.children.length) {
        cubeGroup.children[i].rotation.x += 0.01 + i*0.00001;
        cubeGroup.children[i].rotation.y += 0.01 + i*0.000001;
        i++
    }


    renderer.render(scene, camera);
    requestAnimationFrame(update)
}

update()