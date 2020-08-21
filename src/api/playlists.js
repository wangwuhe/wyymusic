import request from '@/utils/request';
// 精品歌单
export function highquality({limit, cat }) {
  return request({
    url: '/top/playlist/highquality',
    method: 'get',
    params: {
      limit,
      cat
    }
  });
}
// 精选歌单
export function topList({limit, cat, offset }) {
  return request({
    url: '/top/playlist',
    method: 'get',
    params: {
      limit,
      offset,
      cat
    }
  });
}
