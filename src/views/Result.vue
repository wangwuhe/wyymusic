<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title">{{$route.query.keywords}}</h2>
      <span class="sub-title">找到{{count}}个结果</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row" v-for="(item,index) in songList" :key="index"
            @dblclick="Playsongs(item.id)">
              <td>{{index+1}}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{item.name}}</span>
                    <span class="iconfont icon-mv" v-if="item.mvid"></span>
                  </div>
                  <span v-if="item.alias">{{item.alias[0]}}</span>
                </div>
              </td>
              <td>{{item.artists[0].name}}</td>
              <td>{{item.album.name}}</td>
              <td>{{item.duration|Setsj(item.duration)}}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div class="item" v-for="(item,index) in playList" :key="index" @click="toPlayList(item.id)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{item.playCount|Setsl(item.playCount)}}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{item.name}}</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div class="item" v-for="(item,index) in mvList" :key="index" @click="toMv(item.id)">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{item.playCount|Setsl(item.playCount)}}</div>
              </div>
              <span class="time">{{item.duration|Setsj(item.duration)}}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{item.name}}</div>
              <div class="singer">{{item.artistName}}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="count"
      :current-page="page"
      :page-size="limit"
    >
    </el-pagination>
  </div>
</template>

<script>
import { search } from '@/api/result';
import { songUrl } from '@/api/discovery';
export default {
  name: 'result',
  data() {
    return {
      limit: 15,
      page: 1,
      count:0,
      activeIndex: 'songs',
      songList:{},
      playList:{},
      mvList:{}
    };
  },
  methods: {
    Playsongs(id){
      songUrl({
        id
      }).then(res => {
        let url=res.data.data[0].url;
        this.$parent.url=url;
      })
    },
    toPlayList(id){
      this.$router.push('/playlist?listid='+id)
    },
    toMv(id){
      this.$router.push('/mv?mvid='+id)
    },
    searchResult(){
      let type=1;
      let limit=10;
      switch (this.activeIndex) {
        case 'songs':
          type=1;
          limit=15
          break;
        case 'lists':
          type=1000;
          limit=15
          break;
        case 'mv':
          type=1004;
          limit=12
          break;
      }
      search({
        keywords:this.$route.query.keywords,
        type,
        limit,
        offset: (this.page - 1) * limit
      }).then(res => {
        if(type==1){
          this.songList=res.data.result.songs;
          this.count=res.data.result.songCount
        }else if(type==1000){
          this.playList=res.data.result.playlists;
          this.count=res.data.result.playlistCount;
        }else{
          this.mvList=res.data.result.mvs;
          this.count=res.data.result.mvCount;
        }
      })
    },
    handleCurrentChange(val) {
      this.page = val;
      this.searchResult();
    },
  },
  watch: {
    activeIndex(){
      this.page=1;
      this.searchResult();
    },
    '$route.query.keywords'(){
      this.searchResult();
    }
  },
  created(){
    search({
        keywords:this.$route.query.keywords,
        type:1,
        limit:15,
        offset:1
    }).then(res=>{
      console.log(res.data)
      this.songList=res.data.result.songs;
      this.count=res.data.result.songCount
    })
  }
};
</script>

<style >

</style>
