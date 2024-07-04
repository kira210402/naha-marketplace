/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import AuthController from '#controllers/auth_controller'
import StoresController from '#controllers/stores_controller'
import ProductsController from '#controllers/products_controller'
import CartsController from '#controllers/carts_controller'
import { EUserRole } from '../app/enums/EUserRole.js'
router.where('id', router.matchers.number())

router
  .group(() => {
    // auth routers
    router.post('/login', [AuthController, 'login'])
    router.post('/register', [AuthController, 'register'])
    router.delete('/logout', [AuthController, 'logout']).use(middleware.auth({ guards: ['api'] }))

    router
      .group(() => {
        // user routers
        router
          .group(() => {
            router
              .get('/', [UsersController, 'index'])
              .use(middleware.pagination())
              .use(middleware.author(EUserRole.ADMIN))
            router.get('/:id', [UsersController, 'show'])
            router.post('/', [UsersController, 'store'])
            router.put('/', [UsersController, 'update'])
            router.delete('/:id', [UsersController, 'destroy']).use(middleware.author(EUserRole.ADMIN))
            router.put('/:id', [UsersController, 'lockUser']).use(middleware.author(EUserRole.ADMIN))
          })
          .prefix('/users')

        // store routers
        router
          .group(() => {
            router.get('/', [StoresController, 'index']).use(middleware.pagination())
            router.get('/my', [StoresController, 'indexByUser'])
            router.get('/:id', [StoresController, 'show'])
            router.post('/', [StoresController, 'store'])
            router.put('/:id', [StoresController, 'update'])
            router.delete('/:id', [StoresController, 'destroy'])
          })
          .prefix('/stores')

        // product routers
        router
          .group(() => {
            router.get('/', [ProductsController, 'index']).use(middleware.pagination())
            router.get('/store/:storeId', [ProductsController, 'indexByStore'])
            router.get('/:id', [ProductsController, 'show'])
            router.post('/:storeId', [ProductsController, 'store'])
            router.put('/:id', [ProductsController, 'update'])
            router.delete('/:id', [ProductsController, 'destroy'])
          })
          .prefix('/products')

        router
          .group(() => {
            router.get('/', [CartsController, 'index']).use(middleware.pagination())
            router.post('/add-product', [CartsController, 'addProduct'])
            router.put('/', [CartsController, 'update'])
          })
          .prefix('/cart')
      })
      .use(middleware.auth({ guards: ['api'] }))
  })
  .prefix('/api/v1')
