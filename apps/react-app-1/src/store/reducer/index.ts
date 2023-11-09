import { combineReducers } from "@reduxjs/toolkit";
import bytesToReceiveReducer from "./slices/bytesToReceiveReducer";
import bytesReceivedReducer from "./slices/bytesReceivedReducer";
import dataReceivedReducer from "./slices/dataReceivedReducer";
import { streamingDataApi } from "./api";

const rootReducer = combineReducers({
  bytesToReceive: bytesToReceiveReducer,
  bytesReceived: bytesReceivedReducer,
  dataReceived: dataReceivedReducer,
  [streamingDataApi.reducerPath]: streamingDataApi.reducer
});

export default rootReducer;