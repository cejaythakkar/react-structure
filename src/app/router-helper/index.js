import qs from 'query-string';

const getSearchParams = location => qs.parse(location.search);

const setSearch = (history, params) => {
  history.replace(`${history.location.pathname}?${qs.stringify(params)}`);
};

const setPartialSearch = (history, params) => {
  const currentParams = getSearchParams(history.location);
  const newParams = { ...currentParams, ...params };
  setSearch(history, newParams);
};

export default { getSearchParams, setSearch, setPartialSearch };
