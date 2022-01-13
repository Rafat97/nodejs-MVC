const Todo = using("app/model/Todo/mongodb");

async function insertTodo(req, res) {
  let response = {
    statusCode: 200,
  };
  try {
    const todoDoc = Todo(req.body);
    await todoDoc.save();
    response = {
      ...response,
      todoDoc: todoDoc,
    };
  } catch (error) {
    response = {
      ...response,
      statusCode: 400,
      message: error.toString(),
    };
    if (error.name === "ValidationError") {
      response = {
        ...response,
        error: error,
      };
    }
  }
  res.status(response.statusCode).send(response);
}

module.exports = insertTodo;
