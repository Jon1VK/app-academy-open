import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as APIUtil from '../util/steps_api_util';

export const fetchSteps = createAsyncThunk(
  'steps/fetchSteps',
  async () => await APIUtil.fetchSteps()
);

export const createStep = createAsyncThunk(
  'steps/createSteps',
  async (step, { rejectWithValue }) => {
    try {
      return await APIUtil.createStep(step);
    } catch (errors) {
      return rejectWithValue(errors);
    }
  }
);

export const toggleStepDone = createAsyncThunk(
  'steps/toggleStepDone',
  async (step) => await APIUtil.toggleStepDone(step)
);

export const deleteStep = createAsyncThunk(
  'steps/deleteStep',
  async (step) => await APIUtil.deleteStep(step)
);

const stepsSlice = createSlice({
  name: 'steps',
  initialState: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSteps.fulfilled, (state, action) => {
        const steps = action.payload;
        return Object.fromEntries(steps.map((step) => [step.id, step]));
      })
      .addCase(createStep.fulfilled, (state, action) => {
        const step = action.payload;
        state[step.id] = step;
      })
      .addCase(toggleStepDone.fulfilled, (state, action) => {
        const step = action.payload;
        state[step.id] = step;
      })
      .addCase(deleteStep.fulfilled, (state, action) => {
        const step = action.payload;
        delete state[step.id];
      });
  },
});

export default stepsSlice.reducer;

export const selectStepsByTodoId = (todoId) => (state) =>
  Object.values(state.steps).filter((step) => step.todo_id === todoId);
