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
//首页
Vue.component('page-home', {
    template: '#page-home',
    data: function() {
        return {
            active: 'home'
        };
    },
    methods: {
        showStores: function(){
            this.children('div').show();
        }
        // goFirst:function(){
        //     this.$router.load({'path':'/dish/'});
        // }
    }
})
//订菜页
Vue.component('page-dish', {
    template: '#page-dish'
    // data: function() {
    //     return {
    //         active: 'home'
    //     };
    // }
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
            //首页路由
            path: '/home/',
            component: 'page-home'
        },
        {
            //订菜页路由
            path: '/dish/',
            component: 'page-dish'
        }
        ]
    }
});
