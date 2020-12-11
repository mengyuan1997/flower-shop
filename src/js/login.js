//  指定元素进行验证
     $('#signupForm').validate({
      //  设置规则
       rules:{
        //  验证用户名
         username:{
           required:true,
           minlength:5,
           maxlength:10
         },
        //  验证密码
         password:{
          required:true,
           minlength:5,
           maxlength:10
         },
        //  重复密码
        confirm_password: {
	        required: true,
	        minlength: 5,
	        equalTo: "#password"
	      }
        
       },
      // 设置提示信息
      messages:{
        // 设置账号的提示信息
        username:{
           required:'请填写信息',
           minlength:'最小5个字符',
           maxlength:'最大10字符'
      },
      // 设置密码的提示信息
      password:{
        required:'请填写信息',
           minlength:'最小5个字符',
           maxlength:'最大10字符'
         },
        //  密码重复提示信息
        confirm_password:{
            required:'请填写信息',
               minlength:'最小5个字符',
               maxlength:'最大10字符',
               equalTo: "两次密码输入不一致"
             }
        },
        //  表单验证通过之后会执行的函数,form表示接受的是表单标签
        submitHandler(form){
        // $('.submit').on('submit',() =>{
            const info = $(form).serialize()
            //  获取到用户输入的信息
            //  console.log(info)
            // 向后端发送数据
            $.post('/dl/login.php',info,null,'json').then(function(res){
            // $.post('../server/login.php',info,null,'json').then(function(res){
              if(res.code === 1){
                setCookie('nickname', res.nickname)
                window.location.href = '../html/index.html'
              }else{
                // console.log($('#hinf'))
              $('#hinf').css('display','block')
              //  直接进行注册
              $('#hinf > .yes').on('click',() => {
               
              //  向后端发送账号信息
                $.post('/dl/signin.php',info,null,'json').then(function(res){
                  setCookie('nickname', res.username) 
                  window.location.href = '../html/index.html'
                })
               

              })
              $('#hinf > .no').on('click',() => {
                window.location.reload()
              })
              }  
            })
        // })
        }
      })

