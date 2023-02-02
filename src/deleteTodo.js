const { v4 } = require("uuid")
const AWS = require("aws-sdk")
const middy = require("@middy/core")
const httpJsonBodyParser = require("@middy/http-json-body-parser")

const deleteTodo = async (event) => {

const dynamodb = new AWS.DynamoDB.DocumentClient()
const {id} = event.pathParameters

await dynamodb.delete({
  TableName: "TodoTable",
  Key: {id}
}).promise()

  return {
    statusCode: 204,
    body: JSON.stringify({
        msg: "Todo Deleted successfully!"
    }),
  };
};
module.exports = {
  handler: middy(deleteTodo).use(httpJsonBodyParser())
}
