import Koa from 'koa'
import CONFIG from './config'
import InitManager from '~/core/init'
import { staticServer, uploadServer } from '~/utils/staticServer'

const app = new Koa()
new InitManager(app)

app.use(staticServer())
app.use(uploadServer())

app.listen(CONFIG.PORT, () => {
  console.log(`🌐 服务端口:${CONFIG.PORT}`)
  console.log(`✅ API接口文档${CONFIG.BASE_URL}:${CONFIG.PORT}${CONFIG.PREFIX}/doc.html`)
})
export default app
