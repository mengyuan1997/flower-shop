
// 准备渲染页面
$(function(){
    // 准备一个变量用于接商品信息
   let shop = null
    const shop_id = getCookie('shop_id')
    // console.log(shop_id)
    // 根据商品id向后端获取数据
    getGood()
    async function getGood(){
        const getGood = await $.get('/dl/getGood.php',{shop_id:shop_id},null,'json')
        console.log(getGood.shop)
        // console.log(getGood.shop,'getGood,13')
        // 渲染页面
        applyHtml(getGood.shop)
        shop = getGood.shop
        // console.log(shop,'getGood,17')
    }
    // 渲染页面
    function applyHtml(shop){
        // console.log(shop)
        
        $('#glassBox').html(`
        <div class="show">
                <img src="${shop.img1}" alt="">
                <div class="mask">&nbsp;</div>
            </div>
           
            <div class="cut">
                <li class ="pintch"><img src="${shop.img1}" show = "${shop.img1}" bg ="${shop.img1}" alt=""></li>
                <li ><img src="${shop.img2}" show = "${shop.img2}" bg ="${shop.img2}" alt=""></li>
            </div>
           
            <div class="enlarge" style>&nbsp;</div>
        `)

        fdj()
        $('.message').html(`
        <h5 class="title">${shop.title}</h5>
           <p class="descirbe">${shop.describe}</p>
           <div class="pricebox">
               <p>销售价:</p>
               <h4 class="price">￥${shop.price}</h4>
           </div>
           <div class="saEv">
               <p>累计评价<span class="sale">${shop.evaluate}</span> </p>|
               <p>累计销量<span class="evaluate">${shop.sale}</span> </p>
           </div>
           <div class="num">
               <span>数量</span>
               <b class="addNum">+</b>
               <input type="text" value="1" class="cartNum">
               <b class="subNum">-</b>
               <p>件&nbsp;&nbsp;库存 <span class="inven">1308</span>件 </p>
           </div>
           <div class="cartBox">
            <a href="#" class="btn btn-default" role="button">  收藏</a>
            <a  class="btn btn-primary addCart" role="button" data-shop_id=${shop.Id}> <img src="../images/icon_cart.png" alt=""> 加入购车</a>
            <a >&nbsp;</a>
            <a >&nbsp;</a>
       </div>
        `)
        $('#dateils').html(`${shop.details}`)
        
    }
    
    // 加入购物车操作
    $(".message").on('click','.addCart',function(){
        // console.log('加入购物车')
        const cart = JSON.parse(window.localStorage.getItem('cart')) || []
        console.log(cart,'加入购物车，70')
        const flag = cart.some(item => item.Id == shop.Id)
    // console.log(item.shop_id)

        console.log(flag,'商品是否存在，72')
        if(flag){
            const cart_goods = cart.filter(item => item.Id == shop.Id)[0]
            console.log(cart_goods,'75')
            cart_goods.cart_number = cart_goods.cart_number - 0 + ($('.cartNum').val() - 0)
        }else{
            shop.cart_number = 1
            cart.push(shop)
            // console.log(cart,'添加')
        }
        window.localStorage.setItem('cart',JSON.stringify(cart))
    })
    // 加减
    $('.message')
     .on('click','.subNum',function(){
        //  console.log('-')
         let num = $('.cartNum').val() - 0
         if(num === 1) return
         $('.cartNum').val(num  - 1)
     })
     .on('click','.addNum',function(){
        // console.log('+')
        let num = $('.cartNum').val() - 0 
        
        $('.cartNum').val(num  + 1)
    })


    
  })

  // 放大镜
 function fdj(){
    function Mag(ele) {
        // 获取元素范围
        this.ele = document.querySelector(ele)
        // 获取展示、选择、放大以及遮罩盒子
        /*获取展示盒子需要确定遮罩的移动位置，移动不能出区域；
        遮罩盒子 和 放大盒子：鼠标不放在盒子上进行消失，鼠标放在展示盒子上显示
        获取切换盒子，具有点击事件
        */
        this.show = this.ele.querySelector('.show') //展示盒子
        this.enlarge = this.ele.querySelector('.enlarge') //放大盒子
        this.mask = this.ele.querySelector('.mask') //遮罩盒子
        this.cut = this.ele.querySelector('.cut') //下方切换盒子
    
        /* 
        因为具有放大镜，需要计算展示盒子和放大盒子的比例，因此需要更改元素尺寸，更改遮罩的尺寸
        需要获取展示盒子、背景图的尺寸和放大盒子的尺寸
        */
        //获取展示盒子的尺寸
        this.showWidth = this.show.clientWidth
        this.showHeight = this.show.clientHeight
        // 获取放大盒子的尺寸,由于放大盒子会隐藏，一因此不能直接获取元素的尺寸，只能通过非行内样式进行获取
        // 由于获取的非行内样式具有单位，因此进行取整
        this.enlargeWidth = parseInt(window.getComputedStyle(this.enlarge).width)
        this.enlargeHeight = parseInt(window.getComputedStyle(this.enlarge).height)
        // 获取背景图的尺寸
        // 由于背景图是通过背景图的大小进行获取的，因此获取出来是一个字符串，通过split将数组进行切割成数组，通过索引选取，租后在进行取整去掉单位
        this.bgWidth = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[0])
        this.bgHeight = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[1])
        // 直接启动函数
        this.come()
    }
    
    // 设置构造元素的方法，根据功能记性分开设置
    // 汇集入口，在这里统一进行调用，也就是实例
    Mag.prototype.come = function () {
        this.ratio() //调整比例
        this.overOut() //鼠标移入移出
        this.move() //鼠标哦移动范围
      this.choose()//切换盒子
    
    }
    // 调整比例
    Mag.prototype.ratio = function () {
        // 遮罩盒子 = 展示盒子*放大盒子 / 背景图
        this.maskWidth = this.showWidth * this.enlargeWidth / this.bgWidth
        this.maskHeight = this.showHeight * this.enlargeHeight / this.bgHeight
        // 计算出尺寸然后进行赋值
        this.mask.style.width = this.maskWidth + 'px'
        this.mask.style.height = this.maskHeight + 'px'
    }
    // 移入移出功能
    Mag.prototype.overOut = function () {
        /* 
        鼠标移入，遮罩出现，放大盒子出现
        鼠标移出，遮罩消失，方放大盒子消失
        */
        this.show.addEventListener('mouseover', () => {
            //    鼠标移入是的效果
            this.mask.style.display = 'block'
            this.enlarge.style.display = 'block'
        })
        this.show.addEventListener('mouseout', () => {
            //    鼠标移入是的效果
            this.mask.style.display = 'none'
            this.enlarge.style.display = 'none'
        })
    
    }
    // 移动范围
    Mag.prototype.move = function () {
        // console.log('123')
        /* 
        设置遮罩的移动范围,先进行绑定事件
        offset相对于点击元素左上角位置，需要CSS样式pointer-events:none;进行配合，设置遮罩不作为目标元素
        */
        this.show.addEventListener('mousemove', e => {
            // 设置兼容
            e = e || window.event
            // 获取鼠标位置,键入遮罩盒子的一半是让鼠标在遮罩盒子中心
            let mouseX = e.offsetX - this.maskWidth / 2
            let mouseY = e.offsetY - this.maskHeight / 2
            // console.log(mouseX,mouseY)
            // 设置界限
            if (mouseX <= 0) mouseX = 0
            if (mouseY <= 0) mouseY = 0
            if (mouseX >= this.showWidth - this.maskWidth) mouseX = this.showWidth - this.maskWidth
            if (mouseY >= this.showHeight - this.maskHeight) mouseY = this.showHeight - this.maskHeight
            // 最后将鼠标的位置赋值给遮罩的top和left
            this.mask.style.left = mouseX + 'px'
            this.mask.style.top = mouseY + 'px'
            // 通过鼠标的位置遮罩的位置，然后在设置背景图的位置
            const bgX = this.enlargeWidth * mouseX / this.maskWidth
            const bgY = this.enlargeHeight * mouseY / this.maskHeight
            this.enlarge.style.backgroundPosition = `-${bgX}px -${bgY}px`
        })
       
        
    }
    
    // 选项卡切换功能
    /* 
    点击下方选项卡，进行切换展示图片和放大图片
    将时间委托给父元素
    
    */
    Mag.prototype.choose = function () {
        // 点击事件，委托给切换盒子cut
        this.cut.addEventListener('click', e => {
            // e的兼容处理
            e = e || window.event
            // 目标的兼容处理
            const target = e.target || e.srcElement
            // 判断点击的是那个图片，获取这个图片身上的自定义属性，然后赋值给展示盒子和放大盒子
            if (target.nodeName === "IMG") {
                const showUrl = target.getAttribute('show')
                const bgUrl = target.getAttribute('bg')
                // 对展示盒子和放大盒子进行设置样式
                this.show.firstElementChild.src = showUrl
                this.enlarge.style.backgroundImage = `url(${bgUrl})`
                // 将所有的p标签去掉选中属性
                for (let i = 0; i < this.cut.children.length; i++) {
                    this.cut.children[i].classList.remove('pintch')
                }
                target.parentElement.classList.add('pintch')
            }
        })
    
    }
    // 构造函数的实例，也就是进行调用
    var pro = new Mag('#glassBox')
    }
    