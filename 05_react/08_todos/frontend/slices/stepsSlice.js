import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  1: {
    id: 1,
    title: 'walk to store',
    done: false,
    todo_id: 1,
  },
  2: {
    id: 2,
    title: 'buy soap',
    done: false,
    todo_id: 1,
  },
};

const stepsSlice = createSlice({
  name: 'steps',
  initialState,
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
      const stepId = action.payload;
      delete state[stepId];
    },

    toggleStepDone: (state, action) => {
      const stepId = action.payload;
      const done = state[stepId].done;
      state[stepId].done = !done;
    },
  },
});

export const { receiveSteps, receiveStep, removeStep, toggleStepDone } =
  stepsSlice.actions;

export default stepsSlice.reducer;

export const selectStepsByTodoId = (todoId) => (state) =>
  Object.values(state.steps).filter((step) => step.todo_id === todoId);
