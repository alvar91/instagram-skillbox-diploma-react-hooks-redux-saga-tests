// Core
import { compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

const logger = createLogger({
    duration:  true,
    collapsed: true,
    colors:    {
        title:     () => '#139BFE',
        prevState: () => '#1C5FAF',
        action:    () => '#149945',
        nextState: () => '#A47104',
        error:     () => '#ff0005',
    },
});
const sagaMiddleware = createSagaMiddleware();

const middleware = [ sagaMiddleware ];
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers
    = process.env.NODE_ENV === 'development' && devtools ? devtools : compose;

if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
}

export { middleware, sagaMiddleware, composeEnhancers };
