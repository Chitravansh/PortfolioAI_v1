// 1. Import the app from your server file
import app from '../server.js';

import serverless from "serverless-http";
// 2. Export it for Vercel
export default serverless(app);