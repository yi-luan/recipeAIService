import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import console from 'node:console';
import process from 'node:process';
import swaggerUi from 'swagger-ui-express';
import errorHandler from './middleware/errorHandler';
import userRoutes from './route/userRoutes';
import { RegisterRoutes } from './routes';

const app = express();
const port = process.env.PORT || 3001;

// 全局中間件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// 路由
app.use('/api', userRoutes);

// 錯誤處理中間件
app.use(errorHandler);

// 提供 Swagger UI
app.use('/docs', swaggerUi.serve, async (_req: express.Request, res: express.Response) => {
	return res.send(swaggerUi.generateHTML(await import('./swagger/swagger.json')));
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
	console.log(`服務器運行在 http://localhost:${port}`);
	console.log(`Swagger 文檔可在 http://localhost:${port}/docs 查看`);
});

// 使用生成的路由
RegisterRoutes(app);
