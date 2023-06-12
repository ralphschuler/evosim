import { GameObject } from "../GameObject";
import { LSystem } from "../../utils/LSystem";
import { IPlant } from "../asset/interfaces/IPlant";
import { Voxel } from "./Voxel";
import { Vector3 } from "three";

export class Plant<T extends IPlant> extends GameObject {
    private asset: Asset<T>;
    private lSystem: LSystem;
    private position: Vector3;
    private checkpoints: Vector3[] = [];

    public constructor(parent?: GameObject) {
        super(parent);
        this.plant = new Asset<IPlant>("plant");
    }

    private generate(iterations: number): void {
        this.lSystem = new LSystem(this.plant.axiom, this.plant.rules);
        const instructions =  this.lSystem.generate(iterations);

        for (let i = 0; i < instructions.length; i++) {
            const instruction = instructions[i];
            if (instruction === "F") {
                this.moveForward();
            } else if (instruction === "N") {
                this.branchNorth();
            } else if (instruction === "E") {
                this.branchEast();
            } else if (instruction === "S") {
                this.branchSouth();
            } else if (instruction === "W") {
                this.branchWest();
            } else if (instruction === "C") {
                this.checkpoint();
            } else if (instruction === "J") {
                this.jump();
            }
        }
    }

    private moveForward(): void {
        const voxel = new Voxel(this, this.position);
        this.addGameObject(voxel);
        this.position.z++;
    }

    private branchNorth(): void {
        const voxel = new Voxel(this, this.position);
        this.addGameObject(voxel);
        this.position.x++;
    }

    private branchEast(): void {
        const voxel = new Voxel(this, this.position);
        this.addGameObject(voxel);
        this.position.y++;
    }

    private branchSouth(): void {
        const voxel = new Voxel(this, this.position);
        this.addGameObject(voxel);
        this.position.x--;
    }

    private branchWest(): void {
        const voxel = new Voxel(this, this.position);
        this.addGameObject(voxel);
        this.position.y--;
    }

    private checkpoint(): void {
        this.checkpoints.push(this.position);
    }

    private jump(): void {
        const checkpoint = this.checkpoints.pop();
        if (checkpoint) {
            this.position.x = checkpoint.x;
            this.position.y = checkpoint.y;
            this.position.z = checkpoint.z;
        }
    }
}