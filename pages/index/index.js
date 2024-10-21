const app = getApp()

Page({
  data: {
    searchValue: '',
    categories: ['快餐', '中餐', '西餐', '日料', '韩餐'],
    restaurants: [],
    filteredRestaurants: [],
    page: 1,
    pageSize: 10,
    hasMore: true,
    hasItemsInCart: false,
    selectedCategory: ''
  },
  onLoad() {
    this.loadRestaurants()
  },
  onPullDownRefresh() {
    this.setData({ page: 1, hasMore: true })
    this.loadRestaurants(true)
  },
  onReachBottom() {
    if (this.data.hasMore) {
      this.loadRestaurants()
    }
  },
  loadRestaurants(refresh = false) {
    // 模拟从服务器加载餐厅数据
    setTimeout(() => {
      const newRestaurants = Array(this.data.pageSize).fill(0).map((_, index) => ({
        id: this.data.restaurants.length + index + 1,
        name: `美食${this.data.restaurants.length + index + 1}`,
        image: `/pages/assets/restaurant${(this.data.restaurants.length + index) % 14 + 1}.png`,
        openTime: '10:00-22:00',
        price: '¥20起',
        deliveryTime: '30-45分钟',
        address: '广州市海珠区新港中路397号',
        quantity: 0,
        category: this.data.categories[Math.floor(Math.random() * this.data.categories.length)],
        rating: (Math.random() * 2 + 3).toFixed(1), // 生成3.0到5.0之间的随机评分
        reviewCount: Math.floor(Math.random() * 1000) + 1 // 生成1到1000之间的随机评价数
      }))

      const restaurants = refresh ? newRestaurants : [...this.data.restaurants, ...newRestaurants]
      const hasMore = restaurants.length < 50 // 假设总共有50家餐厅

      this.setData({
        restaurants,
        filteredRestaurants: restaurants,
        page: this.data.page + 1,
        hasMore
      })

      app.globalData.restaurants = restaurants

      if (refresh) {
        wx.stopPullDownRefresh()
      }
    }, 1000)
  },
  onSearch(e) {
    this.setData({
      searchValue: e.detail.value
    })
    this.searchRestaurants()
  },
  onSearchConfirm(e) {
    this.setData({
      searchValue: e.detail.value
    })
    this.searchRestaurants()
  },
  searchRestaurants() {
    const { searchValue, restaurants, selectedCategory } = this.data
    let filteredRestaurants = restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    if (selectedCategory) {
      filteredRestaurants = filteredRestaurants.filter(restaurant => 
        restaurant.category === selectedCategory
      )
    }
    this.setData({ filteredRestaurants })
  },
  selectCategory(e) {
    const category = e.currentTarget.dataset.category
    this.setData({
      selectedCategory: this.data.selectedCategory === category ? '' : category
    }, () => {
      this.searchRestaurants()
    })
  },
  goToRestaurantDetail(e) {
    const restaurantId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/restaurantDetail/restaurantDetail?id=${restaurantId}`
    })
  },
  stopPropagation() {
    // 这个方法现在是空的，但我们保留它以防将来需要
  },
  increaseQuantity(e) {
    const { id } = e.currentTarget.dataset
    this.updateRestaurantQuantity(id, 1)
  },
  decreaseQuantity(e) {
    const { id } = e.currentTarget.dataset
    this.updateRestaurantQuantity(id, -1)
  },
  updateQuantity(e) {
    const { id } = e.currentTarget.dataset
    const quantity = parseInt(e.detail.value) || 0
    this.updateRestaurantQuantity(id, quantity, true)
  },
  updateRestaurantQuantity(id, change, absolute = false) {
    const { restaurants, filteredRestaurants } = this.data
    const updateRestaurant = (list) => {
      const index = list.findIndex(r => r.id === id)
      if (index !== -1) {
        const restaurant = list[index]
        restaurant.quantity = absolute ? change : Math.max(0, (restaurant.quantity || 0) + change)
        list[index] = restaurant
      }
    }
    updateRestaurant(restaurants)
    updateRestaurant(filteredRestaurants)
    this.setData({ restaurants, filteredRestaurants })
    this.updateCartStatus()
  },
  updateCartStatus() {
    const hasItemsInCart = this.data.restaurants.some(r => r.quantity > 0)
    this.setData({ hasItemsInCart })
  },
  confirmOrder() {
    const orders = this.data.restaurants
      .filter(r => r.quantity > 0)
      .map(r => ({
        id: Date.now() + Math.random().toString(36).substr(2, 5),
        restaurant: r.name,
        items: [`${r.name} x ${r.quantity}`],
        total: r.quantity * 20, // 假设每个商品20元
        status: '未付款'
      }))
    
    if (orders.length === 0) {
      wx.showToast({
        title: '请先选择商品',
        icon: 'none'
      })
      return
    }

    app.globalData.orders = [...(app.globalData.orders || []), ...orders]
    
    // 重置所有餐厅的数量
    const resetRestaurants = this.data.restaurants.map(r => ({...r, quantity: 0}))
    const resetFilteredRestaurants = this.data.filteredRestaurants.map(r => ({...r, quantity: 0}))
    
    this.setData({
      restaurants: resetRestaurants,
      filteredRestaurants: resetFilteredRestaurants,
      hasItemsInCart: false
    })

    wx.showToast({
      title: '订单已生成',
      icon: 'success',
      duration: 2000,
      success: () => {
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/orders/orders'
          })
        }, 2000)
      }
    })
  }
})