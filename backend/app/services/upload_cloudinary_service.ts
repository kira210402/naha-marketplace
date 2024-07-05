import cloudinary from '#config/cloudinary'
export const UploadCloudinary = {
  upload: async (file: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await cloudinary.uploader.upload(file.tmpPath, { folder: 'test' })
        resolve({ url: response.secure_url })
      } catch (error) {
        reject({ status: false, url: error.message })
      }
    })
  },
}
