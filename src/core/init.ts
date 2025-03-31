import type Koa from 'koa'
import cors from '@koa/cors'
import koaBody from 'koa-body'
import catchError from './exception'
import InitGlobal from './global'
import swaggerRouter from './swagger'
import { initDB } from './database/init'
import { staticServer, uploadServer } from '~/utils/staticServer'
export default class InitManager {
  private app: Koa

  constructor(app: Koa) {
    this.app = app
    this.initCore()
  }

  initCore() {
    InitGlobal.init() // global var and methods
    this.app.use(cors()) // cross-domain processing
    this.app.use(koaBody({ multipart: true })) // body parameter processing
    this.app.use(catchError) // global exception handling
    this._initRoutesAndSwagger() // router and api docs
    this.app.use(staticServer())
    this.app.use(uploadServer())
    initDB()
  }

  _initRoutesAndSwagger() {
    this.app.use(swaggerRouter.routes()).use(swaggerRouter.allowedMethods())
  }
}
