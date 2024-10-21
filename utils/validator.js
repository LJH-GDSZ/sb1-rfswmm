const validatePhone = (phone) => {
  const phoneRegex = /^1[3-9]\d{9}$/
  const repeatingDigits = /(\d)\1{4,}/
  return phoneRegex.test(phone) && !repeatingDigits.test(phone)
}

const validatePassword = (password) => {
  // 密码至少包含 6 个字符，至少包含字母（大写或小写）和数字
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
  return passwordRegex.test(password)
}

module.exports = {
  validatePhone,
  validatePassword
}