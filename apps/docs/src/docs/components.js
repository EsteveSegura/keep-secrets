
module.exports = {
    components:{
        schemas:{
            id:{
                type:'string',
                description:"An id of a secret",
                example: "4cba07a1-80c1-4591-81ea-53af529c89ea"
            },
            secretKey:{
                type:'string',
                description:"An decryption key of a secret",
                example: "babcd199618f46a05bf1916326758599bf1e43959e488975a74d50834c61c816"
            },
            Secret:{
                type:'object',
                properties:{
                    id:{
                        type:'string',
                        description:"Secret uuid",
                        example:"4cba07a1-80c1-4591-81ea-53af529c89ea"
                    },
                    secretKey:{
                        type:'string',
                        description:"Encryption key",
                        example:"0a82cec0b6a2aa09ddfb3e18237d7fa7813efe53440468ebca0e1e6c9a786387"
                    },
                }
            },
            SecretInput:{
                type:'object',
                properties:{
                    payload:{
                        type:'string',
                        description:"Plaintext to be encrypted",
                        example:"My super secret"
                    },
                    expireAt:{
                        type:"number",
                        description:"Minutes for the experation of the secret",
                        example:5
                    }
                }
            },
            SecretDecrypted:{
                type:'object',
                properties:{
                    payload:{
                        type:'string',
                        description:"Plaintext to be encrypted",
                        example:"My super secret"
                    },
                }
            },
            RequestError: {
                type: 'object',
                properties:{
                    errors:{
                        type: 'array',
                        description: "List of errors",
                        example: [{
                            "expireAt": "The value must not be empty"
                        },
                        {
                            "expireAt": "The value entered must be a number"
                        },
                        {
                            "expireAt": "The range must be between 1 and 43830"
                        }]
                    }
                }
            },
            ServerError:{
                type:'object',
                properties:{
                    message:{
                        type:'string',
                        description: "message error from server",
                        example: "Internal Sever Error"
                    }
                }
            },
            NotFoundError:{
                type:'object',
                properties:{
                    message:{
                        type:'string',
                        description: "message error from server",
                        example: "Secret not found"
                    }
                }
            }
        }
    }
}