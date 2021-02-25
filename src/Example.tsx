import * as React from "react";
import {motion} from "framer-motion";
import {Flower} from "./Flower";


export const Example = () => (
    <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 500"
        className="item"
    >
        <Flower x={50} y={90} commands={['f',]}/>
        <Flower x={100} y={100} commands={['f', 'f', 'l', 'r', 'f']}/>
        <Flower x={300} y={90} commands={['f', 'l', 'r', 'f',]}/>
        <Flower x={400} y={100} commands={['f', 'r', 'f', 'r']}/>

    </motion.svg>
);
