import {motion} from "framer-motion";
import * as React from "react";
import {coords, PathGenerator} from "../parts/PathGenerator";
import {Blossom} from "../parts/Blossom";

interface PathProps {
    x: number;
    y: number;
    commands: string[];
    pathGenerator: PathGenerator;
    scaleFactor: number;
    duration?: number;
    initialDelay?: number;
    initialDirection?: string;
    child?: React.ReactElement;
}

export const Path = (props: PathProps) => {

    const target: coords = props.pathGenerator.generatePath(props.x, props.y, props.commands, props.initialDirection);
    const path = target.pathParts.join(' ')
    const duration = props.duration || 2;
    const initialDelay = props.initialDelay || 0;

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
        {props.child}
        <motion.g>
            <Blossom x={target.x} y={target.y} initialDelay={initialDelay} radius={30 * props.scaleFactor}
                     fill={'white'}/>
            <Blossom x={target.x} y={target.y} initialDelay={initialDelay} radius={10 * props.scaleFactor}
                     fill={'darkorange'}/>
        </motion.g>
    </motion.g>
}
