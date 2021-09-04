export default {
  sidebarMap: {
    1: {
      main: [
        {
          path: '/main/orders',
          icon: 'suncaper-menu-unfold',
          title: '订单管理',
          group: 'orders',
          children: [
            {
              path: '/main/orders/list',
              icon: 'suncaper-menu-unfold',
              title: '订单列表'
            }
          ]
        },
        {
          path: '/main/users',
          icon: 'suncaper-menu-unfold',
          title: '用户管理',
          group: 'users',
          children: [
            {
              path: '/main/users/list',
              icon: 'suncaper-menu-unfold',
              title: '用户列表'
            },
            {
              path: '/main/users/adminlist',
              icon: 'suncaper-menu-unfold',
              title: '管理员列表'
            },
            {
              path: '/main/users/useraddrlist',
              icon: 'suncaper-menu-unfold',
              title: '用户地址管理'
            }
          ]
        },
        {
          path: '/main/product',
          icon: 'suncaper-menu-unfold',
          title: '商品管理',
          group: 'product',
          children: [
            {
              path: '/main/product/category',
              icon: 'suncaper-menu-unfold',
              title: '商品分类'
            },
            {
              path: '/main/product/product',
              icon: 'suncaper-menu-unfold',
              title: '商品'
            },
            {
              path: '/main/product/productsales',
              icon: 'suncaper-menu-unfold',
              title: '商品总销量'
            },
            {
              path: '/main/second/second',
              icon: 'suncaper-menu-unfold',
              title: '商品今日销量'
            }
          ]
        }
      ]
    }
  },
  sidebarTheme: {
    dark: {
      background: '#1f2c35',
      text: '#ffffff',
      activeText: '#ffffff'
    },
    light: {
      background: '#ffffff',
      text: '#000000',
      activeText: '#1890ff'
    }
  }
}
