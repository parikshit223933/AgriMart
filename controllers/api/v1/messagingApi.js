const sendMessageMailer=require('../../../mailers/sendMessageMailer');
const selfMailWorker=require('../../../workers/selfMailWorker');
const queue=require('../../../config/kue');

module.exports=(req, res)=>
{
    if(!req.body.email|| !req.body.subject||!req.body.message)
    {
        return res.json(404, {
            success:false,
            message:'Some fields were missing in the input!'
        });
    }
    let job=queue.create('selfMailer', req.body).save((error)=>
    {
        if(error)
        {
            console.log(error);
            return res.json(500, {
                success:false,
                message:'Internal server error!'
            });
        }
        console.log(`Job is enqueued with job id ${job.id}`)
        return res.json(200, {
            success:true,
            data:{
                message:'Message Sent Successfully!'
            }
        })
    })
}
