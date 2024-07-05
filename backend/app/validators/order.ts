import vine from '@vinejs/vine'
import { EOrderPayment } from '../enums/EOrderPayment.js'

export const createOrderValidator = vine.compile(
  vine.object({
    cartItemId: vine.number(),
    payment: vine.enum([EOrderPayment.Cash, EOrderPayment.VNPay]),
    phoneNumber: vine
      .string()
      .trim()
      .minLength(10)
      .maxLength(11)
      .regex(/0\d{9,10}/),
    address: vine.string().trim(),
  })
)
