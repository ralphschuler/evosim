import { BoxBufferGeometry, MeshBasicMaterial } from "three";
import { Game, GameObject } from "./game";

const game = new Game();

const testGameObject = new GameObject(game);
testGameObject.Geometry = new BoxBufferGeometry(1, 1, 1);
testGameObject.Material = new MeshBasicMaterial({ color: 0x00ff00 });

game.addGameObject(testGameObject)

game.start();
