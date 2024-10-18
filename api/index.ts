import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import swaggerUi from 'swagger-ui-express';
import errorHandler from '../src/middleware/errorHandler';
import userRoutes from '../src/route/userRoutes';
import { RegisterRoutes } from '../src/routes';
import swaggerDocument from '../src/swagger/swagger.json';

const app = express();

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
export default app;
