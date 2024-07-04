import vine from '@vinejs/vine'

export const addProductToCartValidator = vine.compile(
  vine.object({
    productId: vine.number(),
    quantity: vine.number().min(1),
  })
)
