const queue=require('../config/kue');
const sendMessageMailer=require('../mailers/sendMessageMailer')
queue.process('selfMailer', function(job, done)
{
    console.log('Self Mailer Is Processing A Job!');
    sendMessageMailer.sendMessageMailer(job.data);
    done();
})