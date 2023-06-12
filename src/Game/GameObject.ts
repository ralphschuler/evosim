import { SafeArray } from "../Utilities/SafeArray";

export class GameObject {

    private gameObjects: SafeArray<GameObject> = new SafeArray<GameObject>();
    
    private readonly parent: GameObject;
    public get Parent(): GameObject {
        return this.parent;
    }

    public get Game(): GameObject {
        if (this.parent === this) {
            return this;
        }
        return this.parent.Game;
    }

    constructor(parent?: GameObject) {
        this.parent = parent || this;
    }

    protected onUpdate(deltaTime: number): void {}
    public update(deltaTime: number): void {
        this.gameObjects.forEach((gameObject: GameObject) => {
            gameObject.update(deltaTime);
        });
        this.onUpdate(deltaTime);
    }

    public addGameObject(gameObject: GameObject): void {
        this.gameObjects.add(gameObject);
    }
}