const queue=require('../config/kue');
const signUpMailer=require('../mailers/signUpMailer');

queue.process('signUpMailer', function(job, done)
{
    console.log('signUpMailer worker is processing a job!');
    signUpMailer.signUpMailer(job.data);
    done();
})