const queue=require('../config/kue');
const tokenMailer=require('../mailers/tokenMailer');

queue.process('forgot_password', (job, done)=>
{
    console.log('Forgot password mailer is processing a task!');
    tokenMailer.tokenMailer(job.data);
    done();
})