$(function() {
    // 点击"去注册账号"和“去登录”的链接，实现跳转
    $('#link-reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link-login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    var form = layui.form;
    var layer = layui.layer;
    // 通过form.verify()自定义检验规则
    form.verify({
        // 自定义pwd的密码框验证规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 自定义两次输入密码是否一致的校验规则
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次输入的密码不一致!'
            }
        }
    })


    // 监听用户注册表单的事件
    $('#form_reg').on('submit', function(e) {
        // 1.阻止表单表单默认提交行为
        // console.log(this);
        e.preventDefault();
        // 2. 发起Ajax的post请求
        var data = {
            username: $('#form_reg input[name=username]').val(),

            password: $('#form_reg input[name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')
                // 注册成功后手动添加点击“去登录”事件 实现页面跳转
            $('#link-login').click()
        })

        // 监听用户登录表单事件
        $('#form_login').submit(function(e) {
            e.preventDefault()
            $.ajax({
                url: '/api/login',
                method: 'POST',
                // 快速获取表单数据
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('登录失败！')
                    }
                    layer.msg('登录成功！')
                        //    将登录成功的token值保存到localStorage中
                    localStorage.setItem('token', res.token)
                        // console.log(res.token);
                        // 跳转到后台主页
                    location.href = '/index.html'
                }
            })
        })

    })
})