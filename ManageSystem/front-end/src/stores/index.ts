import {
    createPinia
}from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// pinia-plugin-persistedstate 是一个 Pinia 的插件，用于实现状态的持久化。
// 这个插件可以将状态存储在本地存储（如 localStorage 或 sessionStorage）中，使得页面刷新后状态依然保留。
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

export default pinia