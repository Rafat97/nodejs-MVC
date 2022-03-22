module.exports = (app) => {
  app.use(function (req, res, next) {
    console.log(`Before middleware calling`);
    next();
  });
};
