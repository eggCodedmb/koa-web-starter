import type { SchemaProps } from './base'

export const textImgSchema: SchemaProps = {
  prompt: {
    type: 'string',
    required: true,
  },
  negative_prompt: {
    type: 'string',
    required: false,
  },
  styles: {
    type: 'array',
    required: false,
    items: { type: 'string' },
    minItems: 1,
  },
  seed: {
    type: 'number',
    required: false,
  },
  subseed: {
    type: 'number',
    required: false,
  },
  subseed_strength: {
    type: 'number',
    required: false,
  },
  seed_resize_from_h: {
    type: 'number',
    required: false,
  },
  seed_resize_from_w: {
    type: 'number',
    required: false,
  },
  sampler_name: {
    type: 'string',
    required: false,
  },
  scheduler: {
    type: 'string',
    required: false,
  },
  batch_size: {
    type: 'number',
    required: false,
  },
  n_iter: {
    type: 'number',
    required: false,
  },
  steps: {
    type: 'number',
    required: false,
  },
  cfg_scale: {
    type: 'number',
    required: false,
  },
  width: {
    type: 'number',
    required: false,
  },
  height: {
    type: 'number',
    required: false,
  },
  restore_faces: {
    type: 'boolean',
    required: false,
  },
  tiling: {
    type: 'boolean',
    required: false,
  },
  do_not_save_samples: {
    type: 'boolean',
    required: false,
  },
  do_not_save_grid: {
    type: 'boolean',
    required: false,
  },
  eta: {
    type: 'number',
    required: false,
  },
  denoising_strength: {
    type: 'number',
    required: false,
  },
  s_min_uncond: {
    type: 'number',
    required: false,
  },
  s_churn: {
    type: 'number',
    required: false,
  },
  s_tmax: {
    type: 'number',
    required: false,
  },
  s_tmin: {
    type: 'number',
    required: false,
  },
  s_noise: {
    type: 'number',
    required: false,
  },
  override_settings: {
    type: 'object',
    required: false,
  },
  override_settings_restore_afterwards: {
    type: 'boolean',
    required: false,
  },
  refiner_checkpoint: {
    type: 'string',
    required: false,
  },
  refiner_switch_at: {
    type: 'number',
    required: false,
  },
  disable_extra_networks: {
    type: 'boolean',
    required: false,
  },
  firstpass_image: {
    type: 'string',
    required: false,
  },
  comments: {
    type: 'object',
    required: false,
  },
  init_images: {
    type: 'array',
    required: false,
    items: { type: 'string' },
    minItems: 1,
  },
  resize_mode: {
    type: 'number',
    required: false,
  },
  image_cfg_scale: {
    type: 'number',
    required: false,
  },
  mask: {
    type: 'string',
    required: false,
  },
  mask_blur_x: {
    type: 'number',
    required: false,
  },
  mask_blur_y: {
    type: 'number',
    required: false,
  },
  mask_blur: {
    type: 'number',
    required: false,
  },
  mask_round: {
    type: 'boolean',
    required: false,
  },
  inpainting_fill: {
    type: 'number',
    required: false,
  },
  inpaint_full_res: {
    type: 'boolean',
    required: false,
  },
  inpaint_full_res_padding: {
    type: 'number',
    required: false,
  },
  inpainting_mask_invert: {
    type: 'number',
    required: false,
  },
  initial_noise_multiplier: {
    type: 'number',
    required: false,
  },
  latent_mask: {
    type: 'string',
    required: false,
  },
  force_task_id: {
    type: 'string',
    required: false,
  },
  sampler_index: {
    type: 'string',
    required: false,
  },
  include_init_images: {
    type: 'boolean',
    required: false,
  },
  script_name: {
    type: 'string',
    required: false,
  },
  script_args: {
    type: 'array',
    required: false,
    items: { type: 'string' },
    minItems: 1,
  },
  send_images: {
    type: 'boolean',
    required: false,
  },
  save_images: {
    type: 'boolean',
    required: false,
  },
  alwayson_scripts: {
    type: 'object',
    required: false,
  },
  infotext: {
    type: 'string',
    required: false,
  },
}
