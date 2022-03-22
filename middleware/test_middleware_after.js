module.exports = (app) => {
  app.use(function (req, res, next) {
    console.log(`After middleware calling`);
    next();
  });
};
