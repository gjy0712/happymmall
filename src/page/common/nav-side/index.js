'use strict'
require('./index.css')
var _mm = require('util/mm.js')
var templateIndex = require('./index.string')

//侧边导航
var navSide = {
    option: {
        name: '',
        navList: [{
                name: 'user-center',
                desc: '个人中心',
                href: './user-center.html'
            },
            {
                name: 'order-list',
                desc: '我的订单',
                href: './order-list.html'
            },
            {
                name: 'user-pass-update',
                desc: '修改密码',
                href: './user-pass-update.html'
            },
            {
                name: 'about',
                desc: '关于MMall',
                href: './about.html'
            }
        ]
    },
    init: function (option) {
        //extend是浅拷贝，只会对第一层的内容生效；
        //如果上面的name下还有东西，是不会做合并的
        //合并选项
        $.extend(this.option, option)
        this.renderNav()
    },
    //1.渲染导航菜单
    renderNav: function () {
        //计算active数据
        //对length做了缓存，这样就不用每次都次this.option
        for (var i = 0, iLength = this.option.navList.length; i < iLength; i++) {
            //循环的当前元素里面的name是不是和option里面的name相等
            //相等的话在里面加上active就行
            if (this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true;
            }
        }
        //2.渲染list数据
        var navHtml = _mm.renderHtml(templateIndex, {
            navList: this.option.navList
        })
        //3.把html放入容器
        $('.nav-side').html(navHtml)
    }

}

module.exports = navSide