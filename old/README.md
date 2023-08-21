### EvoSIM

This project might never be functional.
for now its just a tought experiment for myself with some kind of implementation.

The main goal of this Repo is to learn the concept of genetic algorithms and machine learning.

## Idea
> Creating a Ecosystem with creatures based on Genetic Algorithms and Procedural Generation
- The world should be procedural generated including trees plants and so on.
- The world should generate biomes based on heat and moisture maps.
- Elements, Biomes and such should be dynamically loaded and parsed from json files.
- Creatures should have a simple neural net controlling their behavior.
  - Input Neurons
    - Clock
    - Hunger
    - Thirst
  - Output Neurons
    - Walk Forward
    - Walk Backward
    - Turn Left
    - Turn Right


## Components
- Assets:
  - Elements:
    - Blood
    - Dirt
    - Fire
    - Gas
    - Grass
    - Lava
    - Oil
    - Salt
    - SaltWater
    - Sand
    - Smoke
    - Steam
    - Stone
    - Void
    - Water
    - Wood
  - Biomes:
    - Beach
    - Ice
    - Boreal Forest
    - Deep Water
    - Desert
    - Grassland
    - Lake
    - Mountain
    - Savanna
    - Sessional Forest
    - Shallow Water
    - Temperate Rainforest
    - Tiga
    - Tropical Rainforest
    - Tundra
    - Woodland
  - Noise:
    - HeatMap (Dependent on HightMap)
    - HeightMap
    - MoistureMap (Dependent on HightMap)
  - Mappings:
    - Heat
      - Coldest [ Ice ]
      - Colder [ Tundra ]
      - Cold [ Tundra, Grassland, Woodland, Boreal Forest ]
      - Hot [ Desert, Woodland, Sessional Forest, Temperate Rainforest ]
      - Hotter [ Desert, Savanna, Tropical Rainforest ]
      - Hottest [ Desert, Savanna ]
    - Moisture
      - Dryest [ Savanna]
      - Dryer [ Savanna, Desert, Tropical Rainforest ]
      - Dry [ Desert, Savanna, Temperate Rainforest ]
      - Wet [ Beach, Desert, Woodland ]
      - Wetter [ Woodland, Boreal Forrest ]
      - Wettest [ Boreal Forest ]
- Game
  - World
    - Interfaces
      - IBiome
      - IElement
      - IReaction
    - Voxel
    - Chunk
  - GameObject
  - ObjectMemory
- NeuralNet
  - DNA
  - Neuron

## Development

```bash
yarn # In order to install the required node_modules
yarn dev # Opens the app to http://localhost:3000
```

## Build
```bash
yarn # In order to install the required node_modules
yarn build # Builds the app to dist/
```