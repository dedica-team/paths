import * as React from "react";
import {motion} from "framer-motion";
import {Flower, flowerTypes} from "./Flower";
import {PathGenerator} from "./PathGenerator";

/**
 *
 * @param front x coord nearest to the viewer
 * @param horizon x farest from the viewer (
 * @param width width of the field
 */
const seed = (front: number, horizon: number, width: number): JSX.Element[] => {

    let seeds: JSX.Element[] = [];

    //starting at horizon
    let distance = horizon;
    let i = 5;
    const lowerScale = 2;
    while (distance <= front) {
        const scalePct = distance / front;
        const seedDistance = 100;
        if (scalePct < 0.05) continue;

        const pathGenerator = new PathGenerator(100 * scalePct);
        for (let x = 0; x < width; x = x + seedDistance) {
            const seedX = x + Math.random() * 10;
            const random = ~~(Math.random() * flowerTypes.length);
            const commands = flowerTypes[random];
            console.log(scalePct, seedX, i, commands);
            seeds.push(<Flower key={seedX + '' + i} x={seedX} y={i + Math.random() * 10} commands={commands}
                               scaleFactor={scalePct} pathGenerator={pathGenerator}/>)
        }
        break;
        i = i * 2;
        distance += i;
    }
    return seeds;
}

const seeds = seed(780, 400, 800);
export const Example = () => (
    <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 500"
        width="800"
        height="500"
        className="item"
    >
        {seeds}
    </motion.svg>
);
