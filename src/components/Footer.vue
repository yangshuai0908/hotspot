<script setup>
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>关于我们</h3>
        <p>HotSpot AI 致力于汇聚全网热点，为您提供最新、最热门的资讯内容。</p>
      </div>

      <div class="footer-section">
        <h3>快速链接</h3>
        <ul>
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/History">历史上的今天</router-link></li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>联系方式</h3>
        <ul class="contact-info">
          <li>📧 yangshuai970908@126.com</li>
          <li>📍 湖北省武汉市光谷</li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>关注我们</h3>
        <div class="social-links">
          <a href="https://weibo.com/u/2754926865" target="_blank" rel="noopener noreferrer" class="social-link" title="微博">
            <svg t="1764646635905" class="icon" viewBox="0 0 1138 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="1786" width="24" height="24">
              <path
                d="M914.432 518.144q27.648 21.504 38.912 51.712t9.216 62.976-14.336 65.536-31.744 59.392q-34.816 48.128-78.848 81.92t-91.136 56.32-94.72 35.328-89.6 18.944-75.264 7.68-51.712 1.536-49.152-2.56-68.096-10.24-78.336-21.504-79.872-36.352-74.24-55.296-59.904-78.848q-16.384-29.696-22.016-63.488t-5.632-86.016q0-22.528 7.68-51.2t27.136-63.488 53.248-75.776 86.016-90.112q51.2-48.128 105.984-85.504t117.248-57.856q28.672-10.24 63.488-11.264t57.344 11.264q10.24 11.264 19.456 23.04t12.288 29.184q3.072 14.336 0.512 27.648t-5.632 26.624-5.12 25.6 2.048 22.528q17.408 2.048 33.792-1.536t31.744-9.216 31.232-11.776 33.28-9.216q27.648-5.12 54.784-4.608t49.152 7.68 36.352 22.016 17.408 38.4q2.048 14.336-2.048 26.624t-8.704 23.04-7.168 22.016 1.536 23.552q3.072 7.168 14.848 13.312t27.136 12.288 32.256 13.312 29.184 16.384zM656.384 836.608q26.624-16.384 53.76-45.056t44.032-64 18.944-75.776-20.48-81.408q-19.456-33.792-47.616-57.344t-62.976-37.376-74.24-19.968-80.384-6.144q-78.848 0-139.776 16.384t-105.472 43.008-72.192 60.416-38.912 68.608q-11.264 33.792-6.656 67.072t20.992 62.976 42.496 53.248 57.856 37.888q58.368 25.6 119.296 32.256t116.224 0.512 100.864-21.504 74.24-33.792zM522.24 513.024q20.48 8.192 38.912 18.432t32.768 27.648q10.24 12.288 17.92 30.72t10.752 39.424 1.536 42.496-9.728 38.912q-8.192 18.432-19.968 37.376t-28.672 35.328-40.448 29.184-57.344 18.944q-61.44 11.264-117.76-11.264t-88.064-74.752q-12.288-39.936-13.312-70.656t16.384-66.56q13.312-27.648 40.448-51.712t62.464-38.912 75.264-17.408 78.848 12.8zM359.424 764.928q37.888 3.072 57.856-18.432t21.504-48.128-15.36-47.616-52.736-16.896q-27.648 3.072-43.008 23.552t-17.408 43.52 9.728 42.496 39.424 21.504zM778.24 6.144q74.752 0 139.776 19.968t113.664 57.856 76.288 92.16 27.648 122.88q0 33.792-16.384 50.688t-35.328 17.408-35.328-14.336-16.384-45.568q0-40.96-22.528-77.824t-59.392-64.512-84.48-43.52-96.768-15.872q-31.744 0-47.104-15.36t-14.336-34.304 18.944-34.304 51.712-15.36zM778.24 169.984q95.232 0 144.384 48.64t49.152 146.944q0 30.72-10.24 43.52t-22.528 11.264-22.528-14.848-10.24-35.84q0-60.416-34.816-96.256t-93.184-35.84q-19.456 0-28.672-10.752t-9.216-23.04 9.728-23.04 28.16-10.752z"
                p-id="1787" fill="#cdcdcd"></path>
            </svg>
          </a>
          <a href="https://github.com/yangshuai0908" target="_blank" rel="noopener noreferrer" class="social-link" title="GitHub">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="copyright">
        <p>&copy; {{ currentYear }} HotSpot AI. All rights reserved.</p>
      </div>
      <div class="footer-links">
        <a href="#">服务条款</a>
        <a href="#">隐私政策</a>
        <a href="#">Cookie设置</a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: #ecf0f1;
  padding: 40px 0 20px;
  margin-top: auto;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    margin-bottom: 30px;

    .footer-section {
      h3 {
        color: #3498db;
        margin-bottom: 15px;
        font-size: 1.2rem;
        font-weight: 600;
      }

      p {
        line-height: 1.6;
        color: #bdc3c7;
        margin-bottom: 0;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          margin-bottom: 8px;

          a {
            color: #bdc3c7;
            text-decoration: none;
            transition: color 0.3s ease;

            &:hover {
              color: #3498db;
            }
          }
        }
      }

      .contact-info {
        li {
          display: flex;
          align-items: center;
          gap: 8px;
        }
      }

      .social-links {
        display: flex;
        gap: 15px;

        .social-link {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #bdc3c7;
          transition: all 0.3s ease;

          &:hover {
            background: #3498db;
            color: white;
            transform: translateY(-2px);
          }
        }
      }
    }
  }

  .footer-bottom {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;

    .copyright {
      p {
        margin: 0;
        color: #95a5a6;
        font-size: 0.9rem;
      }
    }

    .footer-links {
      display: flex;
      gap: 20px;

      a {
        color: #95a5a6;
        text-decoration: none;
        font-size: 0.9rem;
        transition: color 0.3s ease;

        &:hover {
          color: #3498db;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .footer {
    padding: 30px 0 15px;

    .footer-content {
      grid-template-columns: 1fr;
      gap: 30px;
      padding: 0 15px;
    }

    .footer-bottom {
      flex-direction: column;
      text-align: center;
      padding: 15px;

      .footer-links {
        justify-content: center;
      }
    }
  }
}
</style>