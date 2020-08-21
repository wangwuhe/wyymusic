<template>
  <div class="index-container">
    <div class="nav" >
      <ul>
        <li>
          <router-link to="/discovery">
            <span class="iconfont icon-netease"></span>
            发现音乐
          </router-link>
        </li>
        <li>
          <router-link to="/playlists">
            <span class="iconfont icon-gedan"></span>
            推荐歌单
          </router-link>
        </li>
        <li>
          <router-link to="/songs">
            <span class="iconfont icon-yinyue"></span>
            最新音乐
          </router-link>
        </li>
        <li>
          <router-link to="/mvs">
            <span class="iconfont icon-mv"></span>
            最新MV
          </router-link>
        </li>
      </ul>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="player">
      <audio controls autoplay :src="url" loop></audio>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      activeIndex: 0,
      url:""
    };
  }
};
</script>

<style lang="scss">

</style>
