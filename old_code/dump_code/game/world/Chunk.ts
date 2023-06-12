import { Noise } from "../../utils/Noise";
import { GameObject } from "../GameObject";

const CHUNK_SIZE = 16;

export class Chunk extends GameObject {

    private position: { x: number, y: number };
    public get Position(): { x: number, y: number } {
        return this.position;
    }

    public constructor(parent: GameObject, position: { x: number, y: number }) {
        super(parent);
        this.position = position;
    }

    public generate(): object {
        const heightMap = Noise(this.position, CHUNK_SIZE, "SEED".length, {
            octaves: 4,
            persistence: 0.5,
            lacunarity: 2,
            frequency: 0.5,
            amplitude: 1,
            scale: 1,
        });

        const heatMap = Noise(this.position, CHUNK_SIZE, "SEED".length, {
            octaves: 4,
            persistence: 0.5,
            lacunarity: 2,
            frequency: 0.5,
            amplitude: 1,
            scale: 1,
        }).map((value: number, index: number) => (value - heightMap[index]) * 2);

        const moistureMap = Noise(this.position, CHUNK_SIZE, "SEED".length, {
            octaves: 4,
            persistence: 0.5,
            lacunarity: 2,
            frequency: 0.5,
            amplitude: 1,
            scale: 1,
        }).map((value: number, index: number) => (value + heightMap[index]) / 2);

        return {
            heightMap,
            heatMap,
            moistureMap,
        }
    }

}