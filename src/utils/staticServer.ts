import serve from 'koa-static'
import path from 'path'

const staticServer = (UPLOAD_DIR: string = 'public/uploads/') => {
  const staticPath = path.resolve(process.cwd(), UPLOAD_DIR)
  return serve(staticPath, { index: false, maxAge: 86400000 })
}

export default staticServer
