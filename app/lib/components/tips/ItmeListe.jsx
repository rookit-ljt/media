import React, {Component} from "react";
import {Button, Statistic, Tag,Modal} from "antd";
import {connect} from "react-redux";
import {createHashHistory} from 'history'
import Login from "../Login";

const {Countdown} = Statistic;

class ItemList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userID: {},
            showModal:false

        }
    }

    handleOk = e => {
        console.log(
            this.props.arr
        )
        const meeting= this.props.arr
        this.setState({
            showModal: false,
        });
        let meetingId=meeting.meetingId
        console.log(meetingId)
        let roomId = meeting.roomNum
        localStorage.setItem("roomId", roomId)
        localStorage.setItem("meetingId", meetingId)

        createHashHistory().push('/meetingRoom')



    };

    handleCancel = () => {
        this.setState({
            showModal: false,
        });

        this.init()

    };

    init = () => {
        this.deadline = Date.now() + this.props.arr.remainderTime * 1000
    }
    handLink = (e) => {
        //1.获取参数，姓名，房间号
        console.log(e.currentTarget.dataset)
        if (this.props.arr.remainderTime === 0) {
            console.log(this.props.arr.remainderTime)
            let data = {
                userName: localStorage.name,
                meetingId: e.currentTarget.dataset.meetingid,
                meetingTitle: e.currentTarget.dataset.meetingtitle
            }
            let meetingId = e.currentTarget.dataset.meetingid
            let roomId = e.currentTarget.dataset.roomno
            localStorage.setItem("roomId", roomId)
            localStorage.setItem("meetingId", meetingId)

            createHashHistory().push('/meetingRoom')

        } else alert('会议未开始，请耐心等待')

    }
    onFinish=(e)=>{
        console.log(e)
        this.setState({showModal:true})
}
    componentWillMount() {
        this.init()
    }
    render() {
        const arr = this.props.arr
        let remainderTime
        if (arr.remainderTime === 0) {
            remainderTime = (<Tag color="#f50" style={{display: "block", width: 80}}>会议进行中</Tag>)
        } else {
            remainderTime = (<Countdown
                onFinish={this.onFinish}
                title="" valueStyle={{color: "#40C1FF", fontSize: 18}}
                value={this.deadline} format="D 天 H 时 m 分 s 秒"/>)
        }
        return (
            <div className='itemList'>
                <div className="color"></div>
                <div className='itemList_1'>

                    <p style={{height: 20, fontSize: 18, marginTop: 10}}>
                        {arr.meetingTitle}
                    </p>
                    <p style={{height: 20, fontSize: 12, color: '#888888'}}>({arr.roomNum})</p>
                </div>
                <div className='itemList_2'>{arr.startTime}</div>
                <div className='itemList_3'>{arr.endTime}</div>
                <div className='itemList_4'>
                    {remainderTime}
                </div>
                <div className='itemList_5'><span
                    className="spanbox"><span>{arr.host}</span></span></div>

                <Button
                    style={{paddingRight: 40}}
                    type="link"
                    data-roomno={arr.roomNum}
                    data-meetingid={arr.meetingId}
                    data-meetingTitle={arr.meetingTitle}
                    onClick={(e) => this.handLink(e)}
                >
                    <svg t="1578020665537" className="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="4836" width="24" height="24">
                        <path
                            d="M245.034251 895.239428l383.063419-383.063419L240.001631 124.07997l0.070608-0.033769c-12.709463-13.137205-20.530592-31.024597-20.530592-50.731428 0-40.376593 32.736589-73.111135 73.115228-73.111135 19.705807 0 37.591153 7.819083 50.730405 20.528546l0.034792-0.035816 438.686251 438.681134-0.035816 0.034792c13.779841 13.281491 22.3838 31.915897 22.3838 52.586682 0 0.071631 0 0.106424 0 0.178055 0 0.072655 0 0.10847 0 0.144286 0 20.669762-8.603959 39.341007-22.3838 52.623521l0.035816 0.033769L343.426165 1003.661789l-0.180102-0.179079c-13.140275 12.565177-30.950919 20.313651-50.588165 20.313651-40.378639 0-73.115228-32.736589-73.115228-73.114205C219.544717 928.512229 229.432924 908.664182 245.034251 895.239428z"
                            p-id="4837" fill="#7F87E3"></path>
                    </svg>
                </Button>
                <Modal
                    title="提示"
                    visible={this.state.showModal}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText='进入'
                    cancelText='取消'
                >
                    会议已开始，是否进入会议？
                </Modal>
            </div>
        )
    }


}

export default connect(null, null)(ItemList);