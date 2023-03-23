module.exports = {
  delete: {
    tags: ['Secrets Operations'],
    description: "Delete Secret",
    operationId: "deleteSecret",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id"
        },
        required: true,
        description: "A single todo id"
      },
      {
        name: "secretKey",
        in: "path",
        schema: {
          $ref: "#/components/schemas/secretKey"
        },
        required: true,
        description: "A decryption key for a secret"
      }
    ],
    responses: {
      '201': {
        description: "Secret is obtained",
      },
      '500': {
        description: 'Server Error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ServerError'
            }
          }
        }
      },
      '404': {
        description: "Secret is not found",
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/NotFoundError',
            }
          }
        }
      }
    }
  }
}