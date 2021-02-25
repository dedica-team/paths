import {motion} from "framer-motion";
import * as React from "react";
import {coords, PathGenerator} from "./PathGenerator";

const twig = {
    hidden: {
        opacity: 0,
        pathLength: 0,
        fill: 'none',
        strokeWidth: 20,
        stroke: 'darkorange'
    },
    visible: {
        opacity: 1,
        pathLength: 1,
        fill: 'none'
    }
};


const blossom = {
    hidden: {
        opacity: 0,
        fill: 'none',
        strokeWidth: 10,
        r: 5
    },
    visible: {
        opacity: 1,
        fill: 'white',
        r: 30,
    }
};


const blossomCore = {
    hidden: {
        opacity: 0,
        fill: 'none',
        strokeWidth: 10,
        r: 5
    },
    visible: {
        opacity: 1,
        fill: 'darkorange',
        r: 20,
    }
};

interface FlowerProps {
    x: number;
    y: number;
    commands: string[];
}

export const Flower = (props: FlowerProps) => {

    const pathGenerator = new PathGenerator(100);
    const target: coords = pathGenerator.generatePath(props.x, props.y, props.commands);
    const path = target.pathParts.join(' ')
    const duration = 2;
    console.log(target);

    const initialDelay = Math.random();

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
            <motion.circle variants={blossom}
                           initial="hidden"
                           animate="visible"
                           r={30} x={target.x} y={target.y}
                           transition={{
                               default: {duration: 1, ease: "easeInOut"},
                               delay: initialDelay + duration
                           }}/>
            <motion.circle variants={blossomCore}
                           initial="hidden"
                           animate="visible"
                           r={10} x={target.x} y={target.y}
                           transition={{
                               default: {duration: 1, ease: "easeInOut"},
                               delay: initialDelay + duration
                           }}/>
        </motion.g>
    </motion.g>
}
