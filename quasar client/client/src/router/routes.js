
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'inicio', component: () => import('pages/Index.vue') },
      { path: 'caratulas', component: () => import('pages/caratulas/Index.vue') },
      { path: 'docmodelo', component: () => import('pages/relationshippCovertDoc/Index.vue') },
      { path: 'upload-image', component: () => import('pages/uploadsDocuments/Index.vue') },
      { path: 'add-image', component: () => import('pages/uploadsDocuments/Addnewdocument.vue') },
      { path: 'libros_diarios', component: () => import('pages/libros_diarios/Index.vue') },
      { path: 'memoriales_decretos', component: () => import('pages/memoriales&decretos/Index.vue') }
    ],
    redirect: { path: 'inicio' }
  },
   {
    path: '/login',
    component: () => import('layouts/MainLayoutLogin.vue'),
    children: [
      { path: '', component: () => import('pages/login_views/Index.vue') }
    ]
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
