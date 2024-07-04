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
            router.get('/', [UsersController, 'index']).use(middleware.pagination())
            router.get('/:id', [UsersController, 'show'])
            router.post('/', [UsersController, 'store'])
            router.put('/:id', [UsersController, 'update'])
            router.delete('/:id', [UsersController, 'destroy'])
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
      })
      .use(middleware.auth({ guards: ['api'] }))
  })
  .prefix('/api/v1')
