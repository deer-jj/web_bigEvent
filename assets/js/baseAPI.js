// 每次调用GET、POST、AJAX函数之前都会首先调用此函数

// 此函数给定配置对象
$.ajaxPrefilter(function(options) {
    // 发起请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})