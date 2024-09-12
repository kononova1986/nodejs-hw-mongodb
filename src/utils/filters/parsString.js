const parseString = contactType => {
  const isString = typeof contactType === 'string';
  if (!isString) return;

  const isContactType = contactType =>
    ['work', 'home', 'personal'].includes(contactType);

  if (isContactType(contactType)) return contactType;
};
export default parseString;
