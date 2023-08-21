import { PerspectiveCamera, WebGLRenderer } from "three";
import { GameObject } from "./GameObject";

export class Game extends GameObject {

    private lastAnimationRequest: number = 0;
    private animationRequest: number | undefined;
    private renderer: WebGLRenderer;
    private camera: PerspectiveCamera;

    public constructor() {
        super();
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new WebGLRenderer();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    private loop(now: number): void {
        const deltaTime = (now * 0.001) - this.lastAnimationRequest;

        this.update(deltaTime);

        this.renderer.render(this.Scene, this.camera);

        this.lastAnimationRequest = now;
        setTimeout(() => {
            this.animationRequest = requestAnimationFrame(this.loop.bind(this));
        }, 1000 / 60);
    }

    public start(): void {
        this.animationRequest = requestAnimationFrame(this.loop.bind(this));
    }

    public stop(): void {
        this.pause();
        this.dispose();
    }

    public pause(): void {
        if (!this.animationRequest) {
            return
        }

        cancelAnimationFrame(this.animationRequest);
        this.animationRequest = undefined;
    }
}