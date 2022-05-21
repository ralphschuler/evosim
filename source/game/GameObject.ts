import { GUID } from "../utils/GUID";
import { SafeArray } from "../utils/SafeArray";
import { ObjectMemory } from "./ObjectMemory";
import { BufferGeometry, Material, Mesh } from "three";

export class GameObject {
    private guid: string;
    public get Guid(): string {
        return this.guid;
    }

    private requiresUpdate: boolean = false;
    public get RequiresUpdate(): boolean {
        return this.requiresUpdate;
    }
    public set RequiresUpdate(requiresUpdate: boolean) {
        this.requiresUpdate = requiresUpdate;
        this.parent.RequiresUpdate = true;
    }

    private geometry: BufferGeometry;
    public get Geometry(): BufferGeometry {
        return this.geometry;
    }
    public set Geometry(geometry: BufferGeometry) {
        this.geometry = geometry;
        this.RequiresUpdate = true;
    }

    private material: Material;
    public get Material(): Material {
        return this.material;
    }
    public set Material(material: Material) {
        this.material = material;
        this.RequiresUpdate = true;
    }

    public get Mesh(): Mesh {
        return new Mesh(this.geometry, this.material);
    }

    private readonly objectMemory: ObjectMemory;
    public get ObjectMemory(): ObjectMemory {
        return this.objectMemory;
    }

    private readonly gameObjects: SafeArray<GameObject>;
    public get GameObjects(): SafeArray<GameObject> {
        return this.gameObjects
    }

    private readonly parent: GameObject;
    public get Parent(): GameObject {
        return this.parent;
    }

    private get Game(): GameObject {
        if (this.parent === this) {
            return this;
        }
        return this.parent.Game;
    }

    public constructor(parent?: GameObject, objectMemory?: ObjectMemory) {
        this.guid = GUID();
        this.parent = parent || this;
        this.objectMemory = objectMemory || new ObjectMemory();
        this.gameObjects = new SafeArray<GameObject>();
    }

    public onRender(deltaTime: number): void {
        this.gameObjects.forEach((gameObject: GameObject) => {
            gameObject.onRender(deltaTime);
        });
        this.render(deltaTime);
    }
    protected render(deltaTime: number): void {}

    protected onUpdate(deltaTime: number): void {
        this.gameObjects.forEach((gameObject: GameObject) => {
            gameObject.onUpdate(deltaTime);
        });
        this.update(deltaTime);
    }
    public update(deltaTime: number): void {}

    protected onDispose(): void {
        this.gameObjects.forEach((gameObject: GameObject) => {
            gameObject.onDispose();
        });
        this.dispose();
    }
    public dispose(): void {}

    public addGameObject(gameObject: GameObject): void {
        this.gameObjects.add(gameObject);
    }

    public removeGameObject(gameObject: GameObject): void {
        this.gameObjects.remove(gameObject);
    }
}