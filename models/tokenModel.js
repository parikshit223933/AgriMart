const mongoose=require('mongoose');
const reset_password_token_schema=new mongoose.Schema(
    {
        user:
        {
            ref:'User',
            type:mongoose.Schema.Types.ObjectId
        },
        accessToken:
        {
            type:String,
        },
        isValid:
        {
            type:Boolean,
        }
    },
    {
        timestamps:true,
    }
);
const token=mongoose.model('Token', reset_password_token_schema);
module.exports=token;