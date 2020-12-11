// 轮播图
$(function(){
// banner图
class Banner {
    constructor(ele) {
        //    获取范围元素，最大的盒子，图片盒子，焦点盒子，左右盒子
        this.ele = document.querySelector(ele)
        this.imgBox = this.ele.querySelector('.imgBox')
        this.dotBox = this.ele.querySelector('.dot')
        // console.log(this.dotBox)
     // 设置索引
        this.index = 0
        // 设置定时器返回值
        this.timer = 0
        // 设置函数入口
        this.init()
    }
    // 函数汇集
    init() {
        // 汇集下面的所有函数方法
        this.setDot()//设置焦点
        this.autoplay()//自动切换
        this.overOut()//鼠标移入移出
        
        this.cutDot()//焦点切换
    }
    // 这是焦点
    /* 
    获取图片数量，焦点数量和图片数量保持一致，并设置第一个为默认选中
    */
    setDot() {
        // 获取图片数量
        this.dotNum = this.imgBox.children.length
        // console.log(this.dotNum)
        // 创建一个文档碎片
        const fragment = document.createDocumentFragment()
        // 遍历循环，创建li节点，并将节点放置在文档碎片
        for (let i = 0; i < this.dotNum; i++){
            const li = document.createElement('li')
            if(i === 0 )li.classList.add('show')
            // 对li添加索引，后面进行使用
            li.setAttribute('dotIndex',i)
            // 将li添加到文档碎片中
            fragment.appendChild(li)
        }
        this.dotBox.appendChild(fragment)
        // 设置焦点宽度,设置盒子的宽度 = 数量 * 20 * 1.5 +'px'
        this.dotBox.style.width = this.dotNum * 20 * 1.5 +'px'
       

    }
    // 将图片动起来
    changOne(type){
        
        // 然当前图片消失
        this.imgBox.children[this.index].classList.remove('show')
        this.dotBox.children[this.index].classList.remove('show')
       
        // 修改索引为其他，如果是向左就是ture,像右是false ，其他是直接相等
        if(type === true){
            this.index++
        }else if(type === false){
            this.index--
        }else{
            this.index = type
        }
       // 调整索引，如果索引大于最大的索引，就设置成0，如果小于0就长度减1
       if(this.index >= this.imgBox.children.length)this.index = 0
       if(this.index < 0) this.index = this.imgBox.children.length - 1
        // 让当前这张进行显示
        // this.imgBox.children[this.index].classList.add('active')
        this.imgBox.children[this.index].classList.add('show')
        this.dotBox.children[this.index].classList.add('show')
    }
    // 使其运动
    autoplay(){
        // 开启定时器，在定时器里面调用图片动起来
        this.timer = setInterval(() => {
            // 调用一张图片动起来的方法
            this.changOne(true)
        },2000)
    }
    // 鼠标移入移出
    overOut(){
        // 鼠标移入敞口，定时器关闭，移出窗口定时器打开
        this.ele.addEventListener('mouseover',() =>  clearInterval(this.timer) )
        this.ele.addEventListener('mouseout' , ()=> this.autoplay() )
    }
    
    // 点击焦点尽心切换
    cutDot(){

        // 点击焦点直接进行跳转，使用事件委托
        this.dotBox.addEventListener('click' , e => {
            // console.log(123)
            e = e || window.event
            const target =e.target || e.srcElement

            if(target.nodeName === 'LI'){
                const i = target.getAttribute('dotIndex') - 0
                this.changOne(i)
            }
        })
    }
    // 页面切换
    cutPage(){
        document.addEventListener('visibilitychange' , () =>{
            const start = document.visibilityState

            if(start === 'hidden') clearInterval(this.timer)
            if(start === 'visible') this.autoplay()
        })
    }
}
new Banner('.banner')
})
// 滑动导航
$('.classify > ul>li').mouseover(function(){
    $('.classify > ul>span').css('left',$(this).index() * 100).html($(this).html())
})


