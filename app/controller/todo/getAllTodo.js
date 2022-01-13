const Todo = using("app/model/Todo/mongodb");

async function getAllTodo(req, res) {
  const resultsPerPage = 5;
  let page = req.query.page >= 1 ? req.query.page : 1;
  page = page - 1;
  let response = {
    statusCode: 200,
  };
  try {
    const todoDoc = await Todo.find().sort({ createdAt: "desc" });
    //   .limit(resultsPerPage)
    //   .skip(resultsPerPage * page);
    const count = await Todo.countDocuments();
    response = {
      ...response,
      todoDocCount: count,
      todoDoc: todoDoc,
    };
  } catch (error) {
    response = {
      ...response,
      statusCode: 400,
      message: error.toString(),
    };
  }
  res.status(response.statusCode).send(response);
}

// const { Sequelize, Model, DataTypes } = require("sequelize");

// const mysql_string = process.env.MYSQL_HOST || null;
// const sequelize = new Sequelize(mysql_string);

// async function getAllTodoSql(req, res) {
//   const resultsPerPage = 5;
//   let page = req.query.page >= 1 ? req.query.page : 1;
//   page = page - 1;
//   let response = {
//     statusCode: 200,
//   };
//   try {
//     await sequelize.authenticate();
//     console.log(req);
//   } catch (error) {
//     response = {
//       ...response,
//       statusCode: 400,
//       message: error.toString(),
//     };
//   }
//   res.status(response.statusCode).send(response);
// }

module.exports = getAllTodo;
