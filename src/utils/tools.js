import { nanoid } from 'nanoid'
export function getOrder() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const nanoId = nanoid();
    return `${year}${month}${day}${hours}${minutes}${nanoId}`
}


// 节流
export function throttle(fn, delay) {
    // 记录上一次函数触发的时间
    var lastTime = 0; // 闭包变量，用来记录保存上一次的执行时间
    return function() {
        // 记录当前函数触发的时间
        var nowTime = Date.now();
        var context = this;
        var args = [...arguments];
        if (nowTime - lastTime > delay) {
            // 修正this指向问题 
            fn.apply(context,arguments);
            // 更新上一次的时间
            lastTime = nowTime;
        }
    }
}