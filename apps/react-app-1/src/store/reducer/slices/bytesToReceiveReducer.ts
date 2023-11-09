import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BytesToReceiveState {
    value: number;
}

const initialState: BytesToReceiveState = {
    value: 0,
};

export const bytesToReceiveSlice = createSlice({
    name: "bytesToReceive",
    initialState,
    reducers: {
        setBytesToReceive: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const { setBytesToReceive } = bytesToReceiveSlice.actions;

export default bytesToReceiveSlice.reducer;
