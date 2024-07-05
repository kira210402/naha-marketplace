import env from '#start/env'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: env.get('CLOUD_NAME'),
  api_key: env.get('CLOUD_KEY'),
  api_secret: env.get('CLOUD_SECRET'),
})
export default cloudinary
