<template>
    <div>
        <van-tabs v-model="active" @change="changeTab">
            <van-tab v-for="item in tabs" :key="item.status" :title="item.text">
                <van-card v-for="item in filterOrder" :key="item.id"
                    @click="$router.push('/orderdetail/' + item.order_id)" :num="item.number" :price="item.total_price"
                    :title="item.goods[0].title" :thumb="item.goods[0].thumb_path">
                    <template #tags>
                        <div>
                            {{ item.pay_way }} <br />
                            下单时间:{{ item.add_time | timeFormat('YYYY-MM-DD HH:mm') }}
                        </div>
                    </template>
                    <template #footer>
                        <van-button v-if="item.status === 0" size="mini" type="danger">立即付款</van-button>
                        <van-button v-if="item.is_out === 1" size="mini" type="primary">物流信息</van-button>
                        <van-button v-if="item.is_out === 1" size="mini" type="primary" v-clipboard:copy="item.order_id"
                            v-clipboard:success="copy">复制订单号</van-button>
                        <template v-if="item.status === 2">
                            <van-button size="mini" type="info">已完成</van-button>
                            <van-button size="mini" type="warning">评价</van-button>
                        </template>
                        <van-button size="mini" @click.stop="callPhone" type="danger">客服</van-button>
                    </template>
                </van-card>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { fetchOrder, fetchShopCar } from "../api/index.js";
export default {
    data() {
        return {
            active: 0,
            status: "all",
            tabs: [
                { status: "all", text: "全部" },
                { status: "0", text: "未付款" },
                { status: "1", text: "已付款" },
                { status: "2", text: "完成" },
            ],
            allOrderGoods: [],
        };
    },
    computed: {
        filterOrder() {
            if (this.status === "all") {
                return this.allOrderGoods;
            }
            return this.allOrderGoods.filter((item) => item.status == this.status);
        },
    },
    created() {
        this._fetchOrder();
    },
    methods: {
        // 切换选项卡事件
        changeTab(index, text) {
            let statusMap = {
                '全部': "all",
                '未付款': "0",
                '已付款': "1",
                '完成': "2",
            };
            let status = statusMap[text];
            this.status = status;
        },
        // 获取用户订单
        async _fetchOrder() {
            let user_id = this.$store.state.userInfo.id;
            let allOrder = await fetchOrder(user_id);
            // 获取订单关联的商品
            const promiseArr = [];
            allOrder.forEach(async (order) => {
                promiseArr.push(fetchShopCar(order.goods_ids));
            });
            // 并行获取订单商品
            let allGoods = await Promise.all(promiseArr);
            const allOrderGoods = allOrder.map((order, index) => {
                // 额外添加goods,记录当前订单所有商品
                order.goods = allGoods[index].message;
                return order;
            });
            this.allOrderGoods = allOrderGoods;
        },
        callPhone() {
            window.location.href = 'tel:18664673990'
        },
        copy() {
            event.stopPropagation();
            this.$toast('复制成功')
        }
    },
};
</script>

<style>
</style>