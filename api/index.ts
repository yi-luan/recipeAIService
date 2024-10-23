import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import console from 'console';
import process from 'process';
import swaggerUi from 'swagger-ui-express';
import errorHandler from '../src/middleware/errorHandler';
import userRoutes from '../src/route/userRoutes';
import { RegisterRoutes } from '../src/routes';
import swaggerDocument from '../src/swagger/swagger.json';

const app = express();
const port = process.env.PORT || 3001;

// 全局中間件
app.use(
	cors({
		origin: ['https://recipe-ai-gray.vercel.app', 'http://localhost:5173'], // 允許的前端域名
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 允許的 HTTP 方法
		allowedHeaders: ['Content-Type', 'Authorization'], // 允許的請求頭
		credentials: true, // 允許發送認證信息（如 cookies）
	})
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// 路由
app.use('/api', userRoutes);

// 錯誤處理中間件
app.use(errorHandler);

// 提供 Swagger UI
app.use('/docs', swaggerUi.serve, async (_req: express.Request, res: express.Response) => {
	return res.send(swaggerUi.generateHTML(await import('../src/swagger/swagger.json')));
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 使用生成的路由
RegisterRoutes(app);

app.get('/', (req, res) => {
	res.send('Hello from RecipeAI API!');
});

app.listen(port, () => {
	console.log(`服務運行在 http://localhost:${port}`);
	console.log(`Swagger 文檔可在 http://localhost:${port}/docs 查看`);
});

// 目前服務運行於那裡
console.log(`Server is running on port ${process.env.PORT}`);

export default app;
