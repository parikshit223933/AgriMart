const queue=require('../config/kue');
const checkoutMailer=require('../mailers/checkoutMailer');

queue.process('checkout_mailer_worker', (job, done)=>
{
    console.log('Checkout mailer worker is performing a job!');
    checkoutMailer.checkoutMailer(job.data);
    done();
})