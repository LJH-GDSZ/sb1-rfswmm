const app = getApp()

Page({
  data: {
    restaurant: null,
    recommendations: []
  },
  onLoad(options) {
    const { id } = options
    const restaurant = app.globalData.restaurants.find(r => r.id === parseInt(id))
    if (restaurant) {
      this.setData({ restaurant })
      this.loadRecommendations()
    }
  },
  loadRecommendations() {
    // 模拟加载推荐美食
    const recommendations = app.globalData.restaurants
      .filter(r => r.id !== this.data.restaurant.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
    this.setData({ recommendations })
  },
  goToRestaurantDetail(e) {
    const restaurantId = e.currentTarget.dataset.id
    wx.redirectTo({
      url: `/pages/restaurantDetail/restaurantDetail?id=${restaurantId}`
    })
  }
})