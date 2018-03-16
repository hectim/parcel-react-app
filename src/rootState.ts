import { DogState, InitialDogState } from './dog/reducer';

export const InitialState : RootState = {
  dog: InitialDogState
};

export type RootState = {
  // api: ApiState;
  dog: DogState;
};
