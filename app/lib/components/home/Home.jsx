import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Meeting from '../tips/meetingList'
import {Button,message} from "antd";

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listdata: [],
            Title: '最近7天会议',
            meetingType: 1
        }
    }

    componentDidMount() {
        // window.location.reload(true)
        this.onTest()

    }

    onTest = () => {
        // window.location.reload(true)
        if(localStorage.getItem('roomId') !== null){
            localStorage.removeItem('roomId')
            location.reload(true)
        }


    }

    _checkAVSeting = ()=>{
        if(!navigator.mediaDevices ||
            !navigator.mediaDevices.enumerateDevices){
            console.log('enumerateDevices is not supported!');
        }else {
            navigator.mediaDevices.enumerateDevices()
                .then(this.gotDevices)
                .catch(handleError);
        }
    }



    gotDevices=(deviceInfos)=> {
        const arrs = new Array();
        console.log("此处的"+JSON.stringify(deviceInfos))
        deviceInfos.map(deviceInfo=>{
            arrs.push(deviceInfo.kind);
        })
        console.log("此处的arrs"+arrs)
        //audioinput
        if(arrs.indexOf("audioinput")<0){
            message.error("获取麦克风设备失败")
            return;
        }
        if(arrs.indexOf("audiooutput")<0){
            message.error("获取麦克风设备失败")
            return;
        }

        //videoinput
        if(arrs.indexOf("videoinput")<0){
            message.error("获取摄像头设备失败")
            return;
        }
        message.success("硬件检测成功")

    }

    componentWillMount() {

    }
    render() {

        const {Title, meetingType} = this.state
        return (
            <div data-component='Home'>
                <div className="homeNav">

                    <div className="homeNav_2">
                        <div className="num">
                            <div className="homeNav_numder">1</div>
                            点击会议菜单
                        </div>
                        <span className="bodre"></span>
                        <div className="num">
                            <div className="homeNav_numder">2</div>

                            <a>
                                <div className="navText" onClick={this._checkAVSeting}>检查音视频设置</div>
                            </a>


                        </div>
                        <span className="bodre"></span>
                        <div className="num">
                            <div className="homeNav_numder">3</div>
                            选择会议室
                        </div>
                        <span className="bodre"></span>
                        <div className="num">
                            <div className="homeNav_numder">4</div>
                            开始进行会议
                        </div>
                    </div>
                    <p>本远程视频屏会议系统是用来召开远程视频会议，培训演讲，审查文件的平台。按照上面的指引进入会议。或者进入日历预约一个会议计划。</p>
                    <Link to="/mymeeting">
                        <div className="navText"><Button type="primary" style={{width: 100}} size='100'>我的日程</Button>
                        </div>
                    </Link>

                </div>
                <div id="meeting"><Meeting Title={Title} meetingType={meetingType}/></div>
            </div>

        )
    }



}

export default Home
