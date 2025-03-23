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
  if (!base64) {
    return ''
  }
  const outputDir = getUploadDir()
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const fileName = `${uuidv4()}.${getBase64FileType(base64)}`

  const filePath = path.join(outputDir, fileName)

  fs.writeFileSync(filePath, Buffer.from(base64, 'base64'))

  return `/${path.basename(outputDir)}/${fileName}`
}

// 判断base64文件类型
export const getBase64FileType = (base64: string): string => {
  let fileHeader = new Map()

  //获取不同文件的文件头前3个字作为判断依据
  fileHeader.set('/9j', 'JPG')
  fileHeader.set('iVB', 'PNG')
  fileHeader.set('Qk0', 'BMP')
  fileHeader.set('SUk', 'TIFF')
  fileHeader.set('JVB', 'PDF')
  fileHeader.set('UEs', 'OFD')

  let res = ''

  //遍历map中所提及的文件头特征
  fileHeader.forEach((v, k) => {
    if (k == base64.substring(0, 3)) {
      res = v
    }
  })

  //如果不在map中返回unknown file
  if (res == '') {
    res = 'PNG'
  }

  return res
}
