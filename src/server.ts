import 'express-async-errors';
import express from 'express';

import * as testController from './controller/test.controller';
import responseError from './middleware/response-error';

const app = express();
app.use(express.json())
app.get('/', testController.test);
app.use(responseError);

app.listen(3000, () => console.log('🚀'))