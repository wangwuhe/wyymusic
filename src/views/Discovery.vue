<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">
        推荐歌单
      </h3>
      <div class="items">
        <div class="item" @click="toPlayList(item.id)" v-for="(item,index) in personalized" :key="index">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{item.copywriter}}</span>
            </div>
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name">{{item.name}}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">
        最新音乐
      </h3>
      <div class="items">
        <div class="item" v-for="(item,index) in newsong" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span @click="playMusic(item.id)" class="iconfont icon-play"></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{item.name}}</div>
            <div class="singer">{{item.song.artists.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" @click="toMv(item.id)" v-for="(item,index) in mv" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{item.playCount}}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{item.name}}</div>
            <div class="singer">{{item.artistName}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { banner, songlist, newsong,mv,songUrl } from '@/api/discovery';
export default {
  name: 'discovery',
  data() {
    return {
      banners:[],
      personalized:[],
      newsong:[],
      mv:[]
    }
  },
  created(){
    banner().then(res => {
      this.banners=res.data.banners
    }),
    songlist().then(res => {
      this.personalized=res.data.result
    }),
    newsong().then(res => {
      this.newsong=res.data.result
    }),

    mv().then(res=>{
      this.mv=res.data.result
    })
  },
  methods: {
    playMusic(id){
      songUrl({
        id:id
      }).then(res=>{
        let musicurl=res.data.data[0].url;
        this.$parent.url=musicurl;
      })
    },
    toMv(id){
      this.$router.push(`/mv?mvid=${id}`)
    },
    toPlayList(id){
      this.$router.push(`/playlist?listid=${id}`)
    }
  },
};
</script>

<style >

</style>
