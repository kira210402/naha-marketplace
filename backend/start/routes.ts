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
    router.post('/login', [AuthController, 'login']).as('login')
    router.post('/register', [AuthController, 'register']).as('register')
    router.delete('/logout', [AuthController, 'logout']).as('logout').use(middleware.auth({ guards: ['api'] }))

    router
      .group(() => {
        // user routers
        router
          .group(() => {
            router
              .get('/', [UsersController, 'index'])
              .as('users.index')
              .use(middleware.pagination())
              .use(middleware.author(EUserRole.ADMIN))
            router.get('/:id', [UsersController, 'show']).as('users.show')
            router.post('/', [UsersController, 'store']).as('users.store').use(middleware.author(EUserRole.ADMIN))
            router.put('/', [UsersController, 'update']).as('users.update')
            router.delete('/:id', [UsersController, 'destroy']).as('users.destroy').use(middleware.author(EUserRole.ADMIN))
            router.put('/:id', [UsersController, 'lockUser']).as('users.lockUser').use(middleware.author(EUserRole.ADMIN))
          })
          .prefix('/users')

        // store routers
        router
          .group(() => {
            router.get('/', [StoresController, 'index']).as('stores.index').use(middleware.pagination())
            router.get('/my', [StoresController, 'indexByUser']).as('stores.indexByUser')
            router.get('/:id', [StoresController, 'show']).as('stores.show')
            router.post('/', [StoresController, 'store']).as('stores.store').use(middleware.lockUser())
            router.put('/:id', [StoresController, 'update']).as('stores.update').use(middleware.lockUser())
            router.delete('/:id', [StoresController, 'destroy']).as('stores.destroy').use(middleware.lockUser())
          })
          .prefix('/stores')

        // product routers
        router
          .group(() => {
            router.get('/', [ProductsController, 'index']).as('products.index').use(middleware.pagination())
            router.get('/store/:storeId', [ProductsController, 'indexByStore']).as('products.indexByStore')
            router.get('/:id', [ProductsController, 'show']).as('products.show')
            router.post('/:storeId', [ProductsController, 'store']).as('products.store').use(middleware.lockUser())
            router.put('/:id', [ProductsController, 'update']).as('products.update').use(middleware.lockUser())
            router.delete('/:id', [ProductsController, 'destroy']).as('products.destroy').use(middleware.lockUser())
          })
          .prefix('/products')

        router
          .group(() => {
            router.get('/', [CartsController, 'index']).as('cart.index').use(middleware.pagination())
            router.post('/add-product', [CartsController, 'addProduct']).as('cart.addProduct')
            router.put('/', [CartsController, 'update']).as('cart.update')
          })
          .prefix('/cart')
      })
      .use(middleware.auth({ guards: ['api'] }))
  })
  .prefix('/api/v1')
