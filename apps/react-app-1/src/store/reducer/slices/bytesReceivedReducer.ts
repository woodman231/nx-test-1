import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BytesReceivedState {
    value: number;
}

const initialState: BytesReceivedState = {
    value: 0,
};

export const bytesReceivedSlice = createSlice({
    name: "bytesReceived",
    initialState,
    reducers: {
        setBytesReceived: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
        incrementBytesReceived: (state) => {
            state.value += 1;
        }
    },
});

export const { setBytesReceived, incrementBytesReceived } = bytesReceivedSlice.actions;

export default bytesReceivedSlice.reducer;
