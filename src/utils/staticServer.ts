import serve from 'koa-static'
import path from 'path'
import { koaBody } from 'koa-body'

export const staticServer = (UPLOAD_DIR: string = 'public/uploads/') => {
  const staticPath = path.resolve(process.cwd(), UPLOAD_DIR)
  return serve(staticPath, { index: false, maxAge: 86400000 })
}

export const uploadServer = (UPLOAD_DIR: string = 'public/uploads/') => {
  return koaBody({
    multipart: true,
    formidable: {
      maxFieldsSize: 1024 * 1024 * 1024,
    },
  })
}
