const app = getApp()

Page({
  data: {
    userInfo: null,
    isLoggedIn: false,
    menuItems: [
      { title: '我的钱包', icon: '/assets/wallet.png' },
      { title: '我的评价', icon: '/assets/review.png' },
      { title: '我的优惠券', icon: '/assets/coupon.png' },
      { title: '客服中心', icon: '/assets/customer-service.png' },
      { title: '设置', icon: '/assets/settings.png' },
      { title: '隐私政策', icon: '/assets/privacy.png' }
    ]
  },
  onShow() {
    this.checkLoginStatus()
  },
  checkLoginStatus() {
    const userInfo = app.globalData.userInfo
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        isLoggedIn: true
      })
    } else {
      this.setData({
        userInfo: null,
        isLoggedIn: false
      })
    }
  },
  goToLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          app.updateUserInfo(null)
          this.setData({
            userInfo: null,
            isLoggedIn: false
          })
        }
      }
    })
  },
  onMenuItemTap(e) {
    const { index } = e.currentTarget.dataset
    const { title } = this.data.menuItems[index]
    wx.showToast({
      title: `${title}功能待实现`,
      icon: 'none'
    })
  }
})