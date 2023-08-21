import { GUID } from "../utils/GUID";
import { SafeArray } from "../utils/SafeArray";
import { ObjectMemory } from "./ObjectMemory";
import { BufferGeometry, Material, Mesh, Scene } from "three";

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
        if (this.parent !== this) {
            this.parent.RequiresUpdate = requiresUpdate;
        }
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

    private scene: Scene;
    public get Scene(): Scene {
        return this.scene;
    }

    public constructor(parent?: GameObject, objectMemory?: ObjectMemory) {
        this.guid = GUID();
        this.parent = parent || this;
        this.scene = parent?.Scene || new Scene();
        this.objectMemory = objectMemory || new ObjectMemory();
        this.gameObjects = new SafeArray<GameObject>();
    }

    public update(deltaTime: number): void {
        this.gameObjects.forEach((gameObject: GameObject) => {
            gameObject.update(deltaTime);
        });
        this.onUpdate(deltaTime);
    }
    protected onUpdate(deltaTime: number): void {}

    public dispose(): void {
        this.gameObjects.forEach((gameObject: GameObject) => {
            gameObject.dispose();
        });
        this.onDispose();
    }
    protected onDispose(): void {}

    public addGameObject(gameObject: GameObject): void {
        this.Game.Scene.add(gameObject.Mesh);
        this.gameObjects.add(gameObject);
    }

    public removeGameObject(gameObject: GameObject): void {
        this.Game.Scene.remove(gameObject.Mesh);
        this.gameObjects.remove(gameObject);
    }
}