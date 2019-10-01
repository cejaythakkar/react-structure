## Your Project redux logic

All redux logic should be put inside feature package next to component that is using it. If package is using redux it must export reducer and `NAME` constant (unique per feature). It can also export actions and selectors required to communicate between related features.

The reason for it is that practice shows that having centralized place for all redux related logic inflates the project and makes it really hard to navigate. Our goal is to make redux logic as modular as react components are.

Export `NAME` constant defines the property on which to mount package reducer. It should be unique per package. `NAME` constant inside a package is used to access reducer properties. E.g. `state[NAME].value`

```javascript
// my-feature/index.js

// (Optional)
export const setValue = createAction(`${NAME}/SET_VALUE`);

// Required
export const NAME = "my-feature";
export const reducer = createReducer(
  { value: "initial value" },
  {
    [setValue]: (state, { value }) => ({ ...state, value })
  }
);

// (Optional)
export const getValue = state => state[NAME].value;
```

Each feature reducer should be available through `NAME` key in root reducer.

```javascript
// app/store.js

const store = createStore(
  combineReducers({ [myFeature.NAME]: myFeature.reducer })
);
```

# Actions

There are two types of actions. Setter actions and thunk actions.
* *Setter actions* set reducer value. Use `createSetterActions` for creating setter actions.
* *Thunk actions* encapsulate all app side-effects. Combine setter actions with various side-effects (e.g. request to the server, browser location changes, other thunks actions) in thunk actions.

The reason behind action creator helpers is to reduce as much boilerplate as possible and make code easy to reason and understand.

- `createSetterActions`
  Creates setter action creators for given array of action names. Setter action creator dispatches action with given action name.

```javascript
// my-feature/actions.js

export const [setValue, setAnotherValue] = createSetterActions(NAME, [
  "VALUE",
  "ANOTHER_VALUE"
]);

// dispatches ({ type: 'my-feature/SET_VALUE', value: 'value' })
store.dispatch(setValue("value"));
```

- `createAction`
  Creates action creator for given action name. You can pass to be used in reducer.

```javascript
// my-feature/actions.js

export const resetAllValues = createAction(`${NAME}my-feature/RESET_ALL_VALUES`);

// dispatches ({ type: 'my-feature/RESET_ALL_VALUES', value: 1 })
store.dispatch(resetAllValues({ value: 1 }));
```

DON'T:

- create separate file for action types. E.g.

```javascript
// my-feature/action-types.js

export const ACTION_TYPES = {
  SET_VALUE: "my-feature/SET_VALUE"
};
```

- create custom actions for changing reducer value, use `createAction` and `createSetterActions` instead.

# Reducers

Feature should export single reducer. To reduce boilerplate when creating reducer, use `createReducer` and `createSetter` helpers.

- `createReducer`
  Creates reducer from given map of actions -> handler. Provide action as a map key and handler as key value. Handler expects function `(state, { ...action }) => {}`.

```javascript
// my-feature/reducer.js

const initialState = {
  value: null
};

Global redux store will be placed here.

export default createReducer(
  { ...initialState },
  {
    [action]: createSetter("value")
  }
);

 If you want to lazily load reducer,
 
 
 example to invoke reducer run time.

component name : Login.jsx

- connect to redux store to get values and dispatch actions.

  import reducerRegistry from './reducer-registry'; // it's in root dir

  // register your reducer 
  // arguments 
  /**
   * NAME : Name of reducer,
   * reducer: reducer function e.g. export default  (state = {} , action) => state;
   * */
  reducerRegistry.register(NAME, reducer);

```

- `createSetter`
  Creates handler for given property. Handler sets the value in the state according to given path.

```javascript
// my-feature/reducer.js

const initialState = {
  value: null
};

export default createReducer(
  { ...initialState },
  {
    [actions.setValue]: createSetter("value", "a", "b")
  }
);

// New state: { 'my-feature': { value: { a: { b: 1 } } } }
store.dispatch(actions.setValue(1));
```

# Selectors

Each reducer value should be reachable by corresponding selector. Use `createSelectors` to create selectors.

- `createSelectors`
  Creates selectors for given array of properties. We need to provide package name to figure out where exactly is state located.

```javascript
// my-feature/selectors.js

export const [getValue] = createSelectors(NAME, ["value"]);
```
