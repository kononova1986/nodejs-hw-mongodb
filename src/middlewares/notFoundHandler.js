const notFoundHandler = (req, res) => {
  res.status(404).json({
    message: `No found`,
  });
};
export default notFoundHandler;
