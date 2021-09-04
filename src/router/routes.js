const loginPage = [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '../pages/login/Login')
  }
]

const mainPage = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/main',
    name: 'main',
    component: () =>
      import(/* webpackChunkName: "Main" */ '../pages/main/Main'),
    redirect: 'main/product/productsales',
    children: [
      {
        path: 'orders/list',
        name: 'orderlist',
        component: () =>
            import(
              /* webpackChunkName: "First" */ '../pages/main/routes/orders/OrderList'
            )
      },
      {
        path: 'users/list',
        name: 'userlist',
        component: () =>
            import(
              /* webpackChunkName: "First" */ '../pages/main/routes/users/UserList'
            )
      },
      {
        path: 'users/adminlist',
        name: 'adminlist',
        component: () =>
            import(
              /* webpackChunkName: "First" */ '../pages/main/routes/users/AdminList'
            )
      },
      {
        path: 'users/useraddrlist',
        name: 'useraddrlist',
        component: () =>
            import(
              /* webpackChunkName: "First" */ '../pages/main/routes/users/UserAddrList'
            )
      },
      {
        path: 'product/category',
        name: 'productcategory',
        component: () =>
                import(
                  /* webpackChunkName: "First" */ '../pages/main/routes/product/ProductCategory'
                )
      },
      {
        path: 'product/product',
        name: 'product',
        component: () =>
                import(
                  /* webpackChunkName: "First" */ '../pages/main/routes/product/Product'
                )
      },
      {
        path: 'product/productsales',
        name: 'productsales',
        component: () =>
                import(
                /* webpackChunkName: "First" */ '../pages/main/routes/product/ProductSales'
                )
      },
      {
        path: 'second/second',
        name: 'second',
        component: () =>
                import(
                /* webpackChunkName: "First" */ '../pages/main/routes/second/Second'
                )
      }

    ]
  }
]

const errorPage = [
  {
    path: '/notFound',
    name: 'notFound',
    component: () =>
      import(/* webpackChunkName: "NotFound" */ '../pages/error/NotFound')
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: () =>
      import(/* webpackChunkName: "Forbidden" */ '../pages/error/Forbidden')
  },
  {
    path: '/badGateway',
    name: 'badGateway',
    component: () =>
      import(/* webpackChunkName: "BadGateway" */ '../pages/error/BadGateway')
  },
  {
    path: '*',
    redirect: '/notFound'
  }
]
export default [...loginPage, ...mainPage, ...errorPage]
