const Todo = using("app/model/Todo/mongodb");
async function deleteTodo(req, res) {
  const { todo } = req.params || { todo: -1 };
  let response = {
    statusCode: 200,
  };
  try {
    const todoDoc = await Todo.findByIdAndDelete(todo);
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
    if (error.name === "ValidationError") {
      response = {
        ...response,
        error: error,
      };
    }
  }
  res.status(response.statusCode).send(response);
}

module.exports = deleteTodo;
