import fse from 'fs-extra'
import path from 'path'
import { getUploadDir } from './locaUpload'
import { UploadResult, File } from '~/typings/global'
const uploadChunk = async (file: File, UPLOAD_DIR: string) => {
  if (!file.originalFilename) return
  const fileNameArr = file.originalFilename.split('.')
  // 存放切片的目录
  const chunkDir = `${UPLOAD_DIR}${fileNameArr[0]}`
  if (!fse.existsSync(chunkDir)) {
    await fse.mkdirs(chunkDir)
  }
  const dPath = path.join(chunkDir, fileNameArr[1])
  await fse.move(file.filepath, dPath, { overwrite: true })
}

// 定义一个异步函数，用于合并文件
const fileMerge = async (fileName: string, UPLOAD_DIR: string) => {
  const fname = fileName.split('.')[0]

  const chunkDir = path.join(UPLOAD_DIR, fname)

  const chunks = await fse.readdir(chunkDir)

  const newPath = getUploadDir()

  chunks
    .sort((a, b) => a - b)
    .map((chunkPath) => {
      fse.appendFileSync(path.join(newPath, fileName), fse.readFileSync(`${chunkDir}/${chunkPath}`))
    })
  fse.removeSync(chunkDir)
  return `/${path.basename(newPath)}/${fileName}`
}
export { uploadChunk, fileMerge }
