// Init F7 Vue Plugin
Vue.use(Framework7Vue);

// Init Page Components
//平台首页底部导航
Vue.component('com-toolbar', {
    props: ['active','overActive'],
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
            active: 'order',
            orderShow:false
        };
    },
    methods:{
        isOrderMore:function(){
            this.orderShow=!this.orderShow;
        }
    }
})
//平台首页
Vue.component('page-home', {
    template: '#page-home',
    data: function() {
        return {
            active: 'home',
            show:false,//是否显示出所有门店
            overActive:false,//首页底部的z-index的控制
            actiNum:4,//活动个数
            actiShow:false//是否显示所有活动
        };
    },
    methods: {
        showStores: function () {
            this.show = !this.show;
            this.overActive = !this.overActive;
        },
        acti: function () {
            this.actiShow = !this.actiShow;
        }
    },
    mounted: function(){
        let $$ = Dom7;
        //购物车标签
        let touch=this.$refs.move;
        //首页触摸时购物车向右滑动
        $$(".page-content").on('touchmove',function(){
            touch.style.animation='mymove 1s';
        });
        //首页触摸结束时购物车出现
        $$(".page-content").on('touchend',function(){
            touch.style.animation='myback 1s';
        })
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
            ],//balls数组来代表五个小球
            dropBalls: [],//dropBalls数组正在运行的小球
            fold: true,//
            funMore:false,//是否显示更多功能
            actiShow:false,//是否显示活动
            actiNum:4,//商家活动个数
            isPanel:false,//是否显示大图
            types:[
                {
                    typeText:'香辣味',
                    price:28
                },
                {
                    typeText:'甜味',
                    price:8
                },
                {
                    typeText:'咖喱味',
                    price:12
                },
                {
                    typeText:'甜辣香味',
                    price:15
                },
                {
                    typeText:'甜味甜味甜',
                    price:18
                },
                {
                    typeText:'甜味甜味甜味',
                    price:20
                },
                {
                    typeText:'甜味甜味甜味甜',
                    price:28
                }
            ],//菜品的规格
            isType:false,//是否显示菜品规格
        };
    },
    //实时计算
    computed: {
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
                let aTop=parseInt(this.$el.querySelector('.dish-main').style.top)/parseFloat(window.docEl.style.fontSize)+'rem';
                //然后再赋值给top样式值
                this.$el.querySelector('.dish-main').style.top=aTop;
            }
            //活动展开时
            else{
                this.$el.querySelector('.dish-main').style.top=219+(this.actiNum-1)*24+'px';
                let aTop=parseInt(this.$el.querySelector('.dish-main').style.top)/parseFloat(window.docEl.style.fontSize)+'rem';
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
        //判断是否可以去支付
        pay:function() {
            if (this.totalPrice < this.minPrice) {
                return;
            }
            window.alert(`支付${this.totalPrice}元`);
        },
        //显示大图
        panelShow:function(){
            this.isPanel=!this.isPanel;
        },
        //关闭大图
        panelClose:function(){
            this.isPanel=!this.isPanel;
        },
        //显示规格
        typeShow:function(){
            this.isType=!this.isType;
        },
        //关闭规格
        typeClose:function(){
            this.isType=!this.isType;
        },
        //计算产品规格的字数
        typeC:function(type){
            // console.log(type.typeText.length);
            if(type.typeText.length=='2'||type.typeText.length=='1' ||type.typeText.length=='3'){
                return 'type-short';
            }
            else if(type.typeText.length=='4'){
                return 'type-four';
            }
            else if(type.typeText.length=='5'){
                return 'type-five';
            }
            else{
                return 'type-more';
            }
        },
        //关于购物车小球飞出的动画
        drop:function(el) {
            //触发一次事件就会将所有小球进行遍历
            for (let i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i];
                if (!ball.show) { //将false的小球放到dropBalls
                    ball.show = true;
                    ball.el = el; //设置小球的el属性为一个dom对象
                    this.dropBalls.push(ball);
                    return;
                }
            }
        },

        beforeEnter:function(el){ //这个方法的执行是因为这是一个vue的监听事件
            let count = this.balls.length;
            while (count--) {
                let ball = this.balls[count];
                if (ball.show) {
                    let rect = ball.el.getBoundingClientRect(); //获取小球的相对于视口的位移(小球高度)
                    let x = rect.left - 32;
                    let y = -(window.innerHeight - rect.top - 22); //负数,因为是从左上角往下的的方向
                    el.style.display = ''; //清空display
                    el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                    el.style.transform = `translate3d(0,${y}px,0)`;
                    //处理内层动画
                    let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                    inner.style.transform = `translate3d(${x}px,0,0)`;
                }
            }
        },

        enter:function(el, done) { //这个方法的执行是因为这是一个vue的监听事件
            /* eslint-disable no-unused-vars */
            let rf = el.offsetHeight; //触发重绘html
            this.$nextTick(() => { //让动画效果异步执行,提高性能
                el.style.webkitTransform = 'translate3d(0,0,0)';
                el.style.transform = 'translate3d(0,0,0)';
                //处理内层动画
                let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
                inner.style.webkitTransform = 'translate3d(0,0,0)';
                inner.style.transform = 'translate3d(0,0,0)';
                el.addEventListener('transitionend', done); //Vue为了知道过渡的完成，必须设置相应的事件监听器。
            });
        },

        afterEnter:function(el) { //这个方法的执行是因为这是一个vue的监听事件
            let ball = this.dropBalls.shift(); //完成一次动画就删除一个dropBalls的小球
            if (ball) {
                ball.show = false;
                el.style.display = 'none'; //隐藏小球
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
    template: '#page-pay',
    data:function(){
       return{
           paymentMethodsList: [
               {
                   name: '支付宝',
                   hint:'成功支付后抽好礼~',
                   active:false
               },
               {
                   name: '花呗',
                   hint:'花呗新用户立减15元!',
                   active:true
               },
               {
                   name: '银行卡支付',
                   hint:'',
                   active:true
               },
               {
                   name: 'QQ钱包',
                   hint:'',
                   active:true
               }
           ]
       }
    },
    methods:{
        isChecked:function(pay){
            pay.active = !pay.active;
        }
    }
});
//门店首页
Vue.component('page-stores', {
    template: '#page-stores',
    data: function() {
        return {
            active: 'stores',
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
    template: '#page-stores-order',
    data: function() {
        return {
            active: 'stores-order'
        };
    }
})
//门店中心页
Vue.component('page-stores-center', {
    template: '#page-stores-center',
    data: function() {
        return {
            active: 'stores-center'
        };
    }
})
//菜品详情页
Vue.component('page-food-detail', {
    template: '#page-food-detail',
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
            ],//balls数组来代表五个小球
            dropBalls: [],//dropBalls数组正在运行的小球
            fold: true,//
            funMore:false,//是否显示更多功能
            actiShow:false,//是否显示活动
            actiNum:4,//商家活动个数
            isPanel:false,//是否显示大图
        };
    },
    computed: {
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
    },
    methods: {
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
        //判断是否可以去支付
        pay:function() {
            if (this.totalPrice < this.minPrice) {
                return;
            }
            window.alert(`支付${this.totalPrice}元`);
        },
        //显示大图
        panelShow:function(){
            this.isPanel=!this.isPanel;
        },
        //关闭大图
        panelClose:function(){
            this.isPanel=!this.isPanel;
        },
        //关于购物车小球飞出的动画
        drop:function(el) {
            //触发一次事件就会将所有小球进行遍历
            for (let i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i];
                if (!ball.show) { //将false的小球放到dropBalls
                    ball.show = true;
                    ball.el = el; //设置小球的el属性为一个dom对象
                    this.dropBalls.push(ball);
                    return;
                }
            }
        },

        beforeEnter:function(el){ //这个方法的执行是因为这是一个vue的监听事件
            let count = this.balls.length;
            while (count--) {
                let ball = this.balls[count];
                if (ball.show) {
                    let rect = ball.el.getBoundingClientRect(); //获取小球的相对于视口的位移(小球高度)
                    let x = rect.left - 32;
                    let y = -(window.innerHeight - rect.top - 22); //负数,因为是从左上角往下的的方向
                    el.style.display = ''; //清空display
                    el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                    el.style.transform = `translate3d(0,${y}px,0)`;
                    //处理内层动画
                    let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                    inner.style.transform = `translate3d(${x}px,0,0)`;
                }
            }
        },

        enter:function(el, done) { //这个方法的执行是因为这是一个vue的监听事件
            /* eslint-disable no-unused-vars */
            let rf = el.offsetHeight; //触发重绘html
            this.$nextTick(() => { //让动画效果异步执行,提高性能
                el.style.webkitTransform = 'translate3d(0,0,0)';
                el.style.transform = 'translate3d(0,0,0)';
                //处理内层动画
                let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
                inner.style.webkitTransform = 'translate3d(0,0,0)';
                inner.style.transform = 'translate3d(0,0,0)';
                el.addEventListener('transitionend', done); //Vue为了知道过渡的完成，必须设置相应的事件监听器。
            });
        },

        afterEnter:function(el) { //这个方法的执行是因为这是一个vue的监听事件
            let ball = this.dropBalls.shift(); //完成一次动画就删除一个dropBalls的小球
            if (ball) {
                ball.show = false;
                el.style.display = 'none'; //隐藏小球
            }
        }
    }
})

