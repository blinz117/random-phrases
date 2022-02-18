import { v4 as uuid } from 'uuid';

export const generateId = () => {
  return uuid();
};

export const generateMapWithIdsForListItems = (list) => {
  const map = new Map();

  list.forEach((item) => {
    map.set(generateId(), item);
  });

  return map;
};
