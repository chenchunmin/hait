var jwt = require('jsonwebtoken');
var data = {
  id: "1",
  username: "小白"
}
var primaryKey = '￥R^^&677568';

// 检验token是否有效（是否篡改，是否过期）
// 对数据进行加密签名,一个小时内有效
var token = jwt.sign(data, primaryKey, {
  expiresIn: '1h'
});

console.log(token)

try {
  // 校验token是否有效
  var decoded = jwt.verify(token, primaryKey);
  console.log(decoded)
} catch (err) {
  console.log('校验失败')
}