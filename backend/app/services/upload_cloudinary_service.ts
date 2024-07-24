import cloudinary from '#config/cloudinary'
export const UploadCloudinary = {
  upload: async (file: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await cloudinary.uploader.upload(file.tmpPath, { folder: 'test' })
        console.log('file', file.tmpPath)
        resolve({ url: response.secure_url })
      } catch (error) {
        reject({ status: false, url: error.message })
      }
    })
  },

  uploadFiles: async (files: any[]) => {
    try {
      const uploadPromises = files.map((file) => {
        return new Promise(async (resolve, reject) => {
          try {
            const response = await cloudinary.uploader.upload(file.tmpPath, { folder: 'test' })
            resolve({ url: response.secure_url })
          } catch (error) {
            reject({ status: false, url: error.message })
          }
        })
      })
      const uploadResults = await Promise.all(uploadPromises)
      return { status: true, files: uploadResults }
    } catch (error) {
      return { status: false, message: error.message }
    }
  },
}
