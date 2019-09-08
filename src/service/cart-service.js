'use strict'

//需要用到请求，所以也需要mm工具类
var _mm = require('util/mm.js')

var _cart = {
    //获取购物车数量
    getCartCount: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject
        })
    }
}

module.exports = _cart