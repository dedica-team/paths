import {motion} from "framer-motion";
import * as React from "react";
import {coords, PathGenerator} from "../parts/PathGenerator";
import {Blossom} from "../parts/Blossom";
import {Path} from "../parts/Path";

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
    ['f', 'r', 'l'],
    ['f', 'r', 'l', 'f'],
];

export const Flower = (props: FlowerProps) => {

    const target: coords = props.pathGenerator.generatePath(props.x, props.y, props.commands);

    const initialDelay = Math.random();

    const child = <motion.g>
        <Blossom x={target.x} y={target.y} initialDelay={initialDelay} radius={30 * props.scaleFactor}
                 fill={'white'}/>
        <Blossom x={target.x} y={target.y} initialDelay={initialDelay} radius={10 * props.scaleFactor}
                 fill={'darkorange'}/>
    </motion.g>;

    return <Path x={props.x} y={props.y} commands={props.commands} pathGenerator={props.pathGenerator}
                 scaleFactor={props.scaleFactor} duration={2} initialDelay={initialDelay} child={child}/>


}
