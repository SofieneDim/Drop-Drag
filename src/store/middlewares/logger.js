const logger = store => {
    return next => {
        return action => {
            return next(action);
        }
    }
}

export default logger;