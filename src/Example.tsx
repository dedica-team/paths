import * as React from "react";
import {motion} from "framer-motion";
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


const pathGenerator = new PathGenerator(100);

const target: coords = pathGenerator.generatePath(100, 100, ['f', 'l', 'f', 'r']);
const path = target.pathParts.join(' ')
console.log(target)
export const Example = () => (
    <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 300"
        className="item"
    >
        <motion.g>
            <motion.path
                d={path}
                variants={twig}
                initial="hidden"
                animate="visible"
                fill={''}
                transition={{
                    default: {duration: 2, ease: "easeInOut"},
                    fill: {duration: 2, ease: [1, 0, 0.8, 1]},
                }}
            />
            <motion.g>
                <motion.circle variants={blossom}
                               initial="hidden"
                               animate="visible"
                               r={30} x={target.x} y={target.y}
                               transition={{
                                   default: {duration: 1, ease: "easeInOut"},
                                   delay:1.8
                               }}/>
                <motion.circle variants={blossomCore}
                               initial="hidden"
                               animate="visible"
                               r={10} x={target.x} y={target.y}
                               transition={{
                                   default: {duration: 1, ease: "easeInOut"},
                                   delay:1.8
                               }}/>
            </motion.g>
        </motion.g>

    </motion.svg>
);
