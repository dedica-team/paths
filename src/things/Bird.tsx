import {motion} from "framer-motion";
import * as React from "react";
import {coords, PathGenerator} from "../parts/PathGenerator";
import {Blossom} from "../parts/Blossom";

interface BirdProps {
    x: number;
    y: number;
    pathGenerator: PathGenerator;
    scaleFactor: number;
}

export const Bird = (props: BirdProps) => {

    const wing1: coords = props.pathGenerator.generatePath(props.x, props.y, ['f']);
    const wing2: coords = props.pathGenerator.generatePath(wing1.x, wing1.y, ['f']);
    const duration = 2;

    const initialDelay = Math.random();

    const twig = {
        hidden: {
            opacity: 0,
            pathLength: 0,
            fill: 'none',
            strokeWidth: 2 * props.scaleFactor,
            stroke: 'darkorange'
        },
        visible: {
            opacity: 1,
            pathLength: 1,
            fill: 'none'
        }
    };

    const rotation = 90 + (Math.random()-0.5)*45;
    return <motion.g transform={`rotate( ${rotation}, ${wing1.x}, ${wing1.y}) `}>
        <motion.path
            d={wing1.pathParts.join(' ')}
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
        <motion.path
            d={wing2.pathParts.join(' ')}
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
        <Blossom x={wing1.x} y={wing1.y} initialDelay={2} radius={3} fill={'white'} />
    </motion.g>
}
