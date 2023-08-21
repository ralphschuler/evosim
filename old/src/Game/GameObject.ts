import { SafeArray } from "../Utilities/SafeArray";

export class GameObject {

    private readonly id: number;
    private children: SafeArray<GameObject> = new SafeArray<GameObject>();
    private readonly parent: GameObject;

    public get Id(): number {
        return this.id;
    }

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
        this.id = Math.random();
        this.parent = parent || this;
    }

    protected onUpdate(_deltaTime: number): void {}

    public update(deltaTime: number): void {
        this.children.forEach((gameObject: GameObject) => {
            gameObject.update(deltaTime);
        });
        this.onUpdate(deltaTime);
    }

    public addGameObject(gameObject: GameObject): void {
        this.children.add(gameObject);
    }
}