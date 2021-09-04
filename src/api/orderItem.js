import http from '../tools/http/http'
export const _countOrderItemByProductIdAndDate = (id, date) => http.GET('/api/orderItem/adminCountSold/' + id + '/' + date)
export const _getAllnames = () => http.GET('/api/orderItem/name')
