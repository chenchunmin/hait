import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from '../views/Home.vue'
import Shopcar from '../views/Shopcar.vue'
import Users from '../views/Users.vue'
import Address from '../views/Address.vue'
import Index from '../views/Index.vue'
import GoodsDetail from '../views/GoodsDetail.vue'
import Goodslist from '../views/Goodslist.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Addaddress from '../views/Addaddress.vue'
import Editaddress from '../views/Editaddress.vue'
import Order from '../views/Order.vue'
import Orderdetail from '../views/Orderdetail.vue'
import Search from '../views/Search.vue'
import SearchResule from '../views/SearchResule.vue'

import 'nprogress/nprogress.css'
import nprogress from 'nprogress'
import store from '../store/index.js'
// 创建路由对象
const router = new VueRouter({
    routes: [
        {
            path: '/', redirect: '/home/index',

        },

        {
            path: '/home', component: Index,
            children: [
                {
                    path: 'index', component: Home, meta: { name: 'Home', isShowNavBar: false },
                    children: [
                        { path: 'search', component: Search, meta: { name: 'Search', isShowNavBar: false, } },
                    ]
                },
                { path: 'shopcar', component: Shopcar, meta: { name: 'Shopcar', pageTitle: '购物车', isShowNavBar: true, } },
                { path: 'users', component: Users, meta: { name: 'Users', isShowNavBar: false, requireAuth: true, } },
            ],
        },

        {
            path: '/address', component: Address,
            meta: { pageTitle: '地址管理', isShowNavBar: true, }
        },

        {
            path: '/addaddress', component: Addaddress,
            meta: { pageTitle: '添加地址', isShowNavBar: true, }
        },

        {
            path: '/editaddress/:addressInfo', component: Editaddress,
            meta: { pageTitle: '编辑地址', isShowNavBar: true, }
        },

        {
            path: '/goodsDetail/:id', component: GoodsDetail,
            props: true,
            meta: { pageTitle: '商品详情', isShowNavBar: true, }
        },

        {
            path: '/goodslist', component: Goodslist,
            meta: { pageTitle: '海淘超市', isShowNavBar: true, }
        },

        {
            path: '/login', component: Login,
            meta: { pageTitle: '用户登录', isShowNavBar: true, }
        },

        {
            path: '/register', component: Register,
            meta: { pageTitle: '用户注册', isShowNavBar: true, }
        },

        {
            path: '/order', component: Order,
            meta: { pageTitle: '我的订单', isShowNavBar: true, }
        },

        {
            path: '/orderdetail/:order_id', component: Orderdetail,
            meta: { pageTitle: '订单详情', isShowNavBar: true, }
        },

        {
            path: '/search-resule/:keyword', component: SearchResule,
            meta: { pageTitle: '搜索结果', isShowNavBar: false, }
        },

    ]
})


nprogress.configure({ showSpinner: false }); // 去掉圆圈加载
// 全局导航（针对所有路由）前守卫
router.beforeEach((to, from, next) => {
    // console.log('beforeEach')
    nprogress.start();
    // 判断访问的路由是否需要权限
    if (to.meta.requireAuth) {
        // 需要权限
        let token = store.state.token;
        if (token) {
            next();
        } else {
            // 获取上次访问页面,登录成功,在原来访问页面
            next({ path: '/login?redirect=' + to.fullPath });
        }
    } else {
        // 需要权限
        next();
    }
})
// 全局导航后守卫
router.afterEach((to, from) => {
    // console.log('afterEach')
    nprogress.done()
})

export default router;