const { v4 } = require("uuid")
const AWS = require("aws-sdk")
const middy = require("@middy/core")
const jsonBodyParser = require("@middy/http-json-body-parser")

const addTodo = async (event) => {

const dynamodb = new AWS.DynamoDB.DocumentClient()

const { todo } = event.body;
const createdAt = new Date().toISOString();
const id = v4();

console.log("This is an ID: ", id)

const newTodo = {
  id,
  todo,
  createdAt,
  completed: false
}

await dynamodb.put({
  TableName: "TodoTable",
  Item: newTodo
}).promise()

  return {
    statusCode: 201,
    body: JSON.stringify(newTodo),
  };
};
module.exports = {
  handler: middy(addTodo).use(jsonBodyParser())
}
