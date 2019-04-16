// it will not work with E6 bcz libraries i use made on E4,E5

// a letiale where all your ligjts and scenes will go
var scene = new THREE.Scene();

// we can use different cameras like cube etc but we will use perspective camera for real world looks to eye
// it requires 4 paramters/properties 
// =>>>> field of view, aspect ratio, near plane, far plane
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)

// also we need to add camera position on Z-axis
camera.position.z = 5;

// we need render , there are many we can use such as webgel, css 2d m css 3d etc
var renderer = new THREE.WebGLRenderer({antialias: true});

// we will also add background color to our renderer
renderer.setClearColor("#e5e5e5");
// also we need to size the renderer
renderer.setSize(window.innerWidth,window.innerHeight);

// aboive we have actually created our canvas element
// now we need to append it into the DOM
document.body.appendChild(renderer.domElement);

// now we making our scene responsive by default its not responsive
// we set the size before right now we just need to make it change everytime the screen resizes
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);

// also we need to change the camera aspect ratio according to the screen size so we change it again
// its same code as before in the perspective function but here it will be adjusted everytime screen size changes
    camera.aspect = window.innerWidth / window.innerHeight;

    // we need to adjust the or update the matrix thats is created by three.js in our scene, everytime an adjustment is made
    camera.updateProjectionMatrix();
})

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// now we will add threejs predefined shapes
// when it comes to shape rememner that every shape has [geometry and material]
// for geometrt we need parameters [radius,width,height]
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({color: 0xF7F7F7});

// now wee need to combine our geometry and material to the mesh
var mesh = new THREE.Mesh(geometry, material);

// to move the scene our canvas we cereated, x.y.z axis
/* mesh.position.set(2,2,-2);
    mesh.rotation.set(2,2,-2);
    mesh.scale.set(2,2,-2);
*/

// adding canvas to the scene
scene.add(mesh);

meshX = -10;

// animation
for(var i = 0; i<15;i++) {
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 10;
    mesh.position.y = (Math.random() - 0.5) * 10;
    mesh.position.z = (Math.random() - 0.5) * 10;
    scene.add(mesh);
    meshX+=1;
}

// to see our shape with colors we set we need to add light
// paramters [color, intensity, distance,decay]
// to add diffetent color just add hexa code after 0x
var light = new THREE.PointLight(0xFFFFFF, 1, 1000)
light.position.set(0,0,0);
scene.add(light);

var light = new THREE.PointLight(0xFFFFFF, 2, 1000)
light.position.set(0,0,25);
scene.add(light);

var render = function() {
// if u resize the canvas will distort, to overcome we call the following function from THREEjs
// it wall call a loop that will create the scene everytime the screen is refreshed, on typical screen it means 60 times per sec or 60fps
    requestAnimationFrame(render);

// to apply our scene we created and camera , we have to call render method on our renderer
    renderer.render(scene, camera);
}

// animation on mouse move
//  to animate the canvas we use GSAP timeline library
// just add {paused:true,} in TimelineMAx function paramter to stop the animation
function onMouseMove(event) {
    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);
    for (var i = 0; i < intersects.length; i++) {
        this.tl = new TimelineMax();
        this.tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut})
        this.tl.to(intersects[i].object.scale, .5, {x: .5, ease: Expo.easeOut})
        this.tl.to(intersects[i].object.position, .5, {x: 2, ease: Expo.easeOut})
        this.tl.to(intersects[i].object.rotation, .5, {y: Math.PI*.5, ease: Expo.easeOut}, "=-1.5")
    }
}



window.addEventListener('mousemove', onMouseMove);
render();