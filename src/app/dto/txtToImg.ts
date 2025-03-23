import type { SchemaProps } from './base'

export const textImgSchema: SchemaProps = {
  prompt: {
    type: 'string',
    required: true,
    description: '文本内容，用于生成图像的描述',
  },
  negative_prompt: {
    type: 'string',
    required: false,
    description: '负面文本内容，用于指定不希望出现在图像中的元素',
  },
  styles: {
    type: 'array',
    required: false,
    items: { type: 'string' },
    minItems: 1,
    description: '风格列表，用于指定图像的风格',
  },
  seed: {
    type: 'number',
    required: false,
    description: '随机种子，用于控制图像生成的随机性',
  },
  subseed: {
    type: 'number',
    required: false,
    description: '子种子，用于进一步控制图像生成的随机性',
  },
  subseed_strength: {
    type: 'number',
    required: false,
    description: '子种子强度，用于调整子种子对图像生成的影响',
  },
  seed_resize_from_h: {
    type: 'number',
    required: false,
    description: '从高度调整随机种子的尺寸',
  },
  seed_resize_from_w: {
    type: 'number',
    required: false,
    description: '从宽度调整随机种子的尺寸',
  },
  sampler_name: {
    type: 'string',
    required: false,
    description: '采样器名称，用于指定图像生成的采样器',
  },
  scheduler: {
    type: 'string',
    required: false,
    description: '调度器，用于控制图像生成的调度',
  },
  batch_size: {
    type: 'number',
    required: false,
    description: '批处理大小，用于指定一次生成的图像数量',
  },
  n_iter: {
    type: 'number',
    required: false,
    description: '迭代次数，用于指定图像生成的迭代次数',
  },
  steps: {
    type: 'number',
    required: false,
    description: '步骤数，用于指定图像生成的步骤数',
  },
  cfg_scale: {
    type: 'number',
    required: false,
    description: '配置比例，用于调整图像生成的配置比例',
  },
  width: {
    type: 'number',
    required: false,
    description: '图像宽度，用于指定生成的图像宽度',
  },
  height: {
    type: 'number',
    required: false,
    description: '图像高度，用于指定生成的图像高度',
  },
  restore_faces: {
    type: 'boolean',
    required: false,
    description: '是否恢复人脸，用于指定是否在生成图像时恢复人脸',
  },
  tiling: {
    type: 'boolean',
    required: false,
    description: '是否平铺，用于指定是否在生成图像时进行平铺',
  },
  do_not_save_samples: {
    type: 'boolean',
    required: false,
    description: '是否不保存样本，用于指定是否在生成图像时不保存样本',
  },
  do_not_save_grid: {
    type: 'boolean',
    required: false,
    description: '是否不保存网格，用于指定是否在生成图像时不保存网格',
  },
  eta: {
    type: 'number',
    required: false,
    description: 'ETA值，用于调整图像生成的ETA值',
  },
  denoising_strength: {
    type: 'number',
    required: false,
    description: '去噪强度，用于调整图像生成的去噪强度',
  },
  s_min_uncond: {
    type: 'number',
    required: false,
    description: '最小无条件值，用于调整图像生成的最小无条件值',
  },
  s_churn: {
    type: 'number',
    required: false,
    description: 'S Churn值，用于调整图像生成的S Churn值',
  },
  s_tmax: {
    type: 'number',
    required: false,
    description: 'S Tmax值，用于调整图像生成的S Tmax值',
  },
  s_tmin: {
    type: 'number',
    required: false,
    description: 'S Tmin值，用于调整图像生成的S Tmin值',
  },
  s_noise: {
    type: 'number',
    required: false,
    description: 'S Noise值，用于调整图像生成的S Noise值',
  },
  override_settings: {
    type: 'object',
    required: false,
    description: '覆盖设置，用于指定图像生成的覆盖设置',
  },
  override_settings_restore_afterwards: {
    type: 'boolean',
    required: false,
    description: '是否在生成后恢复设置，用于指定是否在生成图像后恢复设置',
  },
  refiner_checkpoint: {
    type: 'string',
    required: false,
    description: '精炼检查点，用于指定图像生成的精炼检查点',
  },
  refiner_switch_at: {
    type: 'number',
    required: false,
    description: '精炼切换点，用于指定图像生成的精炼切换点',
  },
  disable_extra_networks: {
    type: 'boolean',
    required: false,
    description: '是否禁用额外网络，用于指定是否在生成图像时禁用额外网络',
  },
  firstpass_image: {
    type: 'string',
    required: false,
    description: '首次通行图像，用于指定图像生成的首次通行图像',
  },
  comments: {
    type: 'object',
    required: false,
    description: '注释，用于指定图像生成的注释',
  },
  init_images: {
    type: 'array',
    required: false,
    items: { type: 'string' },
    minItems: 1,
    description: '初始图像列表，用于指定图像生成的初始图像列表',
  },
  resize_mode: {
    type: 'number',
    required: false,
    description: '调整大小模式，用于指定图像生成的调整大小模式',
  },
  image_cfg_scale: {
    type: 'number',
    required: false,
    description: '图像配置比例，用于调整图像生成的图像配置比例',
  },
  mask: {
    type: 'string',
    required: false,
    description: '遮罩，用于指定图像生成的遮罩',
  },
  mask_blur_x: {
    type: 'number',
    required: false,
    description: '遮罩模糊X，用于调整图像生成的遮罩模糊X',
  },
  mask_blur_y: {
    type: 'number',
    required: false,
    description: '遮罩模糊Y，用于调整图像生成的遮罩模糊Y',
  },
  mask_blur: {
    type: 'number',
    required: false,
    description: '遮罩模糊，用于调整图像生成的遮罩模糊',
  },
  mask_round: {
    type: 'boolean',
    required: false,
    description: '遮罩圆角，用于指定图像生成的遮罩是否为圆角',
  },
  inpainting_fill: {
    type: 'number',
    required: false,
    description: '图像填充，用于指定图像生成的图像填充',
  },
  inpaint_full_res: {
    type: 'boolean',
    required: false,
    description: '是否全分辨率图像修复，用于指定是否在生成图像时进行全分辨率图像修复',
  },
  inpaint_full_res_padding: {
    type: 'number',
    required: false,
    description: '全分辨率图像修复填充，用于调整图像生成的全分辨率图像修复填充',
  },
  inpainting_mask_invert: {
    type: 'number',
    required: false,
    description: '图像修复遮罩反转，用于调整图像生成的图像修复遮罩反转',
  },
  initial_noise_multiplier: {
    type: 'number',
    required: false,
    description: '初始噪声倍数，用于调整图像生成的初始噪声倍数',
  },
  latent_mask: {
    type: 'string',
    required: false,
    description: '潜在遮罩，用于指定图像生成的潜在遮罩',
  },
  force_task_id: {
    type: 'string',
    required: false,
    description: '强制任务ID，用于指定图像生成的强制任务ID',
  },
  sampler_index: {
    type: 'string',
    required: false,
    description: '采样器索引，用于指定图像生成的采样器索引',
  },
  include_init_images: {
    type: 'boolean',
    required: false,
    description: '是否包含初始图像，用于指定是否在生成图像时包含初始图像',
  },
  script_name: {
    type: 'string',
    required: false,
    description: '脚本名称，用于指定图像生成的脚本名称',
  },
  script_args: {
    type: 'array',
    required: false,
    items: { type: 'string' },
    minItems: 1,
    description: '脚本参数列表，用于指定图像生成的脚本参数列表',
  },
  send_images: {
    type: 'boolean',
    required: false,
    description: '是否发送图像，用于指定是否在生成图像时发送图像',
  },
  save_images: {
    type: 'boolean',
    required: false,
    description: '是否保存图像，用于指定是否在生成图像时保存图像',
  },
  alwayson_scripts: {
    type: 'object',
    required: false,
    description: '始终启用的脚本，用于指定图像生成的始终启用的脚本',
  },
  infotext: {
    type: 'string',
    required: false,
    description: '信息文本，用于指定图像生成的信息文本',
  },
}
