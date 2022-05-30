<template>
    <div class="search-container">
        <van-popup :close-on-click-overlay="false" v-model="isShow" position="top" :style="{ height: '50%' }">
            <van-search @cancel="$router.back()" @search="onSearch" v-model="value" show-action
                placeholder="请输入搜索关键词" />
            <div class="searchWrap">

                <div class="card">

                    <div class="header" v-if="historyData.length > 0">
                        <h3>搜索历史</h3>
                        <i class="iconfont icon-trash" @click="clearHistory"></i>
                    </div>

                    <div class="footer">
                        <span v-for="(item, index) in historyData" :key="index"
                            @click="$router.push('/search-resule/' + item)">{{ item }}</span>
                    </div>

                </div>

                <van-divider />
                <div class="card">

                    <div class="header">
                        <h3>热门搜索</h3>
                        <!-- 方式一 -->
                        <!-- <i :class="['iconfont',isEyeOpen?'icon-yanjing':'icon-guanbi-yanjing']" 
                        @click="isEyeOpen=!isEyeOpen"></i> -->
                        <!-- 方式二：推荐 -->
                        <i :class="['iconfont', className]" @click="isEyeOpen = !isEyeOpen"></i>
                    </div>

                    <div v-if="isEyeOpen" class="footer">
                        <span v-for="(item, index) in hotsData" :key="index"
                            @click="$router.push('/search-resule/' + item)">{{ item }}</span>
                    </div>

                    <div v-else class="text-center">已隐藏热门搜索</div>

                </div>

            </div>

        </van-popup>

    </div>

</template>

<script>
let historyData = JSON.parse(localStorage.getItem('historyData') || '[]')
export default {
    data() {
        return {
            historyData,
            hotsData: ['苹果', 'MacBook'],
            isEyeOpen: true,
            isShow: true,
            value: '',
        };
    },
    computed: {
        className() {
            return this.isEyeOpen ? 'icon-yanjing' : 'icon-guanbi-yanjing'
        }
    },
    methods: {
        // 搜索
        onSearch() {
            // 获取输入值,并存入本地存储
            // 判断搜索记录是否有这个记录(去重)
            if (this.historyData.includes(this.value)) {
                return;
            }
            this.historyData.push(this.value)
            localStorage.setItem('historyData', JSON.stringify(this.historyData))
            // 跳到搜索结果页面
            this.$router.push(`/search-resule/:${this.value}`)
        },
        // 清楚历史记录
        clearHistory() {
            this.historyData = [];
            localStorage.removeItem("historyData");
        },
    },
};
</script>

<style lang="scss" scoped>
.search-container {
    .searchWrap {
        .card {
            padding: 6px;

            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 4px;
            }

            .footer {
                display: flex;
                flex-wrap: wrap;

                span {
                    height: 30px;
                    line-height: 30px;
                    background: #f3f5f6;
                    font-size: 14px;
                    margin-right: 6px;
                    padding: 2px 4px;
                    text-align: center;
                    border-radius: 6px;
                    margin: 4px;

                }
            }
        }
    }
}
</style>