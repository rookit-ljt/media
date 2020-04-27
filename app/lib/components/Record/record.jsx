import React, { Component } from 'react';
import {List, Pagination, Icon, Table} from 'antd';
import { connect } from "react-redux";
import {Link} from "react-router-dom";

import { getUserData } from '../../redux/api/index'

class Record extends Component {
constructor(props) {
    super(props);
    this.state={
        data:[],

    }
}
            //获取记录数据
        _getRecord=async(e)=>{
          let Record={
              "uid": Number(localStorage.uid),
              "token": localStorage.token,
              "serviceName": "meetingRecordService",
              "methodName": "queryMeetingRecordList",
              "parameters": {
                  "userId": Number(localStorage.uid),

              },
          }
            const resData = await getUserData(Record)
            console.log(resData)
            this.setState({
                data:resData.data.dataList
            })

}
componentDidMount(){
    this._getRecord()

}

  render() {
        const data=this.state.data
      // console.log(this.state.data[0].recordTime.split(0,4))
        return (
      <div className="record" data-component="Record">

        <div className='record_right'>
          <div className="box">

              <div className='record_title'>
                      <svg style={{position:"relative" ,top:11,marginRight:10}}t="1578989128073" className="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="7398" width="40" height="40">
                      <path
                          d="M329.690508 377.588354h366.751552c14.460325 0 26.196613-11.736287 26.196612-26.19866 0-14.460325-11.736287-26.196613-26.196612-26.196612h-366.751552c-14.460325 0-26.196613 11.736287-26.196612 26.196612 0.001023 14.462372 11.736287 26.198659 26.196612 26.19866m366.751552 104.364848h-366.751552c-14.460325 0-26.196613 11.738334-26.196612 26.198659s11.736287 26.196613 26.196612 26.196612h366.751552c14.460325 0 26.196613-11.736287 26.196612-26.196612s-11.736287-26.198659-26.196612-26.198659m0 157.180698h-366.751552c-14.460325 0-26.196613 11.736287-26.196612 26.196613s11.736287 26.196613 26.196612 26.196612h366.751552c14.460325 0 26.196613-11.736287 26.196612-26.196612s-11.736287-26.196613-26.196612-26.196613m-259.763972-418.937046h130.982039c21.717606 0 39.292872-17.601872 39.292872-39.292872s-17.603919-39.294919-39.292872-39.294919h-130.982039c-21.691 0-39.294919 17.603919-39.294919 39.294919s17.603919 39.292872 39.294919 39.292872m338.354833-52.392201h-26.196613c-14.462372 0-26.200706 11.736287-26.200706 26.196612s11.738334 26.196613 26.200706 26.196613h26.196613c28.894045 0 52.392202 23.500203 52.392201 52.394248v497.734614c0 28.894045-23.498157 52.392202-52.392201 52.392202h-523.931227c-28.894045 0-52.392202-23.498157-52.392202-52.392202v-497.734614c0-28.894045 23.498157-52.394248 52.392202-52.394248h26.196612c14.460325 0 26.196613-11.736287 26.196613-26.196613s-11.736287-26.196613-26.196613-26.196612h-26.196612c-57.868931 0-104.78645 46.918542-104.78645 104.78645v497.734614c0 57.868931 46.918542 104.78645 104.78645 104.78645h523.931227c57.866884 0 104.78645-46.918542 104.78645-104.78645v-497.734614c0-57.867908-46.919566-104.78645-104.78645-104.78645m0 0z"
                          fill="#537AE8" p-id="7399"></path>
                  </svg>党员会议
              </div>
              <div className='record_content'>
                  <List
                      pagination={{defaultPageSize:7,showQuickJumper:true}}
                      size='middle'
                      position='bottom'
                      itemLayout="horizontal"
                      dataSource={data}
                      renderItem={item => (
                          <List.Item  style={{paddingLeft:35}}
                          >
                              <div className='record_time'><div className="top" style={{textAlign:"center"}}>{(item.recordTime+'').split(" ")[0].split('-')[1]+"-"+(item.recordTime+'').split(" ")[0].split('-')[2]}</div>
                                  <div className="bottom">{(item.recordTime+'').split("-")[0]}</div></div>

                              <List.Item.Meta
                                  title={<a style={{fontSize:18,
                                      fontFamily:'Microsoft YaHei',
                                      fontWeight:400,}}>{item.meetingTitle}</a>}
                                  description={<div style={{fontSize:10,fontFamily:'Microsoft YaHei',fontWeight:400}}>主讲人：{item.hostName}</div>}
                              />

                              <Link to={`/recordDetails/${item.recordId}`}>
                                  <a style={{marginRight:50}}><Icon type="right" style={{fontSize:20}}/></a>
                              </Link>
                          </List.Item>
                      )}

                  />
              </div>
              {/*<Pagination size="small" total={50} onChange={(a)=>this.nextpage(a)} style={{float:"right"}}/>*/}
          </div>
          </div>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      reqUserId(data, callback) {
          const action = getRecord(data, callback);
          dispatch(action);
      }
  }
}
const mapStateToProps = state => ({
  state: state
})
export default connect(mapStateToProps, mapDispatchToProps)(Record)

