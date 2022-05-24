const EventEmitter = require("events");

// const event = new EventEmitter();

// function gameover() {
//     console.log('Referee gives whistle!!');
//     event.emit('gameover');
// }

// module.exports = {gameover};

class Football extends EventEmitter{
    startGame() {
        console.log('Starting the game');
        this.emit('firstHalf', {
            time: '1st half',
            status: 'start'
        })
    }

    halfTime() {
        this.emit('halfTime', {
            time: 'Half',
            status: 'break'
        });
    }

    secondHalf() {
        this.emit('secondHalf', {
            time: '2nd half',
            status: 'start'
        });
    }

    gameover() {
        console.log('Referee gives whistle!!');
        this.emit('gameover');
    }
}

module.exports = new Football();