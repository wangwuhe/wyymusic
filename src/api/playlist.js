import request from '@/utils/request'

export function playlistDetail({id}){
    return request({
        url:"/playlist/detail",
        method:"get",
        params:{
            id
        }
    })
}


export function hotComments({id,type}){
    return request({
        url:"/comment/hot",
        method:"get",
        params:{
            type,
            id
        }
    })
}

export function listComments({id,limit,offset}){
    return request({
        url:"/comment/playlist",
        method:"get",
        params:{
            id,
            limit,
            offset
        }
    })
}



