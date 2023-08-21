import { Scene, WebGLRenderer, PerspectiveCamera } from "three";
import { GameObject } from "./GameObject";

export class Game extends GameObject {

    private renderer: WebGLRenderer;
    private camera: PerspectiveCamera;
    private scene: Scene = new Scene();

    public get Scene(): Scene {
        return this.scene;
    }
    public get Camera(): PerspectiveCamera {
        return this.camera;
    }
    public get Renderer(): WebGLRenderer {
        return this.renderer;
    }

    public set Scene(scene: Scene) {
        this.scene = scene;
    }

    constructor() {
        super();
        
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new WebGLRenderer();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    private loop(): void {
        requestAnimationFrame(() => this.loop());
        this.update(0);
        this.renderer.render(this.scene, this.camera);
    }

}