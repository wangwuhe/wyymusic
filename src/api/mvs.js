import request from '@/utils/request';

// mv地址
export function allMvs({limit, area, order, type, offset }) {
  return request({
    url: '/mv/all',
    method: 'get',
    params: {
      limit,
      area,
      order,
      type,
      offset
    }
  });
}
