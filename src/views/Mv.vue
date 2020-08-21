<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video
          controls
          :src="url"
        ></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="icon" alt="" />
          </div>
          <span class="name">{{mvInfo.artistName}}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{mvInfo.name}}</h2>
          <span class="date">发布：{{mvInfo.publishTime}}</span>
          <span class="number">播放：{{mvInfo.playCount}}次</span>
          <p class="desc">
            {{mvInfo.desc}}
          </p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div v-if="hotComments.length != 0" class="comment-wrap">
        <p class="title">热门评论<span class="number">({{hotComments.length}})</span></p>
        <div class="comments-wrap">
          <div class="item" v-for="item in hotComments" :key="item.commentId">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{item.user.nickname}}：</span>
                <span class="comment">{{item.content}}</span>
              </div>
              <div v-if="item.beReplied.length != 0" class="re-content">
                <span class="name">{{item.beReplied[0].user.nickname}}：</span>
                <span class="comment">还是小时候比较可爱</span>
              </div>
              <div class="date">{{item.time|chuli(item.time)}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap" v-if="comments.length != 0">
        <p class="title">
          最新评论<span class="number">({{ total }})</span>
        </p>
        <div class="comments-wrap">
          <div class="item" v-for="item in comments" :key="item.commentId">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}：</span>
                <span class="comment">{{ item.content }}</span>
              </div>
              <div v-if="item.beReplied.length != 0" class="re-content">
                <span class="name"
                  >{{ item.beReplied[0].user.nickname }}：</span
                >
                <span class="comment">{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">{{ item.time |chuli(item.time) }}</div>
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
        :page-size="5"
        :limit="limit"
      >
      </el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item" v-for="(item,index) in urlall" :key="index">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{item.playCount}}</div>
              </div>
              <span class="time">{{item.duration|Setsj(item.duration)}}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{item.name}}</div>
              <div class="singer">{{item.artistName}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'mv',
  data() {
    return {
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      url:'',
      urlall:{},
      mvInfo:{},
      icon:'',
      hotComments:[],
      hotCount:0,
      comments:{},
      user:{}
    };
  },
  created() {
    axios({
      url:'https://autumnfish.cn/mv/url',
      method:'get',
      params:{
        id:this.$route.query.mvid
      }
    }).then(res=>{
      this.url=res.data.data.url
    }),
    axios({
      url:'https://autumnfish.cn/simi/mv',
      method:'get',
      params:{
        mvid:this.$route.query.mvid
      }
    }).then(res=>{
      this.urlall=res.data.mvs
    }),
    axios({
      url:'https://autumnfish.cn/mv/detail',
      method:'get',
      params:{
        mvid:this.$route.query.mvid
      }
    }).then(res=>{
      this.mvInfo=res.data.data;
      axios({
        url:'https://autumnfish.cn/artists',
        method:"get",
        params:{
          id:res.data.data.artistId
        }
      }).then(res=>{
        this.icon=res.data.artist.picUrl
      })
    }),
    axios({
      url:'https://autumnfish.cn/comment/mv',
      method:'get',
      params:{
        id:this.$route.query.mvid,
        limit:10,
        offset:0
      }
    }).then(res=>{
      console.log(res.data)
      if (res.data.hotComments) {
          this.hotComments = res.data.hotComments;
        }
        this.comments = res.data.comments;
        this.total = res.data.total;
    })
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style></style>
