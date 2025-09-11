import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 1, 4);
scene.add(directionalLight);

const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
const textureLoader = new THREE.TextureLoader();

const textureDay = textureLoader.load('./textures/day.jpg');
const textureNight = textureLoader.load('./textures/night.jpg');
const textureClouds = textureLoader.load('./textures/05_earthcloudmaptrans.jpg');

const materialDay = new THREE.MeshPhongMaterial({ map: textureDay });
const materialNight = new THREE.MeshPhongMaterial({ map: textureNight, transparent: true, opacity: 0.5 });
const materialClouds = new THREE.MeshPhongMaterial({ map: textureClouds, transparent: true, opacity: 0.4 });

const earthDay = new THREE.Mesh(earthGeometry, materialDay);
scene.add(earthDay);

const earthNight = new THREE.Mesh(earthGeometry, materialNight);
earthNight.scale.set(1.01, 1.01, 1.01);
scene.add(earthNight);

const clouds = new THREE.Mesh(earthGeometry, materialClouds);
clouds.scale.set(1.02, 1.02, 1.02);
scene.add(clouds);

camera.position.z = 3;

function animate() {
  requestAnimationFrame(animate);

  earthDay.rotation.y += 0.001;
  earthNight.rotation.y += 0.001;
  clouds.rotation.y += 0.002;

  controls.update();
  renderer.render(scene, camera);
}
controls.enableRotate = false;  // Disabilita rotazione con mouse
controls.enablePan = false;     // Disabilita pan con mouse
controls.enableZoom = false;    // Disabilita zoom con rotella

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


