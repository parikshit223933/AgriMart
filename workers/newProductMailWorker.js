const queue=require('../config/kue');
const newProductMailer=require('../mailers/newProductMailer');

queue.process('new_product_mailer', function(job, done)
{
    console.log('New Product Mailer is processing a job!');
    console.log(job.data);
    newProductMailer.newProductMailer(job.data);
    done();
})