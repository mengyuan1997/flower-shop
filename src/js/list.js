// 获取cookie确定一级分类
const classOne = getCookie('class_one')
// console.log(class_one)
// 准备入口函数
$(function () {
    // 准备一个变量接受所有的商品信息
    let goods = null
    // 影响页面渲染的数据
    const goods_info = {
        class_one: classOne,
        class_two: 'all',
        sort_method: '价格',
        sort_price: 'ASC',
        current: 1,
        pagesize: 20
    }
    // console.log(goods_info.class_one)
    // 设置一级分类选中
    
    // 获取一级分类用于渲染
    getClassOne()
    async function getClassOne() {
        const class_one_list = await $.get('/dl/getClassOne.php', null, null, 'json')
        
        let str = ''
        class_one_list.list.forEach(item => {
            str += `
    <li data-one="${item.class_one}">${item.class_one}</li>
    `
        })
        $('#class_one').html(str)

        // console.log($('#class_one').find('li'))
       
        $('#class_one').find('li').each((index,item) => {
            if($(item).data('one') == classOne){
                $(item).addClass('active')
            }
            
        })
    }

    // 获取二级分类
    getClassTwo()
    async function getClassTwo() {
        
        const class_two_list = await $.get('/dl/getClassTwo.php', {classOne:goods_info.class_one}, null, 'json')
        // console.log(class_two_list)
        let str = ` <li data-two="all"class='active'>全部</li>`
        class_two_list.list.forEach(item => {
            str += `
    <li data-two="${item.class_two}">${item.class_two}</li>
    `
        })
        $('#class_two').html(str)

    }
    // 获取商品页数
    getPage()
   async function getPage(){
        const pageNum = await $.get('/dl/getPage.php',goods_info,null,'json')
        // console.log(pageNum.number)
        $('#paging > .main').pagination({
            pageCount: pageNum.number,
            current: 1, // 当前是第几页
            coping: true,
            keepShowPN:true,
            activeCls:'pitch',
    prevContent: '上页',
    nextContent: '下页',
            callback (index) {
              goods_info.current = index.getCurrent()
            //   从新请求商品列表
              getGoodsList()
            }
          })
    }
    // 获取商品列表
    getGoodsList()
    async function getGoodsList(){
        const goodsList = await $.get('/dl/getGoodsList.php',goods_info,null,'json')
        goods = goodsList.list
        // console.log(goods)
        let str = ''
        goodsList.list.forEach(item => {
            str += `
            <div >
            <div class="index_img" data-id=${item.Id}>
               <img src="${item.shop_img} " alt="">
            </div>
            <h5 data-id=${item.Id}>${item.price}</h5>
             <h6 data-id=${item.Id}>${item.title}</h6>
             <p>
                 <a  class="btn btn-primary cartBox" role="button" data-id=${item.Id} > <img src="../images/icon_cart.png" alt="" > 加入购车</a> 
                 <a  class="btn btn-default" role="button">  收藏</a>
                <a  class="btn btn-default" role="button"> <img src="../images/kefu.png" alt=""></a>
            </p>
         </div>
            `
        })
        $('#list > .goods').html(str)
    }
    // 一级分类点击
    $('#class_one').on('click','li',function(){
        $(this).addClass('active').siblings().removeClass('active')
        // console.log($(this).data('one'))
        // 将点击的这个进行设置
        const one = $(this).data('one')
        goods_info.class_two = 'all'
        goods_info.current = 1
        goods_info.class_one = one
        // 渲染二级分类和页面
        getClassTwo()
        getPage()
        getGoodsList()
    })
    // 二级分类点击
    $("#class_two").on('click','li',function(){
        $(this).addClass('active').siblings().removeClass('active')
        // console.log($(this).data('two'))
        // 将点击的这个进行设置
        const two = $(this).data('two')
        goods_info.current = 1
        goods_info.class_two = two
        // 渲染二级分类和页面
        getPage()
        getGoodsList()
    })
// 排序点击
$('#price').on('click','li',function(){
    // 添加类名
    $(this).toggleClass('active')
    // 获取并设置
    const type = $(this).attr('data-type')
    // console.log(type)
    goods_info.sort_price = type
    // 渲染
    getPage()
    getGoodsList()
    // 为下次准备
    $(this).attr('data-type',type === 'ASC' ? 'DESC' :'ASC')
})
// 点击跳转详情页
$('#list .goods').on('click','.index_img',function(){
    const shop_id = $(this).data('id')
    // console.log(shop_id)
    setCookie('shop_id',shop_id)
    window.location.href = '../html/details.html'
})
$('#list .goods').on('click','div h6',function(){
    const shop_id = $(this).data('id')
    // console.log(shop_id)
    setCookie('shop_id',shop_id)
    window.location.href = '../html/details.html'
})
$('#list .goods').on('click','div h5',function(){
    const shop_id = $(this).data('id')
    // console.log(shop_id)
    setCookie('shop_id',shop_id)
    window.location.href = '../html/details.html'
})
// 加入购物车操作

// $('#list .goods').on('click', '.cartBox', function () {
//     // 4-2. 拿到 localStorage 里面有没有数组
//     const cart = JSON.parse(window.localStorage.getItem('cart')) || []

//     // 多一个拿到 id 的操作
//     const id = $(this).data('id')
//     // console.log(id)



    
//     // 4-3. 判断一下 cart 数组里面有没有这个数据
//     const flag = cart.some(item => item.goods_id == id)
//     // console.log(flag)
//     if (flag) {
//       // 4-4. 如果有这个数据拿到这个信息
//       const cart_goods = cart.filter(item => item.goods_id == id)[0]
//       cart_goods.cart_number = cart_goods.cart_number - 0 + 1
//     } else {
//       // 拿到当前商品 id 所属的信息
//       const info = goods.filter(item => item.goods_id == id)[0]
//       info.cart_number = 1
//       cart.push(info)
//     }

//     // 4-5. 添加完毕还要存储到 localStorage 里面
//     window.localStorage.setItem('cart', JSON.stringify(cart))
//   })  

$('#list .goods').on('click','.cartBox',function(){
    // console.log(1)
    // 获取购物车列表
    const  cart = JSON.parse(window.localStorage.getItem('cart')) || []
    const shop_id = $(this).data('id')
    // console.log(shop_id)
    // 在购物车里面查找本条数据
   const flag = cart.some(function(item){
       item.shop_id == shop_id
   })
//    console.log(flag)
//    有数据
   if(flag){
       const cart_goods = cart.filter(item => item.shop_id == shop_id)[0]
       cart_goods.cart_number = cart_goods.cart_number - 0 + 1
   }else{
    //    没数据
       const info = goods.filter(item => item.shop_id == shop_id)[0]
       info.cart_number = 1
       cart.push(info)
       console.log(1)
   }
//    将数据放到本地服务器
   window.localStorage.setItem('cart',JSON.stringify(cart))
})


})

