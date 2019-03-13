接口文档:

1.用户发送验证码
方式:'post'
地址:'http://localhost:3000/user/send'
参数：userNumber(string)
返回参数：resultcode //请求状态
            0000：请求成功
         data       //返回数据
            result:返回状态
              00：发送成功
              01：发送失败
            text:文字描述
2.用户注册
方式：post
地址：'http://localhost:3000/user/register'
参数：userNumber用户名
     password密码
     sendNumber验证码
返回参数：resultcode //请求状态
            0000：请求成功
         data       //返回数据
            result
              00：注册成功
              01：用户已存在
              10：验证码不正确
              11：验证码已过期
            text
3.用户登录
方式：post
地址：'http://localhost:3000/user/login'
参数：userNumber用户名
      password密码
返回参数：resultcode //请求状态
            0000：请求成功
         data       //返回数据
            result
              00：登录成功
              01：用户名或密码错误
              10：用户不存在
            text
            userInfo
              userNumer
              userId
4.发表文章：
方式：post
地址：'http://localhost:3000/article/articlePush'
参数：userId        //用户id
      articleName  //文章名字
      articleTxt   //文章内容
返回参数：resultcode //请求状态
            0000：请求成功
         data       //返回数据
            result
              00：发表成功
            text
5.收藏文章：
方式：post
地址：'http://localhost:3000/article/articleCollect'
参数：userId        //用户id
      collectId     //文章id
返回参数：resultcode //请求状态
            0000：请求成功
         data       //返回数据
            result
              00：收藏成功
              01：取消收藏成功
            text

6.获取发表文章：
方式：post
地址：'http://localhost:3000/article/getPush'
参数：userId        //用户id
返回参数：resultcode //请求状态
            0000：请求成功
         data       //返回数据
            result
              00：查询成功
              01：无发表
            text
            array：返回文章对象数组
7.获取收藏文章：
方式：post
地址：'http://localhost:3000/article/getCollect'
参数：userId        //用户id
返回参数：resultcode //请求状态
            0000：请求成功
         data       //返回数据
            result
              00：查询成功
              01：无收藏
            text
            array:返回文章对象数组
8.药品分类展示：
方式：post
地址：'http://localhost:3000/drug/drugShow'
参数：cate        //分类id
        1：感冒药
        2：解热镇痛药
        3：镇咳化痰药
        4：清咽消暑药
返回参数：resultcode //请求状态
            0000：请求成功
         data       //返回数据
            result
              00：查询成功
              01：无此类药品
            text
9.药品详情页：
方式：post
地址：'http://localhost:3000/drug/drugInfo'
参数：drugId      //药品id
返回参数：resultcode //请求状态
            0000：请求成功
         data       //返回数据
            result
              00：查询成功
              01：无此药品
            text

