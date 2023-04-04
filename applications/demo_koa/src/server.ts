import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser'
import { logger } from './middlewares/logger';

const app = new Koa()

app.use(cors())
app.use(bodyParser())
app.use(logger())

app.use((ctx) => {
    ctx.body = 'hello the first koa application'
})

app.listen(3000)