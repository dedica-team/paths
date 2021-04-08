import * as React from "react";
import {motion} from "framer-motion";
import {Flower, flowerTypes} from "../things/Flower";
import {PathGenerator} from "../parts/PathGenerator";
import {Blossom} from "../parts/Blossom";
import {Bird} from "../things/Bird";
import {Path} from "../parts/Path";

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
        for (let x = -50; x < width + 50; x = x + seedDistance) {
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

const pathGenerator = new PathGenerator(30);
export const Octo = () => (
    <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="1200"
        viewBox="-400 -400 2000 2000"
        height="1600"
        className="item"
    >
        <motion.g>
            <Path x={360} y={470} pathGenerator={pathGenerator} scaleFactor={0.5}
                  commands={['f', 'f', 'f', 'r', 'f', 'l', 'f', 'f', 'f', 'f', 'f', 'r', ]}
                  initialDirection={'down'}/>
            <Path x={390} y={470} pathGenerator={pathGenerator} scaleFactor={0.5} commands={['f','f','f','f', 'r', 'l', 'f', 'f', 'f', 'f', 'r', 'l', 'f']}
                  initialDirection={'down'}/>
            <Path x={420} y={470} pathGenerator={pathGenerator} scaleFactor={0.5} commands={['f','f','f','f','f', 'f','f', 'r', 'l', 'f', 'f', 'f', 'f', 'f',]}
                  initialDirection={'down'}/>
            <Path x={450} y={470} pathGenerator={pathGenerator} scaleFactor={0.5} commands={['f','f','f','f','f', 'f','f','f', 'f',  'f', 'f', 'l', 'r']}
                  initialDirection={'down'}/>
            <Path x={480} y={470} pathGenerator={pathGenerator} scaleFactor={0.5} commands={['f','f','f','f', 'f', 'l', 'r', 'f', 'f', 'l', 'r', 'f',]}
                  initialDirection={'down'}/>
            <Path x={510} y={470} pathGenerator={pathGenerator} scaleFactor={0.5} commands={['f','f','f', 'f', 'l', 'f', 'r', 'f', 'f', 'l', 'r', 'f',]}
                  initialDirection={'down'}/>
            <Blossom x={435} y={360} initialDelay={0} radius={150} fill={'white'}/>
            <Blossom x={435} y={360} initialDelay={1} radius={75} fill={'darkorange'}/>
            <motion.circle x={435} y={530} r={480} stroke={'darkorange'} fill={'none'} strokeWidth={10} />
            <motion.circle x={435} y={530} r={500} stroke={'darkorange'} fill={'none'} strokeWidth={5} />
            <motion.circle x={435} y={530} r={520} stroke={'darkorange'} fill={'none'} strokeWidth={1} />
        </motion.g>
    </motion.svg>
);
