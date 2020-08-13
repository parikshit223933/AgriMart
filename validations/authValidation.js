const Joi = require('@hapi/joi');

module.exports = {
    userRegisterValidation: async (data) => {
        const schema = Joi.object({
            name: Joi.string()
                        .min(3)
                        .max(20)
                        .required(),

            email: Joi.string()
                        .email() 
                        .required(),

            password: Joi.string()
                        .min(7)
                        .max(15)
                        .required(),

            confirmPass: Joi.ref('password') //matches with password
        })

        //return if given user registration details matches all requirement of schema
        return schema.validate(data);
    }
} 