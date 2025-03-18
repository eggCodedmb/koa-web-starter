import fse from 'fs-extra'
import path from 'path'
const uploadChunk = async (file: File, UPLOAD_DIR: string) => {
  const fileNameArr = file.originalFilename.split('.')
  // 存放切片的目录
  const chunkDir = `${UPLOAD_DIR}${fileNameArr[0]}`
  if (!fse.existsSync(chunkDir)) {
    await fse.mkdirs(chunkDir)
  }
  const dPath = path.join(chunkDir, fileNameArr[1])
  await fse.move(file.filepath, dPath, { overwrite: true })
}

export default uploadChunk
