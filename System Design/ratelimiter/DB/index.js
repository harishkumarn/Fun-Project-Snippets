const cassandra = require('cassandra-driver');

const client = new cassandra.Client({  localDataCenter: 'datacenter1',contactPoints: ['localhost'] });

client.connect()
  .then(() =>{
	client.execute('INSERT INTO USER_DETAILS (user_id, user_name, email, age) values(uuid(),"Harish Kumar","harishkr.1110@gmail.com",26);');
   }  )
.catch(err => console.error('Error connecting to Cassandra:', err));
