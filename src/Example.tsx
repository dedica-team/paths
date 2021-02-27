import * as React from "react";
import {motion} from "framer-motion";
import {Flower, flowerTypes} from "./Flower";
import {PathGenerator} from "./PathGenerator";
import {Blossom} from "./Blossom";

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
        const scalePct = (distance + 10 - horizon) / (front - horizon);

        i = i * 1.6;
        distance += i;
        if (scalePct < 0.10) continue;
        const seedDistance = 140 * scalePct;

        const pathGenerator = new PathGenerator(100 * scalePct);
        for (let x = 0; x < width; x = x + seedDistance) {
            const seedX = x + Math.random() * 30;
            const seedY = distance + (Math.random() - 0.5) * i;
            const random = ~~(Math.random() * flowerTypes.length);
            const commands = flowerTypes[random];
            console.log(scalePct, seedX, i, commands);
            seeds.push(<Flower key={seedX + '' + i} x={seedX} y={seedY} commands={commands}
                               scaleFactor={scalePct} pathGenerator={pathGenerator}/>)
        }

    }
    return seeds;
}

const seeds = seed(780, 400, 800);
export const Example = () => (
    <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 300 800 500"
        width="800"
        height="500"
        className="item"
    >
        <motion.g>
            <motion.rect x="-150" y={440} width="1050" height="600" fill={'#666'}/>
            <Blossom x={50} y={200} initialDelay={1} radius={100} fill={'darkorange'} />
        </motion.g>
        <motion.g>
            {seeds}
        </motion.g>
    </motion.svg>
);
