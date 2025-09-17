import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import app from './app.js';
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
});
