import React, {Component} from 'react';
import {getUserData} from '../../redux/api/'
import {Empty, Icon, Statistic} from 'antd';
import ItemList from './ItmeListe'

const {Countdown} = Statistic;

class Meeting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listdata: [],
            data: {},
        }
    }

    //请求会议数据
    getListdata = async () => {
        let reqList = {
            "uid": Number(localStorage.uid),
            "token": localStorage.token,
            "serviceName": "meetingInfoService",
            "methodName": "queryMeetingList",
            "parameters": {
                "userId": Number(localStorage.uid),
                'meetingType': this.props.meetingType

            }
        }
        const listData = await getUserData(reqList)
        console.log(listData)
        this.setState(
            {
                listdata: listData.data.info
            }
        )
    }

onTest=()=>{
    window.location.reload(true)
}
    //初始化会议数据
    componentDidMount() {
        this.getListdata()
    }

    render() {

        const {listdata} = this.state
        let renderinfo;
        if (listdata === 0) {
            renderinfo = (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='暂无会议'/>)
        } else {
            renderinfo = (listdata.map((item, index) => <ItemList arr={item} key={index}/>))
        }

        return (
            <div className="meeting">
                <p className="mt_list_p1">
                    <span className="mt_list_p1_span">{this.props.Title}</span>
                    <span><a onClick={this.onTest}> <Icon type="undo"/>点击刷新</a></span>
                </p>
                <p className="mt_list">
                    <div className="mt_list_span_1">开始时间</div>
                    <div className="mt_list_span_2">结束时间</div>
                    <div className="mt_list_span_3">距会议开始还有</div>
                    <div className="mt_list_span_4">主持人</div>
                </p>
                <div className='itme_list'>
                    {renderinfo}
                </div>
            </div>
        )
    }
}

export default Meeting

