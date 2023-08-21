import {
  Scene,
  Color,
  Mesh,
  MeshStandardMaterial,
  BoxGeometry,
  PerspectiveCamera,
  WebGLRenderer,
  OrthographicCamera,
  AxesHelper,
  GridHelper,
  PCFSoftShadowMap,
  AmbientLight,
  PointLight
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "stats.js";
import GUI from 'lil-gui'

import "@/style.css"

class Main {
  /** The scene */
  public scene: Scene;

  /** The camera */
  public camera: PerspectiveCamera | OrthographicCamera;

  /** The renderer */
  public renderer: WebGLRenderer;

  /** The orbit controls */
  public controls: OrbitControls;

  /** The stats */
  public stats: Stats;

  /** The cube mesh */
  public cube: Mesh;

  /** The axes helper */
  public axesHelper: AxesHelper;
  
  /** The grid helper */
  public gridHelper: GridHelper;

  /** The ambient light */
  public ambientLight: AmbientLight

  /** The point light */
  public pointLight: PointLight

  /** The GUI */
  public gui: GUI

  constructor() {
    this.initViewport();
    this.gui = new GUI()
    this.gui.add(document, 'title')
  }

  /** Initialize the viewport */
  public initViewport() {
    // Init scene.
    this.scene = new Scene();
    this.scene.background = new Color("#191919");

    // Init camera.
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new PerspectiveCamera(75, aspect, 0.1, 1000);
    this.camera.position.set(30, 15, 30);
    this.camera.lookAt(0, 0, 0);

    // Init renderer.
    this.renderer = new WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true,
      alpha: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = PCFSoftShadowMap
    this.renderer.render(this.scene, this.camera);
    this.renderer.setAnimationLoop(() => this.animate()); // uncomment if you want to use the animation loop
    document.body.appendChild(this.renderer.domElement);
    window.addEventListener("resize", () => this.onResize());

    // Init stats.
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);

    // Init orbit controls.
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.update();
    this.controls.addEventListener("change", () => this.render());

    // Init helpers.
    this.axesHelper = new AxesHelper(100);
    this.scene.add(this.axesHelper);

    this.gridHelper = new GridHelper(100, 100);
    this.scene.add(this.gridHelper);

    // Init lights.
    this.ambientLight = new AmbientLight('white', 0.4)
    this.pointLight = new PointLight('#ffdca8', 1.2, 100)
    this.pointLight.position.set(-2, 3, 3)
    this.pointLight.castShadow = true
    this.pointLight.shadow.radius = 4
    this.pointLight.shadow.camera.near = 0.5
    this.pointLight.shadow.camera.far = 4000
    this.pointLight.shadow.mapSize.width = 2048
    this.pointLight.shadow.mapSize.height = 2048
    this.scene.add(this.ambientLight)
    this.scene.add(this.pointLight)

    // Add test mesh.
    this.cube = this.createCubeMesh();
    this.scene.add(this.cube);
    this.render();

    console.log(this);
  }

  /** Renders the scene */
  public render() {
    this.stats.begin();
    this.renderer.render(this.scene, this.camera);
    this.stats.end();
  }

  /** Animates the scene */
  public animate() {
    this.stats.begin();

    this.cube.rotation.x += 0.005;
    this.cube.rotation.y += 0.001;

    this.controls.update();
    this.renderer.render(this.scene, this.camera);

    this.stats.end();
  }

  /** On resize event */
  public onResize() {
    if (this.camera instanceof PerspectiveCamera) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.render();
  }

  /** Creates a cube mesh */
  public createCubeMesh() {
    const geometry = new BoxGeometry(5, 5, 5);
    const material = new MeshStandardMaterial({
      color: '#f69f1f',
      metalness: 0.5,
      roughness: 0.7,
    })

    const mesh = new Mesh(geometry, material);
    mesh.castShadow = true
    mesh.receiveShadow = true
    mesh.position.y = 10
    return mesh;
  }
}

new Main();
