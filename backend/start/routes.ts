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

router.where('id', router.matchers.number())
router
  .group(() => {
    router.get('/', [UsersController, 'index']).use(middleware.pagination())
    router.get('/show/:id', [UsersController, 'show'])
    router.post('/create', [UsersController, 'store'])
    router.put('/update/:id', [UsersController, 'update'])
    router.delete('/destroy/:id', [UsersController, 'destroy'])
  })
  .prefix('/users')
