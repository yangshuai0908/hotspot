import { ref, onMounted, onUnmounted } from 'vue'

// 时间和日期工具函数

// 天干地支
export const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
export const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
export const lunarMonths = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月']
export const lunarDays = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
  '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十']
export const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

/**
 * 格式化当前时间
 * @param {Date} date - 日期对象，默认为当前时间
 * @returns {string} 格式化后的时间字符串 YYYY-MM-DD HH:MM:SS
 */
export const formatDateTime = (date = new Date()) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

/**
 * 格式化日期
 * @param {Date} date - 日期对象，默认为当前时间
 * @returns {string} 格式化后的日期字符串 YYYY-MM-DD
 */
export const formatDate = (date = new Date()) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  
  return `${year}-${month}-${day}`
}

/**
 * 格式化时间
 * @param {Date} date - 日期对象，默认为当前时间
 * @returns {string} 格式化后的时间字符串 HH:MM:SS
 */
export const formatTime = (date = new Date()) => {
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  
  return `${hours}:${minutes}:${seconds}`
}

/**
 * 计算阴历信息
 * @param {Date} date - 日期对象，默认为当前时间
 * @returns {string} 阴历信息字符串
 */
export const getLunarInfo = (date = new Date()) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekDay = date.getDay()
  
  // 简化的天干地支计算（基于2025年基准）
  const baseYear = 2025
  const yearDiff = year - baseYear
  
  // 年干支
  const yearStemIndex = (1 + yearDiff) % 10
  const yearBranchIndex = (9 + yearDiff) % 12
  const yearGanZhi = heavenlyStems[yearStemIndex] + earthlyBranches[yearBranchIndex]
  
  // 月干支（简化计算）
  const monthStemIndex = (month + 1) % 10
  const monthBranchIndex = (month + 9) % 12
  const monthGanZhi = heavenlyStems[monthStemIndex] + earthlyBranches[monthBranchIndex]
  
  // 日干支（简化计算）
  const dayStemIndex = (day + month * 2) % 10
  const dayBranchIndex = (day + month * 2) % 12
  const dayGanZhi = heavenlyStems[dayStemIndex] + earthlyBranches[dayBranchIndex]
  
  // 阴历月日（简化显示）
  const lunarMonth = lunarMonths[(month - 1) % 12]
  const lunarDay = lunarDays[(day - 1) % 30]
  const weekDayName = weekDays[weekDay]
  
  return `${yearGanZhi}年 ${monthGanZhi}月 ${dayGanZhi}日 ${lunarMonth}${lunarDay} ${weekDayName}`
}

/**
 * 获取完整的日期时间信息
 * @param {Date} date - 日期对象，默认为当前时间
 * @returns {Object} 包含格式化时间和阴历信息的对象
 */
export const getDateTimeInfo = (date = new Date()) => {
  return {
    datetime: formatDateTime(date),
    date: formatDate(date),
    time: formatTime(date),
    lunar: getLunarInfo(date),
    timestamp: date.getTime()
  }
}

/**
 * 创建定时器更新时间的组合式函数
 * @param {number} interval - 更新间隔，默认1000毫秒
 * @returns {Object} 包含时间数据和清理函数的对象
 */
export const useDateTime = (interval = 1000) => {
  const currentTime = ref('')
  const lunarInfo = ref('')
  const timer = null

  const updateDateTime = () => {
    const now = new Date()
    const dateTimeInfo = getDateTimeInfo(now)
    currentTime.value = dateTimeInfo.datetime
    lunarInfo.value = dateTimeInfo.lunar
  }

  const startTimer = () => {
    updateDateTime()
    timer.value = setInterval(updateDateTime, interval)
  }

  const stopTimer = () => {
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
  }

  // 自动启动定时器
  onMounted(() => {
    startTimer()
  })

  // 组件卸载时清理定时器
  onUnmounted(() => {
    stopTimer()
  })

  return {
    currentTime,
    lunarInfo,
    startTimer,
    stopTimer,
    updateDateTime
  }
}