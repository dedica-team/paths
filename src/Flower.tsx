import {motion} from "framer-motion";
import * as React from "react";
import {coords, PathGenerator} from "./PathGenerator";
import {Blossom} from "./Blossom";

interface FlowerProps {
    x: number;
    y: number;
    commands: string[];
    pathGenerator: PathGenerator;
    scaleFactor: number;
}

export const flowerTypes = [
    ['f'],
    ['f', 'f'],
    ['f', 'f', 'f'],
    ['f', 'f', 'l', 'r'],
    ['f', 'l', 'r', 'f'],
    ['f', 'l', 'r', 'f'],
];

export const Flower = (props: FlowerProps) => {

    const target: coords = props.pathGenerator.generatePath(props.x, props.y, props.commands);
    const path = target.pathParts.join(' ')
    const duration = 2;

    const initialDelay = Math.random();

    const twig = {
        hidden: {
            opacity: 0,
            pathLength: 0,
            fill: 'none',
            strokeWidth: 20 * props.scaleFactor,
            stroke: 'darkorange'
        },
        visible: {
            opacity: 1,
            pathLength: 1,
            fill: 'none'
        }
    };


    return <motion.g>
        <motion.path
            d={path}
            variants={twig}
            initial="hidden"
            animate="visible"
            fill={''}
            transition={{
                default: {duration: duration, ease: "easeInOut"},
                fill: {duration: duration, ease: [1, 0, 0.8, 1]},
                delay: initialDelay
            }}
        />
        <motion.g>
            <Blossom x={target.x} y={target.y} initialDelay={initialDelay} radius={30 * props.scaleFactor}
                     fill={'white'}/>
            <Blossom x={target.x} y={target.y} initialDelay={initialDelay} radius={10 * props.scaleFactor}
                     fill={'darkorange'}/>
        </motion.g>
    </motion.g>
}
