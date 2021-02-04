$(function() {
        // 调用getUserInfo获取用户信息
        getUserInfo()
            // 绑定‘退出’点击事件
        var layer = layui.layer
        $('#exitBtn').on('click', function() {
            // 提示是否退出
            layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {

                // 1. 清空本地存储中的token
                localStorage.removeItem('token')
                    // 2. 重新跳转到登录页面
                location.href = '/login.html'
                    // 关闭confirm询问框
                layer.close(index);
            });
        })
    })
    // 获取用户信息函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers即请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                // 获取用户信息成功之后将其渲染到个人信息项
                renderAvatar(res.data)
            }
            // // 不论成功还是失败，最终都会调用 complete 回调函数
            // complete: function(res) {
            //     // console.log('执行了 complete 回调：')
            //     // console.log(res)
            //     // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         // 1. 强制清空 token
            //         localStorage.removeItem('token')
            //             // 2. 强制跳转到登录页面
            //         location.href = '/login.html'
            //     }
            // }

    })
}
// 渲染用户信息到个人信息项
function renderAvatar(user) {
    // 1.获取用户昵称
    var name = user.nickname || user.username;
    console.log(name);
    // 2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 3.按需渲染用户头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img').attr('src', 'user.user_pic').show()
        $('.text-avatar').hide();
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()

    }
}