import instance from "./request.js"
// 轮播图
export function fetchLunbo() {
    return instance.get('/getlunbo')
}

// 推荐商品
export function fetchGoods(page = 1, limit = 10) {
    return instance.get(`/recommend?page=${page}&limit=${limit}`)
}

// 商品列表
export function fetchGoodsList(page = 1, limit = 10) {
    return instance.get(`/getgoods?pageindex=${page}&pagesize=${limit}`)
}

// 商品详情轮播图
export function fetchGoodsLunbo(goodsid) {
    return instance.get(`/getthumbimages/${goodsid}`)
}

// 商品详情基本信息
export function fetchGoodsInfo(goodsid) {
    return instance.get(`/getgoodsinfo/${goodsid}`)
}

// 购物车商品
export function fetchShopCar(ids) {
    return instance.get(`/getshopcarlist/${ids}`)
}

// 登录
export function fetchLogin(username, password) {
    return instance.post('/login', { username, password })
}

// 上传头像
export function fetchAvatar(formData) {
    return instance.post('/upload', formData)
}

// 添加地址
export function fetchAddaddress(user_id, data) {
    return instance.post(`/addaddress/${user_id}`, data)
}

// 获取用户地址
export function fetchGetaddress(user_id) {
    return instance.get(`/getaddress/${user_id}`)
}

// 删除地址
export function fetchDeladdress(address_id) {
    return instance.post(`/deladdress/${address_id}`)
}

// 编辑地址
export function fetchUpdateaddress(address_id, data) {
    return instance.post(`/updateaddress/${address_id}`, data)
}

// 提交订单
export function fetchCommit(orderData) {
    return instance.post('/commitorder', orderData)
}

// 获取用户订单
export function fetchOrder(user_id) {
    return instance.post(`/userorder/${user_id}`)
}

// 获取订单详情
export function fetchGetOrder(order_id) {
    return instance.post(`/getorder/${order_id}`)
}

// 付款模拟接口
export function fetchPayOrder(order_id) {
    return instance.post(`/payorder/${order_id}`)
}

// 付款模拟接口
export function fetchWuliu() {
    return instance.get('/kuaidi100/')
}

// 模糊查询商品
export function fetchSearch(data) {
    // 对象 {value:"iphone",'sort':"buy",order:"desc",page:1,pagesiz:10}
    // 将对象转化成查询字符串 
    let queryString = Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&');
    return instance.get(`/search?${queryString}`)
}

// 注册
export function fetchRegister(formDate) {
    return instance.post('/register', formDate)
}