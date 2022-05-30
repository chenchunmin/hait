<template>
    <div class="search-result">
        <van-search v-model="keyword" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="$router.back()" />

        <van-dropdown-menu>
            <van-dropdown-item @change="change" v-model="sort" :options="option1" />
        </van-dropdown-menu>

        <div class="goodslist">
            <Goods v-for="item in goodsList" :key="item.id" :data="item" @click="click" />
        </div>

        <van-empty v-if="goodsList.length === 0" description="暂无搜索结果" />
    </div>
</template>

<script>
import { fetchSearch } from "../api/index.js"
import Goods from "../components/Goods.vue"
export default {
    data() {
        return {
            keyword: this.$route.params.keyword,
            sort: 'buy',
            option1: [
                { text: '销量', value: 'buy' },
                { text: '好评', value: 'likes' },
                { text: '价格', value: 'sell_price' },
            ],
            order: 'desc',
            page: 1,
            pagesize: 10,
            goodsList: [],
        }
    },
    created() {
        this._fetchSearch();
    },
    activated() {
        this._fetchSearch();
        this.keyword = this.$route.params.keyword;
    },
    deactivated() {

    },
    methods: {
        async _fetchSearch() {
            let data = {
                value: this.keyword,
                sort: this.sort,
                order: this.order,
                page: this.page,
                pagesize: this.pagesize,
            }
            let goodsList = await fetchSearch(data)
            this.goodsList = goodsList
        },
        onSearch() {
            this._fetchSearch();
        },
        change(value) {
            // 获取到搜索的字段
            this.sort = value; // 更改排序的字段
            this._fetchSearch();

        },
        click(data) {
            this.$router.push("/goodsDetail/" + data.id);
        },
    },
    components: {
        Goods,
    }
}
</script>

<style lang="scss" scoped>
.search-result {
    height: 100vh;

    .goodslist {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        background: #f0eded;
        padding-top: 10px;
    }
}
</style>