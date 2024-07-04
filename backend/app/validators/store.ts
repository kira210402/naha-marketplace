import vine from '@vinejs/vine'

export const createStoreValidator = vine.compile(
  vine.object({
    name: vine.string().trim().unique(
      async (db, value) => {
        const match = await db.from('users').select('id').where('username', value).first()
        return !match
      }
    ),
    description: vine.string().trim(),
    phoneNumber: vine
      .string()
      .trim()
      .minLength(10)
      .maxLength(11)
      .regex(/0\d{9,10}/),
    address: vine.string().trim(),
    avatar: vine.string().activeUrl().trim().optional(),
  })
)

export const updateStoreValidator = vine.compile(
  vine.object({
    name: vine.string().trim().unique(async (db, value) => {
      const match = await db.from('users').select('id').where('username', value).first()
      return !match
    }).optional(),
    description: vine.string().trim().optional(),
    phoneNumber: vine
      .string()
      .trim()
      .minLength(10)
      .maxLength(11)
      .regex(/0\d{9,10}/)
      .optional(),
    address: vine.string().trim().optional(),
    avatar: vine.string().activeUrl().trim().optional(),
  })
)
