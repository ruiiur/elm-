// Init F7 Vue Plugin
Vue.use(Framework7Vue);

// Init Page Components
//平台首页底部导航
Vue.component('com-toolbar', {
    props: ['active'],
    template: '#com-toolbar'
})

//门店首页底部导航
Vue.component('sto-toolbar', {
    props: ['active'],
    template: '#sto-toolbar'
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
    template: '#page-dish',
    data: function() {
        return {
            count: 0,//单个商品添加的数量
            totalCount:0,//购物车添加商品的数量
            totalPrice:0,//购物车总价格
            deliveryPrice:5,//配送费
            minPrice:20,//起送金额
            pricePer:8,//商品单价
            balls: [
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                }
            ],//
            dropBalls: [],//
            fold: true,//
            funMore:false,//是否显示更多功能
            actiShow:false,//是否显示活动
            actiNum:4,//商家活动个数
        };
    },
    computed: {
        // totalPrice:function() {
        //     let total = 0;
        //     this.selectFoods.forEach((food) => {
        //         total += food.price * food.count;
        // });
        //     return total;
        // },
        // totalCount:function() {
        //     let count = 0;
        //     this.selectFoods.forEach((food) => {
        //         count += food.count;
        // });
        //     return count;
        // },
        payDesc:function() {
            if (this.totalPrice === 0) {
                return `￥${this.minPrice}元起送`;
            } else if (this.totalPrice < this.minPrice) {
                let diff = this.minPrice - this.totalPrice;
                return `还差￥${diff}元起送`;
            } else {
                return '去结算';
            }
        },
        payClass:function() {
            if (this.totalPrice < this.minPrice) {
                return 'not-enough';
            } else {
                return 'enough';
            }
        }
        // listShow:function() {
        //     if (!this.totalCount) {
        //         this.fold = true;
        //         return false;
        //     }
        //     let show = !this.fold;
        //     if (show) {
        //         this.$nextTick(() => {
        //             if (!this.scroll) {
        //             this.scroll = new BScroll(this.$refs.listContent, {
        //                 click: true
        //             });
        //         } else {
        //             this.scroll.refresh();
        //         }
        //     });
        //     }
        //     return show;
        // }
    },
    methods: {
        //更多功能
        commonMore:function(funMore){
            this.funMore=!this.funMore;
        },
        //是否显示所有活动
        acti:function(actiShow){
            this.actiShow=!this.actiShow;
            //活动收缩时
            if(this.actiShow==false){
                //获取类dish-main的top样式值，值单位为px
                this.$el.querySelector('.dish-main').style.top=219+'px';
                //把top单位化成rem
                let aTop=parseInt(this.$el.querySelector('.dish-main').style.top)/Math.round(parseFloat(window.docEl.style.fontSize))+'rem';
                //然后再赋值给top样式值
                this.$el.querySelector('.dish-main').style.top=aTop;
            }
            //活动展开时
            else{
                this.$el.querySelector('.dish-main').style.top=219+(this.actiNum-1)*24+'px';
                let aTop=parseInt(this.$el.querySelector('.dish-main').style.top)/Math.round(parseFloat(window.docEl.style.fontSize))+'rem';
                this.$el.querySelector('.dish-main').style.top=aTop;
            }
        },
        //增加菜品
        addCart:function(event) {
            this.count++;
            this.totalCount++;
            this.totalPrice=this.pricePer*this.totalCount;
            // this.$emit('add', event.target);
        },
        //减少菜品
        reduceCart:function(event) {
            if (this.count) {
                this.count--;
                this.totalCount--;
                this.totalPrice=this.pricePer*this.totalCount;
            }
        },
        drop:function(el) {
            for (let i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i];
                if (!ball.show) {
                    ball.show = true;
                    ball.el = el;
                    this.dropBalls.push(ball);
                    return;
                }
            }
        },
        toggleList:function() {
            if (!this.totalCount) {
                return;
            }
            this.fold = !this.fold;
        },
        hideList:function() {
            this.fold = true;
        },
        // empty:function() {
        //     this.selectFoods.forEach((food) => {
        //         food.count = 0;
        // });
        // },
        pay:function() {
            if (this.totalPrice < this.minPrice) {
                return;
            }
            window.alert(`支付${this.totalPrice}元`);
        },
        // addFood:function(target) {
        //     this.drop(target);
        // },
        beforeDrop:function(el) {
            let count = this.balls.length;
            while (count--) {
                let ball = this.balls[count];
                if (ball.show) {
                    let rect = ball.el.getBoundingClientRect();
                    let x = rect.left - 32;
                    let y = -(window.innerHeight - rect.top - 22);
                    el.style.display = '';
                    el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                    el.style.transform = `translate3d(0,${y}px,0)`;
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                    inner.style.transform = `translate3d(${x}px,0,0)`;
                }
            }
        },
        dropping:function(el, done) {
            /* eslint-disable no-unused-vars */
            let rf = el.offsetHeight;
            this.$nextTick(() => {
                el.style.webkitTransform = 'translate3d(0,0,0)';
            el.style.transform = 'translate3d(0,0,0)';
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = 'translate3d(0,0,0)';
            inner.style.transform = 'translate3d(0,0,0)';
            el.addEventListener('transitionend', done);
        });
        },
        afterDrop:function(el) {
            let ball = this.dropBalls.shift();
            if (ball) {
                ball.show = false;
                el.style.display = 'none';
            }
        }
    }
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
            active: 'home',
            actiShow:false,//是否显示活动
            actiNum:3,//商家活动个数
        };
    },
    methods:{
        acti:function(actiShow){
            this.actiShow=!this.actiShow;
        }
    }
})
//订单详情页
Vue.component('page-order-detail', {
    template: '#page-order-detail'
})
//门店订单页
Vue.component('page-stores-order', {
    props: ['active'],
    template: '#page-stores-order'
})
//门店中心页
Vue.component('page-stores-center', {
    props: ['active'],
    template: '#page-stores-center'
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
        },
        {
            //门店订单页路由
            path:'/stores-order/',
            component:'page-stores-order'
        },
        {
            //门店中心页路由
            path:'/stores-center/',
            component:'page-stores-center'
        }
        ]
    }
});
