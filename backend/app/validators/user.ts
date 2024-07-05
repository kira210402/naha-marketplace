import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .trim()
      .unique(async (db, value) => {
        const match = await db.from('users').select('id').where('username', value).first()
        return !match
      })
      .regex(/^[a-zA-Z0-9.\-_$@*!]{3,30}$/),
    email: vine
      .string()
      .trim()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const match = await db.from('users').select('id').where('email', value).first()
        return !match
      }),
    password: vine.string().minLength(6).trim(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .trim()
      .unique(async (db, value) => {
        const match = await db.from('users').select('id').where('username', value).first()
        return !match
      })
      .regex(/^[a-zA-Z0-9.\-_$@*!]{3,30}$/)
      .optional(),
    email: vine
      .string()
      .trim()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const match = await db.from('users').select('id').where('email', value).first()
        return !match
      })
      .optional(),
    password: vine.string().minLength(6).trim().optional(),
    avatar: vine.string().optional(),
    phoneNumber: vine.string().optional(),
    address: vine.string().optional(),
  })
)
