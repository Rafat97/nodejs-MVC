module.exports.before_default = () => {
  return ["middleware/test_middleware_before"];
};

module.exports.after_default = () => {
  return ["middleware/test_middleware_after"];
};
