const miscControllers = {};

miscControllers.catchAll = (req, res) => {
  res.status(404).json({
    message: 'Page not found!',
    success: false,
  });
};

module.exports = miscControllers;
