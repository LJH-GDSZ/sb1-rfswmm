const app = getApp()

Page({
  data: {
    orders: []
  },
  onShow() {
    this.loadOrders()
  },
  onPullDownRefresh() {
    this.loadOrders(true)
  },
  loadOrders(refresh = false) {
    const orders = app.globalData.orders || []
    this.setData({ orders })

    if (refresh) {
      wx.stopPullDownRefresh()
    }
  },
  deleteOrder(e) {
    const orderId = e.currentTarget.dataset.id
    const newOrders = this.data.orders.filter(order => order.id !== orderId)
    this.setData({
      orders: newOrders
    })
    app.globalData.orders = newOrders
  },
  payOrder(e) {
    const orderId = e.currentTarget.dataset.id
    // 这里应该跳转到支付页面或调用支付API
    wx.showToast({
      title: '支付功能待实现',
      icon: 'none'
    })
  }
})