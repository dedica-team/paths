import * as React from "react";
import {motion} from "framer-motion";
import {Flower, flowerTypes} from "./Flower";
import {PathGenerator} from "./PathGenerator";
import {Blossom} from "./Blossom";
import {Bird} from "./Bird";

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

        i = i * 1.7;
        distance += i;
        if (scalePct < 0.08) continue;
        const seedDistance = 140 * scalePct;

        const pathGenerator = new PathGenerator(100 * scalePct);
        for (let x = -50; x < width+50; x = x + seedDistance) {
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

const birdGen = new PathGenerator(10);
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
            <motion.rect x="-100" y={420} width="1000" height="600" fill={'#666'}/>
            <Blossom x={50} y={200} initialDelay={1} radius={100} fill={'darkorange'} />
            <Bird x={250} y={200} pathGenerator={birdGen} scaleFactor={1}/>
            <Bird x={350} y={250} pathGenerator={birdGen} scaleFactor={1}/>
            <Bird x={420} y={180} pathGenerator={birdGen} scaleFactor={1}/>
            <Bird x={470} y={150} pathGenerator={birdGen} scaleFactor={1}/>
        </motion.g>
        <motion.g>
            {seeds}
        </motion.g>
    </motion.svg>
);
