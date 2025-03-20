import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { getUploadDir } from '~/utils/locaUpload'
/**
 * 将base64转文件
 * @param base64 - base64字符串.
 * @returns 返回文件路径.
 */
export const base64ToFile = (base64: string): string => {
  const outputDir = getUploadDir()
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const matches = base64

  const fileName = `${uuidv4()}`

  const filePath = path.join(outputDir, fileName)

  fs.writeFileSync(filePath, Buffer.from(matches, 'base64'))

  return `/${path.basename(outputDir)}/${fileName}`
}
