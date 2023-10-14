import http from 'http'
import { handleRequest } from './echo'

const server = http.createServer(handleRequest);

server.listen(3000, () => {
  console.log('Server started at http://localhost:3000')
})