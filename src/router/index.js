import Vue from 'vue'
import VueRouter from 'vue-router'
import Discovery from '../views/Discovery.vue'
import Playlists from '../views/Playlists.vue'
import Songs from '../views/Songs.vue'
import Mvs from '../views/Mvs.vue'
import Result from '../views/Result.vue'
import Playlist from '../views/Playlist.vue'
import Mv from '../views/Mv.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect: '/discovery'
    },
    {
      // 发现音乐
      path: '/discovery',
      component: Discovery
    },
    {
      // 推荐歌单
      path: '/playlists',
      component: Playlists
    },
    {
      // 推荐歌单
      path: '/playlist',
      component: Playlist
    },
    {
      // 最新音乐
      path: '/songs',
      component: Songs
    },
    {
      // 最新音乐
      path: '/mvs',
      component: Mvs
    },
    // mv详情
    {
      path: '/mv',
      component: Mv
    },
    // 搜索结果页
    {
      path: '/result',
      component: Result
    }
  
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
