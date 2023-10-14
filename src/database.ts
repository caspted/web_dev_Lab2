import { Client } from 'pg';

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'myfamilyisimportant',
  database: 'postgres',
});

client.connect();

export default client