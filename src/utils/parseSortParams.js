import { SORT_ORDER } from '../constants/index.js';

const parseSortParams = ({ sortBy, sortFilds, sortOrder }) => {
  const parseSortOrder = SORT_ORDER.includes(sortOrder)
    ? sortOrder
    : SORT_ORDER[0];
  const parseSortby = sortFilds.includes(sortBy) ? sortBy : '_id';

  return {
    sortBy: parseSortby,
    sortOrder: parseSortOrder,
  };
};
export default parseSortParams;
