import type { HttpContext } from '@adonisjs/core/http'

export default class CollectionsController {
  async index({}: HttpContext) {}

  async store({ request }: HttpContext) {}

  async show({ params }: HttpContext) {}

  async update({ }: HttpContext) {}

  async destroy({ params }: HttpContext) {}
}