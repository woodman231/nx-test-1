import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface DataReceivedState {
    value: string;
}

const initialState: DataReceivedState = {
    value: "",
};

export const dataReceivedSlice = createSlice({
    name: "dataReceived",
    initialState,
    reducers: {
        setDataReceived: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { setDataReceived } = dataReceivedSlice.actions;

export default dataReceivedSlice.reducer;