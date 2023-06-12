import { GameObject } from "./GameObject";
import { World } from "./world"

export class Game extends GameObject {

    private lastAnimationRequest: number = 0;
    private animationRequest: number | undefined;

    public constructor() {
        super();
        this.addGameObject(new World(this))
    }

    private loop(now: number): void {
        const deltaTime = (now * 0.001) - this.lastAnimationRequest;

        this.onUpdate(deltaTime);
        this.onRender(deltaTime);

        this.lastAnimationRequest = now;
        this.animationRequest = requestAnimationFrame(this.loop);
    }

    public start(): void {
        this.animationRequest = requestAnimationFrame(this.loop);
    }

    public stop(): void {
        if (this.animationRequest) {
            cancelAnimationFrame(this.animationRequest);
            this.animationRequest = undefined;
        }
        this.onDispose();
    }

    public pause(): void {
        if (this.animationRequest) {
            cancelAnimationFrame(this.animationRequest);
            this.animationRequest = undefined;
        }
    }
}