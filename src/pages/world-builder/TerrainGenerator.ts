import * as THREE from 'three';
import { Object3D, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import noisejs from 'noisejs';

// the types are fucked so hack around them.
const Noise = (noisejs as any)['Noise'];
const noise = new Noise();

// Returns a random number in range [a,b] with step s.
function pick(a: number, b: number, s: number) {
  // Split a to b into n steps
  const n = (b - a) / s;
  // a + n*s = b
  const r = Math.floor(Math.random() * (n + 1));
  return a + r * s;
}

export class TerrainGenerator {
  private scene!: THREE.Scene;
  private camera!: THREE.Camera;
  private renderer!: THREE.WebGLRenderer;

  private sceneObjects: Map<string, THREE.Object3D> = new Map();

  private plane = {
    size: 50,
    segments: 200,
    vertRange: 10,
  };

  private heightMap: number[][] = [];

  constructor(viewportWidth: number, viewportHeight: number) {
    // Set up scene.
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf0f0f0);

    // Set up light source.
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(-1, 1.75, 1);
    dirLight.position.multiplyScalar(30);
    dirLight.castShadow = true;
    this.scene.add(dirLight);
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    // Set up camera.
    this.camera = new THREE.PerspectiveCamera(
      75,
      viewportWidth / viewportHeight,
      0.1,
      1000
    );
    this.camera.position.z = 40;
    this.camera.position.y = 40;
    this.camera.rotation.x = THREE.MathUtils.degToRad(-45);

    // Set up Renderer.
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(viewportWidth, viewportHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Set up Controler.
    var controls = new OrbitControls(this.camera, this.getDomElement());
    controls.minDistance = 40;
    controls.maxDistance = 150;
  }

  addToScene(id: string, object: Object3D) {
    const existing = this.sceneObjects.get(id);
    if (existing) {
      this.removeFromScene(id);
    }
    this.sceneObjects.set(id, object);
    this.scene.add(object);
  }

  removeFromScene(id: string) {
    const object = this.sceneObjects.get(id);
    if (!object) return;
    this.sceneObjects.delete(id);
    this.scene.remove(object);
  }

  getHeightAt(x: number, y: number) {
    let persistance = 0.4;
    let lacunarity = 1.8;
    const scaleFactor = 256;

    let height = 0;
    let amplitude = 1;
    let freq = 1;
    for (let i = 0; i < 5; i++) {
      const sampleX = (x / scaleFactor) * freq;
      const sampleY = (y / scaleFactor) * freq;
      height +=
        noise.perlin2(sampleX, sampleY) *
        this.plane.vertRange *
        amplitude;
      amplitude *= persistance;
      freq *= lacunarity;
    }

    return height;
  }

  updateHeightMap() {
    noise.seed(Math.random());
    this.heightMap = new Array(this.plane.size).fill([]);
    for (let x = 0; x < this.plane.segments; x++) {
      for (let y = 0; x < this.plane.segments; y++) {
        this.heightMap[x][y] = this.getHeightAt(x, y);
      }
    }
  }

  generate() {
    this.updateHeightMap();

    // Generate Vectors.

    // Add to Scene.
    const geometry = new THREE.BufferGeometry();
    geometry.computeVertexNormals();
    const material = new THREE.MeshStandardMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    mesh.rotation.x = THREE.MathUtils.degToRad(-90);
    this.addToScene('mesh', mesh);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    this.animate();
  }

  getDomElement() {
    return this.renderer.domElement;
  }
}