//店内搜索页
Vue.component('page-store-search', {
    template: '#page-store-search',
    data:function () {
        return{
            hotList:[
                {
                    hotText:'湘西外婆菜丰盛套餐',
                },
                {
                    hotText:'盛套餐',
                },
                {
                    hotText:'套餐',
                },
                {
                    hotText:'餐',
                },
                {
                    hotText:'湘西外婆菜丰盛套餐',
                },
                {
                    hotText:'湘西外婆菜丰盛套餐',
                },
                {
                    hotText:'甜辣香味湘西外婆菜丰盛套餐',
                },
                {
                    hotText:'湘西外婆菜丰盛套餐',
                },
                {
                    hotText:'甜味湘西外婆菜丰盛套餐甜味甜味',
                },
                {
                    hotText:'湘西外婆菜丰盛套餐味甜',
                }
            ],//热门搜索
            hide:false,
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
            ],//balls数组来代表五个小球
            dropBalls: [],//dropBalls数组正在运行的小球
            fold: true,//
            funMore:false,//是否显示更多功能
            actiShow:false,//是否显示活动
            actiNum:4,//商家活动个数
            isPanel:false,//是否显示大图
            types:[
                {
                    typeText:'香辣味',
                    price:28
                },
                {
                    typeText:'甜味',
                    price:8
                },
                {
                    typeText:'咖喱味',
                    price:12
                },
                {
                    typeText:'甜辣香味',
                    price:15
                },
                {
                    typeText:'甜味甜味甜',
                    price:18
                },
                {
                    typeText:'甜味甜味甜味',
                    price:20
                },
                {
                    typeText:'甜味甜味甜味甜',
                    price:28
                }
            ],//菜品的规格
            isType:false,//是否显示菜品规格
        }
    },
    //实时计算
    computed: {
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
                let aTop=parseInt(this.$el.querySelector('.dish-main').style.top)/parseFloat(window.docEl.style.fontSize)+'rem';
                //然后再赋值给top样式值
                this.$el.querySelector('.dish-main').style.top=aTop;
            }
            //活动展开时
            else{
                this.$el.querySelector('.dish-main').style.top=219+(this.actiNum-1)*24+'px';
                let aTop=parseInt(this.$el.querySelector('.dish-main').style.top)/parseFloat(window.docEl.style.fontSize)+'rem';
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
        //判断是否可以去支付
        pay:function() {
            if (this.totalPrice < this.minPrice) {
                return;
            }
            window.alert(`支付${this.totalPrice}元`);
        },
        //显示大图
        panelShow:function(){
            this.isPanel=!this.isPanel;
        },
        //关闭大图
        panelClose:function(){
            this.isPanel=!this.isPanel;
        },
        //显示规格
        typeShow:function(){
            this.isType=!this.isType;
        },
        //关闭规格
        typeClose:function(){
            this.isType=!this.isType;
        },
        //计算热门搜索的字数
        hotC:function(hot){
            // console.log(type.typeText.length);
            if(hot.hotText.length=='2'||hot.hotText.length=='1' ||hot.hotText.length=='3'){
                return 'type-short';
            }
            else if(hot.hotText.length=='4'){
                return 'type-four';
            }
            else if(hot.hotText.length=='5'){
                return 'type-five';
            }
            else{
                return 'type-more';
            }
        },
        //计算产品规格的字数
        typeC:function(type){
            // console.log(type.typeText.length);
            if(type.typeText.length=='2'||type.typeText.length=='1' ||type.typeText.length=='3'){
                return 'type-short';
            }
            else if(type.typeText.length=='4'){
                return 'type-four';
            }
            else if(type.typeText.length=='5'){
                return 'type-five';
            }
            else{
                return 'type-more';
            }
        },
        //关于购物车小球飞出的动画
        drop:function(el) {
            //触发一次事件就会将所有小球进行遍历
            for (let i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i];
                if (!ball.show) { //将false的小球放到dropBalls
                    ball.show = true;
                    ball.el = el; //设置小球的el属性为一个dom对象
                    this.dropBalls.push(ball);
                    return;
                }
            }
        },

        beforeEnter:function(el){ //这个方法的执行是因为这是一个vue的监听事件
            let count = this.balls.length;
            while (count--) {
                let ball = this.balls[count];
                if (ball.show) {
                    let rect = ball.el.getBoundingClientRect(); //获取小球的相对于视口的位移(小球高度)
                    let x = rect.left - 32;
                    let y = -(window.innerHeight - rect.top - 22); //负数,因为是从左上角往下的的方向
                    el.style.display = ''; //清空display
                    el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                    el.style.transform = `translate3d(0,${y}px,0)`;
                    //处理内层动画
                    let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                    inner.style.transform = `translate3d(${x}px,0,0)`;
                }
            }
        },

        enter:function(el, done) { //这个方法的执行是因为这是一个vue的监听事件
            /* eslint-disable no-unused-vars */
            let rf = el.offsetHeight; //触发重绘html
            this.$nextTick(() => { //让动画效果异步执行,提高性能
                el.style.webkitTransform = 'translate3d(0,0,0)';
                el.style.transform = 'translate3d(0,0,0)';
                //处理内层动画
                let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
                inner.style.webkitTransform = 'translate3d(0,0,0)';
                inner.style.transform = 'translate3d(0,0,0)';
                el.addEventListener('transitionend', done); //Vue为了知道过渡的完成，必须设置相应的事件监听器。
            });
        },

        afterEnter:function(el) { //这个方法的执行是因为这是一个vue的监听事件
            let ball = this.dropBalls.shift(); //完成一次动画就删除一个dropBalls的小球
            if (ball) {
                ball.show = false;
                el.style.display = 'none'; //隐藏小球
            }
        }
    }
})

