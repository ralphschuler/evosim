import SimplexNoise from 'simplex-noise';

export function Noise(offset: { x: number, y: number }, size: number, seed: number, args: {
    octaves: number,
    persistence: number,
    lacunarity: number,
    frequency: number,
    amplitude: number,
    scale: number,
}) {
    let noise = new SimplexNoise(seed);
    let data = new Float32Array(size * size);
    let scale = args.scale;
    let frequency = args.frequency;
    let amplitude = args.amplitude;
    let persistence = args.persistence;
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
                n += noise.noise2D(x / scale * f + offset.x, y / scale * f + offset.y) * a;
                f *= lacunarity;
                a *= persistence;
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