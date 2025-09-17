import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import app from './app.js';
<<<<<<< HEAD

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`SkyCRM backend listening on http://localhost:${PORT}`);
=======
import connectDB from './config/db.js';
import { ensureDefaultAdmin } from './utils/setupDefaultUser.js';

const PORT = process.env.PORT || 8000;

const start = async () => {
  await connectDB();
  await ensureDefaultAdmin();
  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(`SkyCRM backend listening on http://localhost:${PORT}`);
  });
};

start().catch(e => {
  console.error('Failed to start server', e);
  process.exit(1);
>>>>>>> 7014ba474bf99e218ee2c5a6a32fd6a5cc923b0e
});