//服务中心页
Vue.component('page-service-center', {
    template: '#page-service-center'
})

//设置--关于点银宝页
Vue.component('page-setting', {
    template: '#page-setting'
})

//领券中心页
Vue.component('page-coupon-center', {
    template: '#page-coupon-center',
    data:function(){
        return{
            couponText:'立即领取',//优惠券提示
            active:false
        }
    },
    methods:{
       getCoupon:function(){
           this.active=true;
           this.couponText='去使用';
       }
    }
})

//平台购物车页
Vue.component('page-shopping-cart', {
    template: '#page-shopping-cart'
})

//收货地址页
Vue.component('page-delivery-address',{
    template:'#page-delivery-address',
    data:function(){
        return{
            addressList:[
                {
                    address:'文洋大厦',
                    name:'魏福思',
                    sex:'先生',
                    tel:'18867542341'
                },
                {
                    address:'文洋大厦',
                    name:'魏福思',
                    sex:'先生',
                    tel:'18867542341'
                },
                {
                    address:'文洋大厦',
                    name:'魏福思',
                    sex:'先生',
                    tel:'18867542341'
                },
                {
                    address:'文洋大厦',
                    name:'魏福思',
                    sex:'先生',
                    tel:'18867542341'
                },
                {
                    address:'文洋大厦',
                    name:'魏福思',
                    sex:'先生',
                    tel:'18867542341'
                },
                {
                    address:'文洋大厦',
                    name:'魏福思',
                    sex:'先生',
                    tel:'18867542341'
                }
            ]
        }
    }
})


