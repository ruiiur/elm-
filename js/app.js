// Init F7 Vue Plugin
Vue.use(Framework7Vue)

// Init Page Components
//底部导航
Vue.component('com-toolbar', {
    props: ['active'],
    template: '#com-toolbar'
})
//个人中心页
Vue.component('page-center', {
    template: '#page-center',
    data: function() {
        return {
            active: 'center'
        };
    }
})
//订单页
Vue.component('page-order', {
    template: '#page-order',
    data: function() {
        return {
            active: 'order'
        };
    }
})
//平台首页
Vue.component('page-home', {
    template: '#page-home',
    data: function() {
        return {
            active: 'home',
            show:false
        };
    },
    methods: {
        showStores: function(show){
            this.show=!show;
        }
        // goFirst:function(){
        //     this.$router.load({'path':'/dish/'});
        // }
    }
})
//订菜页
Vue.component('page-dish', {
    template: '#page-dish'
})
//提交订单页
Vue.component('page-submit', {
    template: '#page-submit'
})
//支付页
Vue.component('page-pay', {
    template: '#page-pay'
})
//门店首页
Vue.component('page-stores', {
    template: '#page-stores',
    data: function() {
        return {
            active: 'home'
        };
    }
})
//订单详情页
Vue.component('page-order-detail', {
    template: '#page-order-detail'
})




// Init App
var app = new Vue({
    el: '#app',
    // Init Framework7 by passing parameters here
    framework7: {
        root: '#app',
        routes: [{
            //个人中心路由
            path: '/center/',
            component: 'page-center'
        },
        {
            //订单页路由
            path: '/order/',
            component: 'page-order'
        },
        {
            //平台首页路由
            path: '/home/',
            component: 'page-home'
        },
        {
            //订菜页路由
            path: '/dish/',
            component: 'page-dish'
        },
        {
        //    提交订单页
            path:'/submit/',
            component:'page-submit'
        },
        {
            //     支付页路由
            path:'/pay/',
                component:'page-pay'
        },
        {
            //     门店首页路由
            path:'/stores/',
            component:'page-stores'
        },
        {
            //      订单详情页路由
            path:'/order-detail/',
            component:'page-order-detail'
        }
        ]
    }
});
