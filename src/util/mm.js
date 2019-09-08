'use strict'

var Hogan = require('hogan.js')
var conf = {
    serverHost: ''
}
var _mm = {
    //网络请求
    request: function (param) {
        var _this = this
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function (res) {
                //请求成功
                if (0 === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg)
                }
                //没有登陆状态，需要强制登录
                else if (10 === res.status) {
                    _this.doLogin()
                }
                //请求数据错误
                else if (1 === res.status) {
                    typeof param.error === 'function' && param.error(res.msg)
                }
            },
            error: function (err) {
                typeof param.error === 'function' && param.error(err.statusText)
            }
        })
    },
    //获取服务器地址,返回的其实就是path,因为是空字符串+path，可以直接在这里改path就行
    getServerUrl: function (path) {
        return conf.serverHost + path
    },
    //获取url的参数
    getUrlParam: function (name) {
        //假如一个地址：happymmall.com/product/list?keyword=xxx&page=1(首先截取)
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        var result = window.location.search.substr(1).match(reg)
        //如果获取到了就返回result,但是要解码，如果没有获取到，则返回null
        return result ? decodeURIComponent(result[2]) : null
    },
    //渲染html的模板,传入模板，传入数据，然后拼接
    renderHtml: function (htmlTemplate, data) {
        //先编译，再渲染
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data)
        return result

    },
    //成功提示
    successTips: function (msg) {
        alert(msg || '操作成功!')
    },
    //错误提示
    errorTips: function (msg) {
        alert(msg || '操作失败!')
    },
    //字段的表单验证，支持非空判断，手机，邮箱的判断
    validata: function (value, type) {
        var value = $.trim(value) //$.trim():把前后空格去掉；不是字符串的话经过trim会变成字符串
        //非空验证
        if ('require' === type) {
            return !!value //把value强转成boolean型。如果有值的话返回true;空字符串就返回false
        }
        //手机号验证
        if ('phone' === type) {
            return /^1\d{10}$/.test(value)
        }
        //邮箱格式验证
        if ('phone' === type) {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value)
        }
    },
    //统一登录处理,统一跳转
    doLogin: function () {
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href)
    },
    //跳回主页
    goHome: function () {
        window.location.href = './index.html'
    }
}

module.exports = _mm