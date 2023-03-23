module.exports = {
    get:{
        tags: ['Secrets Operations'],
        description: "Get Secret",
        operationId: "getSecret",
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                    $ref:"#/components/schemas/id"
                },
                required:true,
                description: "A single todo id"
            },
            {
                name:"secretKey",
                in:"path",
                schema:{
                    $ref:"#/components/schemas/secretKey"
                },
                required:true,
                description: "A decryption key for a secret"
            }
        ],
        responses:{
            '200':{
                description:"Todo is obtained",
                content:{
                    'application/json':{
                        schema:{
                            $ref:"#/components/schemas/SecretDecrypted"
                        }
                    }
                }
            },
            '404':{
                description: "Todo is not found",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/NotFoundError',
                        }
                    }
                }
            }
        }
    }
}