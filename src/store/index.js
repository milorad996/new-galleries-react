import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import galleriesReducer from "./galleries/slice";
import authReducer from "./auth/slice";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        galleries: galleriesReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(
            {
                thunk: false,
                serializableCheck: false,
            }),

        sagaMiddleware,
    ],
});

for (const saga in sagas) {
    sagaMiddleware.run(sagas[saga]);
}

export default store;