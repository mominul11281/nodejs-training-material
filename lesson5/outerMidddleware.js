const outerMiddleware = (req, res, next) => {
    console.log('This is outer middleware');
    next();
};

module.exports = outerMiddleware;