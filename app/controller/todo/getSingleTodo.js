const Todo = using("app/model/Todo/mongodb");

async function getSingleTodo(req, res) {
  const { todo } = req.params || { todo: -1 };
  let response = {
    statusCode: 200,
  };
  try {
    const todoDoc = await Todo.findById(todo);
    if (!todoDoc) throw new Error("No data found");
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
  }
  res.status(response.statusCode).send(response);
}

module.exports = getSingleTodo;
