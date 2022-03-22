module.exports.before = () => {
  return ["middleware/test_middleware_before"];
};

module.exports.after = () => {
  return ["middleware/test_middleware_after"];
};