// 楼层导航
$('#subject ol>li').click(function() {
    $('html').animate({scrollTop:$('#subject ul>li').eq($(this).index()).offset().top - 60})
    $(this).addClass('active').siblings().removeClass('active')
  })
//   滚动条滚动
  $(window).scroll(function(){
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
//   console.log(scrollTop)
//   吸顶效果设置出来
  const windowHeight = document.documentElement.clientHeight
  const lis = $('#subject ul>li')
  for(let i = 0;i < lis.length; i++){
    const liTop = $(lis[i]).offset().top
    const liHeight = $(lis[i]).outerHeight()
    if(liTop <= scrollTop + windowHeight){
      $('#subject ol>li').removeClass('active').eq(i).addClass('active')
    }
  }

  if(scrollTop < '600'){
    $('#ceiling').slideUp(500).css('display','none')
}
if(scrollTop >= '600'){
    $('#ceiling').slideDown(500).css('display','flax')
}

  })

  // 获取cookie
// $(function(){
//     const nickname = getCookie('nickname')
//     // console.log(nickname)
//     if(nickname){
//         $('.topLeft').html(`${nickname}&nbsp;,欢迎回来`).css('color','red')
//         $('#ceiling .shop').html(`${nickname}&nbsp;,您好`).css('color','red')
//         // console.log('登陆')
//     }
// })
// 一级分类设置
$('#subject > ul > li >p').on('click',function(){
   
    const class_one =  $(this).attr('class_one')
    setCookie('class_one',class_one )
    window.location.href = '../html/list.html' 
})
// 商品渲染
const list = null
const show = {
    love : $('.love').attr('show'),
    festival : $('.festival').attr('show'),
    fete : $('.fete').attr('show'),
    other : $('.other').attr('show')
}
$(
    async function(){
        const getLove = await $.get('/dl/getIndexShop.php',{show:show.love},null,'json')
        // console.log(getLove.list)
        // 渲染页面
        let str = ''
        getLove.list.forEach((item) => {
            str += `
            <div class="shopId" data-id="${item.Id}">
                        <div class="index_img">
                            <img src="${item.shop_img}" alt="">
                        </div>
                        <p>${item.title}</p>
                        <span>${item.price}</span>
                    </div>
            `
        })
        $('#subject .love').html(str)
    }
)
$(
    async function(){
        const getFestival = await $.get('/dl/getIndexShop.php',{show:show.festival},null,'json')
        // 渲染页面
        let str = ''
        getFestival.list.forEach((item) => {
            str += `
            <div class="shopId" data-id="${item.Id}">
                        <div class="index_img">
                            <img src="${item.shop_img}" alt="">
                        </div>
                        <p>${item.title}</p>
                        <span>${item.price}</span>
                    </div>
            `
        })
        $('#subject .festival').html(str)
    }

)
$(
    async function(){
        const getFete = await $.get('/dl/getIndexShop.php',{show:show.fete},null,'json')
        // 渲染页面
        let str = ''
        getFete.list.forEach((item) => {
            str += `
            <div class="shopId" data-id="${item.Id}">
                        <div class="index_img">
                            <img src="${item.shop_img}" alt="">
                        </div>
                        <p>${item.title}</p>
                        <span>${item.price}</span>
                    </div>
            `
        })
        $('#subject .fete').html(str)
    }

)
$(
    async function(){
        const getOther = await $.get('/dl/getIndexShop.php',{show:show.other},null,'json')
        // 渲染页面
        let str = ''
        getOther.list.forEach((item) => {
            str += `
            <div class="shopId" data-id="${item.Id}">
            
                        <div class="index_img">
                            <img src="${item.shop_img}" alt="">
                        </div>
                        <p>${item.title}</p>
                        <span>${item.price}</span>
                    </div>
            `
        })
        $('#subject .other').html(str)
    }

)

// 点击商品进行跳转
$('#subject ul li').on('click','div.shopId',function() {
   const shop_id =  $(this).data('id')
   console.log(shop_id)

   setCookie('shop_id', shop_id) 
   window.location.href = '../html/details.html'

})