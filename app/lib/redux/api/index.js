import ajax from './ajax'
//0.定义基础路径
// const BASE_URL = 'https://192.168.0.138:4443'

export const getUserData = (data)=>ajax('/api/app',data,'POST');

