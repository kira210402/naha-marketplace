import Category from '#models/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  async index({ response }: HttpContext) {
    const categories = await Category.all()
    return response.ok({
      code: 200,
      message: "get all categories success",
      categories
    })
  }

  async store({ request, response }: HttpContext) {
    const { name } = request.body()
    const category = await Category.create({ name })
    return response.created({
      code: 201,
      message: "category created success",
      category,
    })
  }

  async show({ params, response }: HttpContext) {
    const category = await Category.find(params.id)
    return response.ok({
      code: 200,
      message: "get category success",
      category
    })
  }

  async update({ params, request, response }: HttpContext) {
    const { name } = request.body()
    const category = await Category.findOrFail(params.id)
    category.name = name
    await category.save()
    return response.ok({
      code: 200,
      message: "category update success",
      category
    })
  }

  async destroy({ params }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    await category.delete()
    return {
      code: 200,
      message: "category delete success",
    }
   }
}