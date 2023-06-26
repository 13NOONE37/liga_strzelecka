const filterArrayOfObjects = (array, property, direction) => {
  if (direction === 'asc') {
    return array.sort((a, b) => {
      if (typeof a[property] === 'number' && typeof b[property] === 'number') {
        return a[property] - b[property];
      } else if (
        typeof a[property] === 'string' &&
        typeof b[property] === 'string'
      ) {
        return a[property].localeCompare(b[property]);
      }
    });
  } else if (direction === 'desc') {
    return array.sort((a, b) => {
      if (typeof a[property] === 'number' && typeof b[property] === 'number') {
        return b[property] - a[property];
      } else if (
        typeof a[property] === 'string' &&
        typeof b[property] === 'string'
      ) {
        return b[property].localeCompare(a[property]);
      }
    });
  }
  return array;
};
export default filterArrayOfObjects;
