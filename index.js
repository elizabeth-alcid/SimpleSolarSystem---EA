import * as THREE from "three";
// OrbitControls module enables user to use mouse to move around the scene (rotate, zoom, pan)
import { OrbitControls } from "jsm/controls/OrbitControls.js";
// Custom function that generates a starfield - *see getStarfield.js
import getStarfield from "./getStarfield.js";

// 1. -----INITIAL SCENE SETUP----- //

// Width/Height of browser window
const width = window.innerWidth;
const height = window.innerHeight;

// Set up renderer - "antialias: true" gives smoother edges
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(width, height);

// Append to HTML doc - displays the 3D content in the browser
document.body.appendChild(renderer.domElement);

// Set up camera
const fov = 75;
const aspect = width / height;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 50;

// Create 3D scene
const scene = new THREE.Scene();

// Mouse controls
const controls = new OrbitControls(camera, renderer.domElement);


// 2. -----STARS/PLANETS SETUP----- //

// Create Sun
const sun_loader = new THREE.TextureLoader();
const sun_geo = new THREE.SphereGeometry(4.3, 32, 16); 
const sun_mat = new THREE.MeshStandardMaterial( { map: sun_loader.load("Textures/sunmap.jpg") });
const sun = new THREE.Mesh(sun_geo, sun_mat);
// Add Sun to scene
scene.add(sun);

// Create Venus
const venus_loader = new THREE.TextureLoader();
const venus_geo = new THREE.SphereGeometry(0.38, 32, 16); 
const venus_mat = new THREE.MeshStandardMaterial( { map: venus_loader.load("Textures/venusmap.jpg") });
const venus = new THREE.Mesh(venus_geo, venus_mat);
// Add Venus to scene
venus.position.set(10, 0, 0);
scene.add(venus);

// Create Earth
const earth_loader = new THREE.TextureLoader();
const earth_geo = new THREE.SphereGeometry(0.4, 32, 16); 
const earth_mat = new THREE.MeshStandardMaterial( { map: earth_loader.load("Textures/earthmap1k.jpg") });
const earth = new THREE.Mesh(earth_geo, earth_mat);
// Add Earth to scene
earth.position.set(15, 0, 0);
scene.add(earth);

// Create Jupiter
const jup_loader = new THREE.TextureLoader();
const jup_geo = new THREE.SphereGeometry(1, 32, 16); 
const jup_mat = new THREE.MeshStandardMaterial( { map: jup_loader.load("Textures/jupitermap.jpg") });
const jupiter = new THREE.Mesh(jup_geo, jup_mat);
// Add Jupiter to scene
jupiter.position.set(25, 0, 0);
scene.add(jupiter);

// Create starfield
const stars = getStarfield({numStars: 200});
scene.add(stars);

// Add hemisphere lighting
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000)
scene.add(hemiLight);


// 3. -----PLANET ORBITS SETUP----- //

// Planet angles
let earth_angle = 0;
let venus_angle = 0;
let jup_angle = 0;

// Orbital speeds
const earth_os = 0.01;
const venus_os = 0.015;
const jup_os = 0.02;

// Orbital radii
const earth_or = 15;
const venus_or = 10;
const jup_or = 25;


// 4. -----ANIMATION LOOP----- //

function animate(t = 0) {
    requestAnimationFrame(animate);

    /* Rotate the planets on their axes
        Rotation speed - proportional to elapsed time (milliseconds) */
    const rot_speed = t * 0.0001;
    sun.rotation.y = rot_speed;
    venus.rotation.y = rot_speed;
    earth.rotation.y = rot_speed;
    jupiter.rotation.y = rot_speed;

    // Continuously increases planets' angles
    earth_angle += earth_os;
    venus_angle += venus_os;
    jup_angle += jup_os;

    // Calculate new planet positions
    earth.position.x = earth_or * Math.cos(earth_angle);
    earth.position.z = earth_or * Math.sin(earth_angle);

    venus.position.x = venus_or * Math.cos(venus_angle);
    venus.position.z = venus_or * Math.sin(venus_angle);

    jupiter.position.x = jup_or * Math.cos(jup_angle);
    jupiter.position.z = jup_or * Math.sin(jup_angle);

    // Render the scene
    renderer.render(scene, camera);
    controls.update();
}

animate();
