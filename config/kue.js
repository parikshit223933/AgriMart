const kue=require('kue');
const queue=kue.createQueue({
  redis: {
    port: 6379,
    host: 'redis-server',
  },
});

module.exports=queue;