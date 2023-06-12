import { Scene, WebGLRenderer, PerspectiveCamera } from "three";
import { GameObject } from "./GameObject";

export class Game extends GameObject {

    private renderer: WebGLRenderer;
    private camera: PerspectiveCamera;

    constructor() {
        super();
        
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new WebGLRenderer();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

}