import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    username: vine.string().trim().normalizeEmail().unique(
      async (db, value) => {
        const match = await db.from('users').select('id').where('username', value).first()
        return !match
      }
    ),
    email: vine.string().trim().email().normalizeEmail().unique(
      async (db, value) => {
        const match = await db.from('users').select('id').where('username', value).first()
        return !match
      }
    ),
    password: vine.string().minLength(6).trim(),
  })
)
export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().normalizeEmail().unique(
      async (db, value) => {
        const match = await db.from('users').select('id').where('username', value).first()
        return !match
      }
    ),
    password: vine.string().minLength(6).trim(),
  })
)
