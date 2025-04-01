import SequelizeClient from './index'
import * as models from '~/app/model'

const modelsObj: { [index: string]: any } = models
const allModel: any[] = []
const enable = SequelizeClient.enable()
if (enable) {
  for (const key in modelsObj) {
    const model = modelsObj[key].sync()
    allModel.push(model)
  }
}

console.log('✅',enable);
const setup = async () => {
  
  await Promise.all(allModel)
  await SequelizeClient.updateModel({ force: false, alter: true, logging: false })
}

export const initDB = enable ? () => setup() : () => {}
