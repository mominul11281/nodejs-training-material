// const EventEmitter = require('events');
const football = require('./football');

// const event = new EventEmitter();

// First examples without class
// eventEmitter.addListener('gameover', () => {
//     console.log('something else');
// });

// event.on('gameover', () => {
//     console.log('all the players stop playing');
// });

// console.log('Referee gives whistle!');
// eventEmitter.emit('gameover');
// football.gameover();

//examples with class

football.on('firstHalf', ({time, status}) => {
    if (status === 'start') {
        console.log(`${time} game begins`);
    }
});

football.on('halfTime', ({ time, status }) => {
    if (status === 'start') {
        console.log(`${time} game begins`);
    } else {
        console.log(`${time} break begins. All players goes on break`);
    }
});

football.on('secondHalf', ({ time, status }) => {
    if (status === 'start') {
        console.log(`${time} game begins`);
    }
});

football.on('gameover', () => {
        console.log('The time is up. All player stops playing');
});


football.startGame();
setTimeout(() => {
    football.halfTime();
}, 2000);
setTimeout(() => {
    football.secondHalf();
}, 3000);
setTimeout(() => {
    football.gameover();
}, 5000);