//账号与安全页
Vue.component('page-account', {
    template: '#page-account'
})


//搜索地址页
Vue.component('page-search-address', {
    template: '#page-search-address'
})

//新增地址页
Vue.component('page-new-address', {
    template: '#page-new-address'
})
//新增地址定位页
Vue.component('page-address-location', {
    template: '#page-address-location',
    mounted:function(){
        this.loadmap();     //加载地图和相关组件
    },
    methods: {
        loadmap:function(){
            const map = new AMap.Map('container', {
                zoom: 9
            });
        }
    }
})


//通知中心页
Vue.component('page-notice', {
    template: '#page-notice'
})

//我的收藏页
Vue.component('page-collection', {
    template: '#page-collection',
    data: function() {
        return {
            show:false,//是否显示出所有门店
            actiNum:4,//活动个数
            actiShow:false//是否显示所有活动
        };
    },
    methods: {
        showStores: function () {
            this.show = !this.show;
        },
        acti: function () {
            this.actiShow = !this.actiShow;
        }
    },
})


//我的优惠页
Vue.component('page-discount', {
    template: '#page-discount',
    data:function () {
        return{
            viewA:true,//控制查看按钮显示或隐藏
            ineffectualShow:false//控制无效券是否显示
        }
    },
    methods:{
        view:function(){
            this.viewA=false;
            this.ineffectualShow=true;
        }
    }
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
        },
        {
            //菜品详情页路由
            path:'/food-detail/',
            component:'page-food-detail'
        },
        {
            //店内搜索页路由
            path:'/store-search/',
            component:'page-store-search'
        },
        {
            //服务中心页路由
            path:'/service-center/',
            component:'page-service-center'
        },
        {
            //设置--关于点银宝页路由
            path:'/setting/',
            component:'page-setting'
        },
        {
            //领券中心页路由
            path:'/coupon-center/',
            component:'page-coupon-center'
        },
        {
            //平台购物车页路由
            path:'/shopping-cart/',
            component:'page-shopping-cart'
        },
        {
            //收货地址页路由
            path:'/delivery-address/',
            component:'page-delivery-address'
        },
        {
            //搜索地址页路由
            path:'/search-address/',
            component:'page-search-address'
        },
        {
            //新增地址页路由
            path:'/new-address/',
            component:'page-new-address'
        },
        {
            //新增地址定位页路由
            path:'/address-location/',
            component:'page-address-location'
        },
        {
            //通知中心页路由
            path:'/notice/',
            component:'page-notice'
        },
        {
            //我的收藏页路由
            path:'/collection/',
            component:'page-collection'
        },
        {
            //我的优惠页路由
            path:'/discount/',
            component:'page-discount'
        },
        {
            //账号与安全页路由
            path:'/account/',
            component:'page-account'
        }
        ]
    }
});
