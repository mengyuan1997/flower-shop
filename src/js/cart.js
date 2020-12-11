$(function(){
    const nickname = getCookie('nickname')
    if(!nickname) return window.location.href = '../html/login.html'
    const  cart = JSON.parse(window.localStorage.getItem('cart')) || []
    // console.log(cart)
// 判断购物车里面是否具有数据
    if(!cart.length){
        // 表示购物车里面没有数据
        $('.cartMain').addClass('hide').siblings().removeClass('hide')
        return 
    }
// 表示购物车里面有数据
    $('.empty').addClass('hide').siblings().removeClass('hide')

    // 根据购物车里面的数据进行渲染页面
console.log(cart)
    bindHtml()
    function bindHtml(){
    // console.log(cart)

        // 计算商品数量和价格
        const selectAll = cart.every(item => item.is_select == '1' )
        // console.log(selectAll)
        let total = 0
        let totalMony = 0

        cart.forEach(item => {
            if(item.is_select === '1'){
                total += item.cart_number - 0
                // totalMony += item.cart_num * item.price
                totalMony += (item.price - 0) * item.cart_number
                
               
            }
        })

        // 渲染页面
        let str = `
        <table class="haeder main">
        <tr>
            <td class="select">
            <input type="checkbox" ${ selectAll ? 'checked' : '' }>全选
            </td>
            <td class="shop">
                产品
            </td>
            <td class="num">
                数量
            </td>
            <td class="price">
                本店售价
            </td>
            <td class="subtotal">
                小计
            </td>
            <td class="handle">
                操作
            </td>
        </tr>
    </table>
        `


        
        cart.forEach(item => {
        
        str +=  `
        <table class="goods main">
        <tr>
            <td class="select" >
                <input type="checkbox" data-id="${ item.Id }" ${ item.is_select === '0' ? '' : 'checked'}>
            </td>
            <td class="shop">
                <img src="${item.shop_img}" alt="">
                <p>${item.title}</p>
            </td>
            <td class="num">
               <span class="subNum" data-id="${ item.Id }">-</span>
               <input type="text" value="${item.cart_number}" data-id="${ item.Id }">
               <span class="addNum" data-id="${ item.Id }">+</span>
            </td>
            <td class="price">
                <b>￥${item.price}</b>
            </td>
            <td class="subtotal">
                <b>￥${((item.price - 0) * item.cart_number).toFixed(2)}</b>
                
            </td>
            <td class="handle">
                <button data-id="${ item.Id }">删除</button>
            </td>
        </tr>
    </table>
        `
        })
        str += `
        <table class="foot">
        <tr>
            <td class="go">
                <a href="../html/list.html">继续购物</a>
            </td>
            <td class="clearBox">
                <button class="clear">
                    清空购物车
                </button>
            </td>
            <td class="totalBox">
                应付总额：<span class = "total">￥${totalMony.toFixed(2)}</span>
            </td>
            <td class="play">
                <button>去结算</button>
            </td>
        </tr>
    </table>
        `
   
        // console.log(str)
        $('.shopList').html(str)
    }
    // 添加点击事件  选择
   $('.shopList').on('click','.goods .select>input',function(){
       const type = this.checked
       const id = $(this).data('id')
       const info = cart.filter(item => item.Id == id)[0]
       info.is_select = type ? '1' : '0' 
    

        bindHtml()

        window.localStorage.setItem('cart',JSON.stringify(cart))

   })
// ++事件
   $('.shopList').on('click','.goods .num > .addNum',function(){
    const id = $(this).data('id')
    const info = cart.filter(item => item.Id == id)[0]
     info.cart_number = info.cart_number - 0 + 1
     bindHtml()
     window.localStorage.setItem('cart',JSON.stringify(cart))
})

// --事件
$('.shopList').on('click','.goods .num > .subNum',function(){
    const id = $(this).data('id')
    const info = cart.filter(item => item.Id == id)[0]
    if(info.cart_number === 1)  return
    info.cart_number = info.cart_number - 0 - 1
     bindHtml()
     window.localStorage.setItem('cart',JSON.stringify(cart))
})

// 删除事件
$('.shopList').on('click', '.goods .handle > button', function () {
    console.log(12)
    // 拿到商品 id
    const id = $(this).data('id')
    // 删除指定数据
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].Id == id) {
        cart.splice(i, 1)
        break
      }
    }

    // 重新渲染页面
    bindHtml()
    // 从新保存起来
    window.localStorage.setItem('cart', JSON.stringify(cart))

    if (!cart.length) return window.location.reload()
  })

// 全选
$('.shopList').on('click','.haeder .select',function(){
   
    $('.shopList .goods .select > input').prop('checked','checked')
    $('.shopList goods .select>input').prop('checked','checked')

})
$('.shopList').on('click','.foot .clear',function(){
   
    window.localStorage.removeItem('cart')
    window.location.reload()

})

})