import {motion} from "framer-motion";
import * as React from "react";

interface BlossomProps {
    x: number;
    y: number;
    initialDelay: number;
    radius: number;
    fill: string;
}

/**
 * This is basically a circle.
 *
 */
export const Blossom = (props: BlossomProps) => {

    const duration = 2;
    const blossom = {
        hidden: {
            opacity: 0,
            strokeWidth: 10,
            fill: props.fill,
            r: 1
        },
        visible: {
            opacity: 1,
            fill: props.fill,
            r: props.radius,
        }
    };

    return <motion.circle variants={blossom}
                          initial="hidden"
                          animate="visible"
                          r={1} x={props.x} y={props.y}
                          transition={{
                              default: {duration: 1, ease: "easeInOut"},
                              delay: props.initialDelay + duration
                          }}/>

}
