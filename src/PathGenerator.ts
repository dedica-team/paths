export interface coords {
    x: number;
    y: number;
    direction: string;
    pathParts: string[];
}

export class PathGenerator {

    increment: number;

    constructor(increment: number) {
        this.increment = increment;
    }

    nextCoordinates = (lastCoords: coords, newDirection: string): coords => {
        let coordinates: coords = {
            x: lastCoords.x,
            y: lastCoords.y,
            direction: '',
            pathParts: lastCoords.pathParts
        };

        //forward
        if (newDirection === 'f') {
            if (lastCoords.direction === 'up') {
                coordinates.y -= this.increment;
                coordinates.pathParts.push('l 0 -' + 0.8 * this.increment + ' ');
                coordinates.pathParts.push('l 0 -' + 0.2 * this.increment + ' ');
                coordinates.direction = 'up';
            }
            if (lastCoords.direction === 'down') {
                coordinates.y += this.increment;
                coordinates.pathParts.push('l 0 ' + 0.8 * this.increment + ' ');
                coordinates.pathParts.push('l 0 ' + 0.2 * this.increment + ' ');
                coordinates.direction = 'down';
            }
            if (lastCoords.direction === 'left') {

                coordinates.x -= this.increment;
                coordinates.pathParts.push('l -' + 0.8 * this.increment + ' 0');
                coordinates.pathParts.push('l -' + 0.2 * this.increment + ' 0');
                coordinates.direction = 'left';
            }
            if (lastCoords.direction === 'right') {
                coordinates.x += this.increment;
                coordinates.pathParts.push('l ' + 0.8 * this.increment + ' 0');
                coordinates.pathParts.push('l ' + 0.2 * this.increment + ' 0');
                coordinates.direction = 'right';
            }
        }

        //turn left
        if (newDirection === 'l') {
            let pop = coordinates.pathParts.pop(); //remove
            if (pop) {
                coordinates.pathParts.push(pop.replace('l', 'q')); //turn former end into control point
            } else {
                coordinates.pathParts.push('l'); //init drawing
            }
            if (lastCoords.direction === 'up') {
                coordinates.x -= this.increment;
                coordinates.pathParts.push(' -' + 0.2 * this.increment + '  -' + 0.2 * this.increment);
                coordinates.pathParts.push('l -' + 0.6 * this.increment + ' 0 ');
                coordinates.pathParts.push('l -' + 0.2 * this.increment + ' 0 ');
                coordinates.direction = 'left';
            }
            if (lastCoords.direction === 'down') {
                coordinates.x += this.increment;
                coordinates.pathParts.push(' ' + 0.2 * this.increment + '  ' + 0.2 * this.increment);
                coordinates.pathParts.push('l ' + 0.6 * this.increment + ' 0 ');
                coordinates.pathParts.push('l ' + 0.2 * this.increment + ' 0 ');
                coordinates.direction = 'right';
            }
            if (lastCoords.direction === 'left') {
                coordinates.y += this.increment;
                coordinates.pathParts.push(' -' + 0.2 * this.increment + '  ' + 0.2 * this.increment);
                coordinates.pathParts.push('l 0 ' + 0.6 * this.increment + ' ');
                coordinates.pathParts.push('l 0 ' + 0.2 * this.increment + ' ');
                coordinates.direction = 'down';
            }
            if (lastCoords.direction === 'right') {
                coordinates.y -= this.increment;
                coordinates.pathParts.push(' ' + 0.2 * this.increment + '  -' + 0.2 * this.increment);
                coordinates.pathParts.push('l 0 -' + 0.6 * this.increment + ' ');
                coordinates.pathParts.push('l 0 -' + 0.2 * this.increment + ' ');
                coordinates.direction = 'up';
            }
        }

        //turn right
        if (newDirection === 'r') {
            let pop = coordinates.pathParts.pop(); //remove
            if (pop) {
                coordinates.pathParts.push(pop.replace('l', 'q')); //control point
            } else {
                coordinates.pathParts.push('l'); //init drawing
            }
            if (lastCoords.direction === 'up') {
                coordinates.x += this.increment;
                coordinates.pathParts.push(' ' + 0.2 * this.increment + '  -' + 0.2 * this.increment + ' ');
                coordinates.pathParts.push('l ' + 0.6 * this.increment + ' 0 ');
                coordinates.pathParts.push('l ' + 0.2 * this.increment + ' 0 ');
                coordinates.direction = 'right';
            }
            if (lastCoords.direction === 'down') {
                coordinates.x -= this.increment;
                coordinates.pathParts.push(' -' + 0.2 * this.increment + '  ' + 0.2 * this.increment + ' ');
                coordinates.pathParts.push('l -' + 0.6 * this.increment + ' 0 ');
                coordinates.pathParts.push('l -' + 0.2 * this.increment + ' 0 ');
                coordinates.direction = 'left';
            }
            if (lastCoords.direction === 'left') {
                coordinates.y -= this.increment;
                coordinates.pathParts.push(' -' + 0.2 * this.increment + '  -' + 0.2 * this.increment + ' ');
                coordinates.pathParts.push('l 0 -' + 0.6 * this.increment + ' ');
                coordinates.pathParts.push('l 0 -' + 0.2 * this.increment + ' ');
                coordinates.direction = 'up';
            }
            if (lastCoords.direction === 'right') {
                coordinates.y += this.increment;
                coordinates.pathParts.push(' ' + 0.2 * this.increment + '  ' + 0.2 * this.increment + ' ');
                coordinates.pathParts.push('l 0 ' + 0.6 * this.increment + ' ');
                coordinates.pathParts.push('l 0 ' + 0.2 * this.increment + ' ');
                coordinates.direction = 'down';
            }
        }

        return coordinates;
    }


    /**
     * Generates a SVG path with starting point and direction commands.
     *
     * @param x start x
     * @param y start y
     * @param commands f/l/r (forward, left, right)
     */
    generatePath = (x: number, y: number, commands: string[]): coords => {

        let target: coords = {
            x: x,
            y: y,
            direction: 'up',
            pathParts: []
        };

        commands.forEach(dir => {
            target = this.nextCoordinates(target, dir);
        })

        target.pathParts.unshift(`M ${x} ${y} `)
        console.debug("generated path:", target.pathParts.join(' '));
        return target;
    }
}