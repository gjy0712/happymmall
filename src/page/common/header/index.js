'use strict'

require('./index.css')

var _mm = require('util/mm.js')

//通用页面头部
var header = {
    init: function () {
        this.bindEvent()
    },
    onload: function () {
        var keyword = _mm.getUrlParam('keyword')
        //如果keyword存在，则回填输入框
        if (keyword) {
            $('#search-input').val(keyword)
        }
    },
    //提交，点btn时提交
    bindEvent: function () {
        var _this = this
        //点击搜索按钮以后，做搜索提交，搜索按钮点击事件
        $('#search-btn').click(function () {
            _this.searchSubmit()
        })
        //输入回车，同样要做搜索提交，给input绑定键盘按下事件
        $('#search-input').keyup(function (e) {
            //判断按下的键是不是回车键，13代表回车键；e.keyCode表示按的是哪个键
            if (e.keyCode === 13) {
                _this.searchSubmit()
            }
        })

    },
    //定义搜索的方法：searchSubmit()
    searchSubmit: function () {
        var keyword = $.trim($('#search-input').val())
        //如果提交的时候有keyword，正常跳转到list页
        //keyword为空时，直接返回首页
        if (keyword) {
            window.location.href = './list.html?keyword=' + keyword
        } else {
            _mm.goHome()
        }

    }
}

//header并不需要对外输出，它的方法都是内部的，并不需要外部去调用，所以不需要输出出去
// module.exports = header.init()  

header.init()