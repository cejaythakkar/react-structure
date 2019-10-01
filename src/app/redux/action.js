/**
 * Creates an action object with the given `type` identifier.
 * The action object has a toString() that returns the `type`,
 * which can be used as unique identifier in the reducer.
 *
 * @param {string} type The action name
 * @returns {Function|string} The action object
 */
export const createAction = type => {
  const creator = payload => ({ type, ...payload });
  creator.toString = () => type;
  return creator;
};

/**
 * Creates action objects based on a given list of propNames.
 * Each action object has a toString() that returns the format
 * `${name}/SET_${propName}`, which can be used as unique
 * identifier in the reducer.
 *
 * @param {string} name The action name prefix
 * @param {string[]} propNames The props to create setter actions for
 * @returns {Function[]|string[]} The action objects based on propNames
 */
export const createSetterActions = (name, propNames) =>
  propNames.map(propName => {
    const type = `${name}/SET_${propName}`;
    const creator = value => ({ type, value });
    creator.toString = () => type;
    return creator;
  });

export const createDistinctAction = type => {
  const creator = id => payload => ({ '@@id': id, type, ...payload });
  creator.toString = () => type;
  return creator;
};

export const createDistinctSetterActions = (name, propNames) =>
  propNames.map(propName => {
    const type = `${name}/SET_${propName}`;
    const creator = id => value => ({ '@@id': id, type, value });
    creator.toString = () => type;
    return creator;
  });
