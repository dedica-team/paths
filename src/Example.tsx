import * as React from "react";
import {motion} from "framer-motion";

const icon = {
    hidden: {
        opacity: 0,
        pathLength: 0,
        fill: 'none',
        strokeWidth: 5,
        stroke: 'orange'
    },
    visible: {
        opacity: 1,
        pathLength: 1,
        fill: 'none'
    }
};

interface coords {
    x: number;
    y: number;
    direction: string;
    pathPart: string;
}

const increment = 50;
const generatePath = (x: number, y: number): string => {

    let path = `M ${x} ${y} `;
    const start: coords = {
        x: x,
        y: x,
        direction: 'up',
        pathPart: ''
    }

    let target: coords;
    target = nextCoordinates(start, 'f');
    path += target.pathPart;
    target = nextCoordinates(start, 'l');
    path += target.pathPart;
    target = nextCoordinates(start, 'f');
    path += target.pathPart;
    console.log("generated path:", path);
    return path;
}


const nextCoordinates = (lastCoords: coords, newDirection: string): coords => {

    let coordinates: coords = {
        x: lastCoords.x,
        y: lastCoords.y,
        direction: '',
        pathPart: ''
    };

    //forward
    if (newDirection === 'f') {
        if (lastCoords.direction === 'up') {
            coordinates.x += increment;
            coordinates.pathPart = 'h ' + increment + ' ';
            coordinates.direction = 'up';
        }
        if (lastCoords.direction === 'down') {
            coordinates.x -= increment;
            coordinates.pathPart = 'h -' + increment + ' ';
            coordinates.direction = 'down';
        }
    }

    //turn left
    if (newDirection === 'l') {
        if (lastCoords.direction === 'up') {
            coordinates.x -= increment;
            coordinates.pathPart = 'v -' + increment + ' ';
            coordinates.direction = 'left';
        }
        if (lastCoords.direction === 'down') {
            coordinates.x += increment;
            coordinates.pathPart = 'v ' + increment + ' ';
            coordinates.direction = 'right';
        }
        if (lastCoords.direction === 'left') {
            coordinates.y += increment;
            coordinates.pathPart = 'h ' + increment + ' ';
            coordinates.direction = 'down';
        }
        if (lastCoords.direction === 'right') {
            coordinates.y -= increment;
            coordinates.pathPart = 'v -' + increment + ' ';
            coordinates.direction = 'up';
        }
    }

    //turn right
    if (newDirection === 'r') {
        if (lastCoords.direction === 'up') {
            coordinates.y += increment;
            coordinates.pathPart = 'v ' + increment + ' ';
            coordinates.direction = 'right';
        }
        if (lastCoords.direction === 'down') {
            coordinates.x -= increment;
            coordinates.pathPart = 'v -' + increment + ' ';
            coordinates.direction = 'left';
        }
        if (lastCoords.direction === 'left') {
            coordinates.y -= increment;
            coordinates.pathPart = 'v -' + increment + ' ';
            coordinates.direction = 'up';
        }
        if (lastCoords.direction === 'right') {
            coordinates.y += increment;
            coordinates.pathPart = 'v ' + increment + ' ';
            coordinates.direction = 'down';
        }
    }

    return coordinates;
}


export const Example = () => (
    <div className="container">
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300 300"
            className="item"
        >
            <motion.path
                d={generatePath(100, 100)}
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
