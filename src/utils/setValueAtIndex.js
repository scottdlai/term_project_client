const setValueAtIndex = (arr, i, f = (e) => e, g = (e) => e) =>
  arr.map((e, j) => (i === j ? f(e) : g(e)));

export default setValueAtIndex;
