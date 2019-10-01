import {
  NAME as axiosProgressIndicatorName,
  reducer as axiosProgressIndicatorReducer,
} from '../containers/AxiosProgressIndicator';

export class ReducerRegistry {
  constructor() {
    this.emitChange = null;

    this.reducers = {
      [axiosProgressIndicatorName]: axiosProgressIndicatorReducer,
    }; // register your default reducers here
  }

  getReducers() {
    return { ...this.reducers };
  }

  register(name, reducer) {
    this.reducers = { ...this.reducers, [name]: reducer };

    if (this.emitChange) {
      this.emitChange(this.getReducers());
    }
  }

  setChangeListener(listener) {
    this.emitChange = listener;
  }
}

const reducerRegistry = new ReducerRegistry();

export default reducerRegistry;
