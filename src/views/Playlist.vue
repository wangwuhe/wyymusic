<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <img :src="playlist.coverImgUrl" alt="" />
      </div>
      <div class="info-wrap">
        <p class="title">{{playlist.name}}</p>
        <div class="author-wrap">
          <img class="avatar" :src="creator.avatarUrl" alt="" />
          <span class="name">原创君</span>
          <span class="time">{{playlist.createTime}} 创建</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="(item,index) in playlist.tags" :key="index">{{item}}</li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc"
            >{{playlist.description}}</span
          >
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
        <table class="el-table playlit-table">
          <thead>
            <th></th>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row" v-for="(item,index) in tableData" :key="index">
              <td>{{index+1}}</td>
              <td>
                <div class="img-wrap" @click="playMusic(item.id)">
                  <img :src="item.al.picUrl" alt="" />
                  <span class="iconfont icon-play"></span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{item.name}}</span>
                    <span v-if="item.mv != 0" @click="toMV(item.mv)" class="iconfont icon-mv"></span>
                  </div>
                  <span>{{item.subTitle}}</span>
                </div>
              </td>
              <td>{{item.ar[0].name}}</td>
              <td>{{item.al.name}}</td>
              <td>{{item.dt|Setsj(item.dt)}}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="评论(66)" name="2">
        <!-- 精彩评论 -->
        <div class="comment-wrap">
          <p class="title">精彩评论<span class="number">({{hotCount}})</span></p>
          <div class="comments-wrap">
            <div class="item" v-for="(item,index) in hotComments" :key="index">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{item.user.nickname}}</span>
                  <span class="comment">{{item.content}}</span>
                </div>
                <div class="re-content" v-if="item.beReplied.length!=0">
                  <span class="name">{{item.beReplied[0].user.nickname}}</span>
                  <span class="comment">{{item.beReplied[0].content}}</span>
                </div>
                <div class="date">{{item.time|chuli(item.time)}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新评论 -->
        <div class="comment-wrap">
          <p class="title">最新评论<span class="number">({{total}})</span></p>
          <div class="comments-wrap">
            <div class="item" v-for="(item,index) in Comments" :key="index">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{item.user.nickname}}</span>
                  <span class="comment">{{item.content}}</span>
                </div>
                <div class="re-content" v-if="item.beReplied.length!=0">
                  <span class="name">{{item.beReplied[0].user.nickname}}</span>
                  <span class="comment">{{item.beReplied[0].content}}</span>
                </div>
                <div class="date">{{item.time|chuli(item.time)}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页器 -->
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="page"
          :page-size="10"
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { playlistDetail, listComments, hotComments } from '@/api/playlist';
import { songUrl } from '@/api/discovery';
export default {
  name: 'playlist',
  data() {
    return {
      activeIndex: '1',
      // 总条数
      total: 0,
      // 页码
      page: 1,
      playlist:{},
      tableData:{},
      creator:{},
      hotComments:{},
      hotCount:0,
      Comments:{}
    };
  },
  created() {
    playlistDetail({
      id:this.$route.query.listid
    }).then(res => {
      this.tableData=res.data.playlist.tracks;
      this.creator=res.data.playlist.creator;
      this.playlist=res.data.playlist;
    }),

    hotComments({
      id:this.$route.query.listid,
      type:2
    }).then(res => {
      this.hotComments=res.data.hotComments;
      this.hotCount=res.data.total;
    }),

    listComments({
        id:this.$route.query.listid,
        limit:10,
        offset:0
      }).then(res => {
      this.total=res.data.total;
      this.Comments=res.data.comments;
    })
  },
  methods: {
    handleCurrentChange(val) {
      this.page=val;
      listComments({
        id:this.$route.query.listid,
        limit:10,
        offset:(this.page-1)*10
      }).then(res => {
        this.total=res.data.total;
        this.Comments=res.data.comments;
      })
    },
    toMV(id){
      this.$router.push(`/mv?mvid=${id}`)
    },
    playMusic(id){
      songUrl({
        id:id
      }).then(res=>{
        let musicurl=res.data.data[0].url;
        this.$parent.url=musicurl;
      })
    }
  }
};
</script>

<style >

</style>
