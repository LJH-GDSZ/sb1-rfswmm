const app = getApp()
const { validatePhone, validatePassword } = require('../../utils/validator')

Page({
  data: {
    phone: '',
    password: ''
  },
  onPhoneInput(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },
  login() {
    const { phone, password } = this.data
    if (!validatePhone(phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return
    }
    if (!validatePassword(password)) {
      wx.showToast({
        title: '密码格式不正确',
        icon: 'none'
      })
      return
    }
    // 这里应该调用后端API进行验证
    // 为演示目的，我们直接模拟登录成功
    wx.showLoading({
      title: '登录中...',
    })
    setTimeout(() => {
      wx.hideLoading()
      const userInfo = { phone }
      app.globalData.userInfo = userInfo
      wx.setStorageSync('userInfo', userInfo)
      wx.switchTab({
        url: '/pages/user/user'
      })
    }, 1500)
  },
  goToRegister() {
    wx.navigateTo({
      url: '/pages/register/register'
    })
  },
  goToResetPassword() {
    wx.navigateTo({
      url: '/pages/resetPassword/resetPassword'
    })
  }
})