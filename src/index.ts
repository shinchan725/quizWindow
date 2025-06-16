// import express, { Request, Response } from 'express';
// import { examDetail } from './db/questionData';
// import cors from 'cors';

// const app = express();
// const port = process.env.PORT || 3001;

// app.use(cors({
//   origin:process.env.CORS_ORIGIN_URL,
//   credentials:true
// }));

// app.use(express.json()); 

// app.get('/questions', (req: Request, res: Response) => {
//   res.json(examDetail)
// });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

import express, { Request, Response } from 'express';
import { examDetail } from './db/questionData';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

// Use environment variable or fallback to specific origin
const corsOrigin = process.env.CORS_ORIGIN_URL || 'http://localhost:3000';

app.use(cors({
  origin: corsOrigin,
  credentials: true
}));

app.use(express.json()); 

app.get('/questions', (req: Request, res: Response) => {
  res.json(examDetail);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
