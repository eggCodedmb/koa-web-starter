import Koa from 'koa'
import CONFIG from './config'
import InitManager from '~/core/init'
import serve from 'koa-static'
const app = new Koa()
new InitManager(app)

app.use(serve('public/uploads'))// 静态资源
app.listen(CONFIG.PORT, () => {
  console.log(`API接口文档 ${CONFIG.BASE_URL}:${CONFIG.PORT}${CONFIG.PREFIX}/doc.html`)
})
export default app
