import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .unique(async (db, value) => {
        const match = await db.from('products').select('id').where('name', value).first()
        return !match
      }),
    description: vine.string().trim(),
    price: vine.number().min(0),
    quantity: vine.number().min(0),
    discount: vine.number().min(0).max(100),
    images: vine.any().optional(),
  })
)

export const updateProductValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .unique(async (db, value) => {
        const match = await db.from('products').select('id').where('name', value).first()
        return !match
      })
      .optional(),
    description: vine.string().trim().optional(),
    price: vine.number().min(0).optional(),
    quantity: vine.number().min(0).optional(),
    discount: vine.number().min(0).max(100).optional(),
    images: vine.any().optional(),
    status: vine.boolean().optional(),
  })
)
