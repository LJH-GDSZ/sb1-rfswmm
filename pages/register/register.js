const app = getApp()
const { validatePhone, validatePassword } = require('../../utils/validator')

Page({
  data: {
    phone: '',
    password: '',
    confirmPassword: ''
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
  onConfirmPasswordInput(e) {
    this.setData({
      confirmPassword: e.detail.value
    })
  },
  register() {
    const { phone, password, confirmPassword } = this.data
    if (!validatePhone(phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return
    }
    if (!validatePassword(password)) {
      wx.showToast({
        title: '密码至少6个字符，包含字母和数字',
        icon: 'none'
      })
      return
    }
    if (password !== confirmPassword) {
      wx.showToast({
        title: '两次输入的密码不一致',
        icon: 'none'
      })
      return
    }
    // 这里应该调用后端API进行注册
    // 为演示目的，我们直接模拟注册成功
    wx.showLoading({
      title: '注册中...',
    })
    setTimeout(() => {
      wx.hideLoading()
      // 模拟注册成功，保存用户信息
      const userInfo = { phone }
      app.globalData.userInfo = userInfo
      wx.setStorageSync('userInfo', userInfo)
      wx.showToast({
        title: '注册成功',
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/user/user'
            })
          }, 2000)
        }
      })
    }, 1500)
  }
})