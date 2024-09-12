import parseString from './parsString.js';

const parseContactFilterParams = ({ contactType }) => {
  const parsedContactType = parseString(contactType);
  return {
    contactType: parsedContactType,
  };
};

export default parseContactFilterParams;
