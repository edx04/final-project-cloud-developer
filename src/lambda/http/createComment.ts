import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateCommentRequest } from '../../requests/CreateTodoComment'
import { getUserId } from '../utils';
import { createComment } from '../../helpers/todos'


export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newComment: CreateCommentRequest = JSON.parse(event.body)
    const todoId = event.pathParameters.todoId
    // TODO: Implement creating a new TODO item
    console.log(newComment)
    const userId = getUserId(event)
    const spanishComment = await createComment(todoId,userId,newComment)
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
         comments:newComment.comments,
         esp: spanishComment
    })
  }
}
)

handler.use(
  cors({
    credentials: true
  })
)
