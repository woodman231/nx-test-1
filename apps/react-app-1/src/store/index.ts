import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import { streamingDataApi } from "./reducer/api";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(streamingDataApi.middleware);
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;