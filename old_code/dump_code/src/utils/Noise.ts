import { createNoise2D } from 'simplex-noise';
import { Vector2 } from 'three';
import { INoise } from '../game/asset/interfaces/INoise';
import alea from 'alea';

export function Noise(offset: Vector2, size: number, seed: number, args: INoise) {
    let prng = alea('seed');
    let noise2D = createNoise2D(prng);
    let data = new Float32Array(size * size);
    let scale = args.scale;
    let frequency = args.frequency;
    let amplitude = args.amplitude;
    let persistance = args.persistance;
    let lacunarity = args.lacunarity;
    let octaves = args.octaves;
    let max = 0;
    let min = 0;
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            let n = 0;
            let a = 1;
            let f = frequency;
            for (let o = 0; o < octaves; o++) {
                n += noise2D(x / scale * f + offset.x, y / scale * f + offset.y) * a;
                f *= lacunarity;
                a *= persistance;
            }
            data[x + y * size] = n;
            if (n > max) {
                max = n;
            }
            if (n < min) {
                min = n;
            }
        }
    }
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            data[x + y * size] = (data[x + y * size] - min) / (max - min);
        }
    }
    return data;
}