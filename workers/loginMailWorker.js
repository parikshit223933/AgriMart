const queue=require('../config/kue');
const authMailer=require('../mailers/authMailer');

queue.process('emails', function(job, done)
{
    console.log('Emails worker is processing a job!');
    authMailer.authMailer(job.data);
    done();
})