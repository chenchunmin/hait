import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

// 创建仓库对象
const store = new Vuex.Store({
    state: {
        // [{商品id,选中状态,数量,价格},{}]
        carData: [],
        token: '',
        userInfo: {},
    },
    mutations: {
        // 设置token
        setToken(state, token) {
            state.token = token;
        },
        // 设置用户信息
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        clearUserInfo(state) {
            state.token = '';
            state.userInfo = '';
            state.carData = [];
        },
        addGoodsToCar(state, good) {
            // 加入购物车之前,判断是否同id商品 有就累加 无就push
            const index = state.carData.findIndex(item => item.id === good.id)
            if (index !== -1) {
                state.carData[index].number += good.number;
            } else {
                state.carData.push(good)
            }
        },
        // 删除购物车商品
        clearCar(state) {
            state.carData = []
        },
        // 清空购物车
        delCar(state, id) {
            state.carData = state.carData.filter(item => item.id !== id)
        },
        // 购物车商品选中状态
        GoodsSelect(state, { id, selected }) {
            let index = state.carData.findIndex(item => item.id === id)
            state.carData[index].selected = selected
        },
        // 设置购物车商品购买数量
        GoodsNumber(state, { id, number }) {
            let index = state.carData.findIndex(item => item.id === id)
            state.carData[index].number = number
        },
        // 更新用户头像
        updateUserAvatar(state, src) {
            state.userInfo.avatar = src;
        }
    },
    actions: {
        // 对vuex中的数据进行筛选处理之后再返回
    },
    getters: {
        // 获取购物车商品总数量
        getCarNumber(state) {
            let totalNumber = 0;
            state.carData.forEach(item => totalNumber += item.number);
            return totalNumber;
        },
        // 获取购物车商品id
        getCarId(state) {
            return state.carData.map(item => item.id).join(',');
        },
        // 获取购物车选中商品id
        getSelectedId(state) {
            return state.carData.filter(item => item.selected).map(item => item.id).join(',');
        },
        // 返回一个键值对 
        getGoodsNumber(state) {
            let idNumber = {};
            state.carData.forEach(item => {
                idNumber[item.id] = item.number;
            })
            return idNumber;
        },
        // 购物车商品选中状态
        getGoodsStatus(state) {
            let idStatus = {};
            state.carData.forEach(item => {
                idStatus[item.id] = item.selected;
            })
            return idStatus;
        },
        // 购物车选中商品总数量
        getGoodsTotalNumber(state) {
            let totalNumber = 0;
            state.carData.forEach(item => item.selected && (totalNumber += item.number))
            return totalNumber;
        },
        // 购物车选中商品总价格
        getGoodsTotalPrice(state) {
            let totalPrice = 0;
            state.carData.forEach(item => item.selected && (totalPrice += item.number * item.price))
            return totalPrice;
        },
    },
    plugins: [createPersistedState()]
})

export default store