// 成功提示函数
export function showSuccessToast(message) {
  // 检查是否已存在提示元素
  let existingToast = document.querySelector('.success-toast')
  if (existingToast) {
    existingToast.remove()
  }

  // 创建提示元素
  const toast = document.createElement('div')
  toast.className = 'success-toast'
  toast.innerHTML = `
    <div class="success-content">
      <span class="success-icon">✅</span>
      <span class="success-message">${message}</span>
    </div>
  `

  // 添加样式
  const style = document.createElement('style')
  style.textContent = `
    .success-toast {
      position: fixed;
      top: 52px;
      right: 20px;
      z-index: 9999;
      transform: translateX(100%);
      transition: transform 0.3s ease-in-out;
    }
    
    .success-toast.show {
      transform: translateX(0);
    }
    
    .success-content {
      background: #4caf50;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 500;
      min-width: 200px;
    }
    
    .success-icon {
      font-size: 16px;
    }
  `
  
  // 添加到页面
  document.head.appendChild(style)
  document.body.appendChild(toast)
  
  // 触发动画
  setTimeout(() => {
    toast.classList.add('show')
  }, 10)
  
  // 3秒后自动移除
  setTimeout(() => {
    toast.classList.remove('show')
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove()
      }
      if (style.parentNode) {
        style.remove()
      }
    }, 300)
  }, 3000)
}