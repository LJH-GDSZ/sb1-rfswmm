const { validatePhone, validatePassword } = require('../../utils/validator')

Page({
  data: {
    step: 1,
    phone: '',
    verificationCode: '',
    newPassword: '',
    confirmPassword: ''
  },
  onPhoneInput(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  onVerificationCodeInput(e) {
    this.setData({
      verificationCode: e.detail.value
    })
  },
  onNewPasswordInput(e) {
    this.setData({
      newPassword: e.detail.value
    })
  },
  onConfirmPasswordInput(e) {
    this.setData({
      confirmPassword: e.detail.value
    })
  },
  sendVerificationCode() {
    const { phone } = this.data
    if (!validatePhone(phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return
    }
    // 这里应该调用后端API发送验证码
    wx.showToast({
      title: '验证码已发送',
      icon: 'success'
    })
  },
  verifyCode() {
    const { verificationCode } = this.data
    if (verificationCode.length !== 6) {
      wx.showToast({
        title: '请输入6位验证码',
        icon: 'none'
      })
      return
    }
    // 这里应该调用后端API验证验证码
    this.setData({
      step: 2
    })
  },
  resetPassword() {
    const { newPassword, confirmPassword } = this.data
    if (!validatePassword(newPassword)) {
      wx.showToast({
        title: '密码至少8个字符，包含大小写字母和数字',
        icon: 'none'
      })
      return
    }
    if (newPassword !== confirmPassword) {
      wx.showToast({
        title: '两次输入的密码不一致',
        icon: 'none'
      })
      return
    }
    // 这里应该调用后端API重置密码
    wx.showLoading({
      title: '重置密码中...',
    })
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '密码重置成功',
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(() => {
            wx.navigateBack({
              delta: 2
            })
          }, 2000)
        }
      })
    }, 1500)
  }
})