import { DogState, InitialDogState } from './dog/reducer';
import { GraphState, InitialGraphState } from './graph/reducer';

export const InitialState : RootState = {
  dog: InitialDogState,
  graph: InitialGraphState,
};

export type RootState = {
  dog: DogState;
  graph: GraphState;
};
