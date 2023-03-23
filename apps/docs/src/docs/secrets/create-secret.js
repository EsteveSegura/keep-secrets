
module.exports = {
    post: {
        tags: ['Secrets Operations'],
        description: "Create Secret",
        operationId: "createSecret",
        parameters: [],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/SecretInput'
                    }
                }
            }
        },
        responses: {
            '200':{
                description:"Secret Obtained",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Secret'
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