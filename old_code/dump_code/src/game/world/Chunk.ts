import { Vector2 } from "three";
import { Noise } from "../../utils/Noise";
import { Asset } from "../asset/Asset";
import { INoise } from "../asset/interfaces/INoise";
import { GameObject } from "../GameObject";

const CHUNK_SIZE = 16;

const heightMapConfig = new Asset<INoise>("../../../assets/noise/Height.json");
const heatMapConfig = new Asset<INoise>("../../../assets/noise/Heat.json");
const moistureMapConfig = new Asset<INoise>("../../../assets/noise/Moisture.json");

export class Chunk extends GameObject {

    private position: Vector2;
    public get Position(): Vector2 {
        return this.position;
    }

    public constructor(parent: GameObject, position: Vector2) {
        super(parent);
        this.position = position;
    }

    public async generateNoise(): object {
        await heightMapConfig.load();
        const heightMap = Noise(this.position, CHUNK_SIZE, "SEED".length, heightMapConfig.Data);

        await heatMapConfig.load();
        const heatMap = Noise(this.position, CHUNK_SIZE, "SEED".length, heatMapConfig.Data).map((value: number, index: number) => (value - heightMap[index]) * 2);

        await moistureMapConfig.load();
        const moistureMap = Noise(this.position, CHUNK_SIZE, "SEED".length, moistureMapConfig.Data).map((value: number, index: number) => (value + heightMap[index]) / 2);

        return {
            heightMap,
            heatMap,
            moistureMap,
        }
    }

    public async onUpdate(deltaTime: number): void {
        console.log("Chunk update");
        console.log(await this.generateNoise());
    }
}