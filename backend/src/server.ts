import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import app from './app';
import connectDB from './config/db';


const PORT = process.env.PORT || 4000;


async function start() {
try {
await connectDB(process.env.MONGO_URI || '');
const server = http.createServer(app);
server.listen(PORT, () => {
console.log(`Server listening on port ${PORT}`);
});
} catch (err) {
console.error('Failed to start server', err);
process.exit(1);
}
}


start();