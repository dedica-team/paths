import * as React from "react";
import {motion} from "framer-motion";
import {coords, PathGenerator} from "./PathGenerator";

const icon = {
    hidden: {
        opacity: 0,
        pathLength: 0,
        fill: 'none',
        strokeWidth: 10,
        stroke: 'orange'
    },
    visible: {
        opacity: 1,
        pathLength: 1,
        fill: 'none'
    }
};


const pathGenerator = new PathGenerator(100);


export const Example = () => (
    <div className="container">
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300 300"
            className="item"
        >
            <motion.path
                d={pathGenerator.generatePath(100, 100)}
                variants={icon}
                initial="hidden"
                animate="visible"
                fill={''}
                transition={{
                    default: {duration: 2, ease: "easeInOut"},
                    fill: {duration: 2, ease: [1, 0, 0.8, 1]}
                }}
            />
        </motion.svg>
    </div>
);
