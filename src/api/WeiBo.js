import api from '../utils/request'

export const typeAPI = { 
    // 获取其他类型的热点数据
    getHotListByType(type) {
        return api.get(type)
    }
}