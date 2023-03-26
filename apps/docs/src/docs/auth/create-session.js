
module.exports = {
  post: {
      tags: ['Auth Operations'],
      description: "Create Session",
      operationId: "createSession",
      parameters: [],
      requestBody: {
          content: {
              'application/json': {
                  schema: {
                      $ref: '#/components/schemas/ClientInput'
                  }
              }
          }
      },
      responses: {
          '200':{
              description:"Token Obtained",
              content:{
                  'application/json':{
                      schema:{
                          $ref:'#/components/schemas/AccessToken'
                      }
                  }
              }
          },
          '500': {
              description: 'Server Error',
              content:{
                  'application/json':{
                      schema:{
                          $ref:'#/components/schemas/ServerError'
                      }
                  }
              }
          },
          '400': {
              description: 'Bad Request',
              content:{
                  'application/json':{
                      schema:{
                          $ref:'#/components/schemas/RequestError'
                      }
                  }
              }
          }
      }
  }
}