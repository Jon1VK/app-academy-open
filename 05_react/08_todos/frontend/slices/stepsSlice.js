import { createSlice } from '@reduxjs/toolkit';

const stepsSlice = createSlice({
  name: 'steps',
  initialState: {},
  reducers: {
    receiveSteps: (state, action) => {
      const steps = action.payload;
      return Object.fromEntries(steps.map((step) => [step.id, step]));
    },

    receiveStep: (state, action) => {
      const step = action.payload;
      state[step.id] = step;
    },

    removeStep: (state, action) => {
      const step = action.payload;
      delete state[step.id];
    },
  },
});

export const { receiveSteps, receiveStep, removeStep } = stepsSlice.actions;

export default stepsSlice.reducer;
