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
import OrdersController from '#controllers/orders_controller'
import CategoriesController from '#controllers/categories_controller'
import CollectionsController from '#controllers/collections_controller'
router.where('id', router.matchers.number())

router
  .group(() => {
    // auth routers
    router.post('/login', [AuthController, 'login']).as('login')
    router.post('/register', [AuthController, 'register']).as('register')

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
            router.patch('/', [UsersController, 'update']).as('users.update')
            router
              .delete('/:id', [UsersController, 'destroy'])
              .as('users.destroy')
              .use(middleware.author(EUserRole.ADMIN))
            router
              .put('/:id', [UsersController, 'lockUser'])
              .as('users.lockUser')
              .use(middleware.author(EUserRole.ADMIN))
          })
          .prefix('/users')

        // store routers
        router
          .group(() => {
            router
              .get('/', [StoresController, 'index'])
              .as('stores.index')
              .use(middleware.pagination())
            router.get('/my', [StoresController, 'indexByUser']).as('stores.indexByUser')
            router.get('/:id', [StoresController, 'show']).as('stores.show')
            router
              .post('/', [StoresController, 'store'])
              .as('stores.store')
              .use(middleware.lockUser())
            router
              .put('/verify/:id', [StoresController, 'verify'])
              .as('stores.verify')
              .use(middleware.author(EUserRole.ADMIN))
            router
              .put('/', [StoresController, 'update'])
              .as('stores.update')
              .use(middleware.lockUser())
            router
              .get('/products', [StoresController, 'getListProductByStore'])
              .as('stores.getListProductByStore')
              .use(middleware.pagination())

            router
              .delete('/:id', [StoresController, 'destroy'])
              .as('stores.destroy')
              .use(middleware.lockUser())
          })
          .prefix('/stores')

        // cart routers
        router
          .group(() => {
            router
              .get('/', [CartsController, 'index'])
              .as('cart.index')
              .use(middleware.pagination())
            router
              .post('/add-product/:productId', [CartsController, 'addProduct'])
              .as('cart.addProduct')
            router.put('/', [CartsController, 'update']).as('cart.update')
            router.delete('/cart-item/:cartItemId', [CartsController, 'destroy']).as('cart.destroy')
          })
          .prefix('/cart')

        // order routers
        router
          .group(() => {
            router
              .get('/store', [OrdersController, 'indexByStore'])
              .as('orders.indexByStore')
              .use(middleware.pagination())
            router
              .get('/my', [OrdersController, 'indexByUser'])
              .as('orders.indexByUser')
              .use(middleware.pagination())
            router.put('/my/:id', [OrdersController, 'updateMyOrder']).as('orders.updateMyOrder')
            // router to update status of order of one of my stores
            router
              .put('/store/:storeId/order/:id', [OrdersController, 'updateStoreOrder'])
              .as('orders.updateStoreOrder')
            router.post('/', [OrdersController, 'store']).as('orders.store')
            router.get('/history', [OrdersController, 'getListOrderByUserId']).as('orders.history')
            router
              .patch('/:cartItemId/update-status', [OrdersController, 'updateMyOrder'])
              .as('orders.update-status')
            router
              .delete('/cancel/order-item/:id', [OrdersController, 'cancelOrderItemFromStore'])
              .as('orders.cancel')
          })
          .prefix('/orders')

        // category routers
        router
          .group(() => {
            router.get('/', [CategoriesController, 'index']).as('categories.index')
            router.get('/:id', [CategoriesController, 'show']).as('categories.show')
            router.post('/', [CategoriesController, 'store']).as('categories.store')
            router.put('/:id', [CategoriesController, 'update']).as('categories.update')
            router.delete('/:id', [CategoriesController, 'destroy']).as('categories.destroy')
          })
          .prefix('/categories')
          .use(middleware.author(EUserRole.ADMIN))

        // collection routers
        router
          .group(() => {
            router.get('/', [CollectionsController, 'index']).as('collections.index')
            router.get('/:id', [CollectionsController, 'show']).as('collections.show')
            router.post('/', [CollectionsController, 'store']).as('collections.store')
            router.put('/:id', [CollectionsController, 'update']).as('collections.update')
            router.delete('/:id', [CollectionsController, 'destroy']).as('collections.destroy')
            router
              .put('/:id/add-product', [CollectionsController, 'addProduct'])
              .as('collections.addProduct')
            router
              .delete('/:id/remove-product/:productId', [CollectionsController, 'removeProduct'])
              .as('collections.removeProduct')
          })
          .prefix('/collections')
      })
      .use(middleware.auth({ guards: ['api'] }))
    router
      .group(() => {
        router
          .get('/', [ProductsController, 'index'])
          .as('products.index')
          .use(middleware.pagination())
        router.get('/:id', [ProductsController, 'show']).as('products.show')
        router.get('/top-discount', [ProductsController, 'getTopDiscount'])
        router
          .post('/create', [ProductsController, 'store'])
          .as('products.store')
          .use(middleware.lockUser())
          .use(middleware.auth({ guards: ['api'] }))
        router
          .patch('/:id', [ProductsController, 'update'])
          .as('products.update')
          .use(middleware.lockUser())
          .use(middleware.auth({ guards: ['api'] }))
        router
          .delete('/:id', [ProductsController, 'destroy'])
          .as('products.destroy')
          .use(middleware.lockUser())
          .use(middleware.auth({ guards: ['api'] }))
        router.get('/search', [ProductsController, 'search']).as('products.search')
      })
      .prefix('/products')
  })
  .prefix('/api/v1')
