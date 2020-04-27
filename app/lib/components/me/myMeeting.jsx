import React, {Component} from "react";
import {getUserData} from '../../redux/api/'
import {Badge, Button, Calendar, List, Modal, Tabs, Tag,message} from 'antd';
// import AddButton from "../tips/AddMeeting";
import Addform from './AddSchedule-form.jsx'
import moment from "moment";

const {TabPane} = Tabs;
moment.locale('zh-cn');

function onPanelChange(value, mode) {
    // console.log("value year: "+value.year());
    // console.log(parseInt(value.month())+1);
    // console.log("value day: "+value.date());
    // console.log("mode: "+mode);
    // console.log(moment(value).format('YYYY-MM-DD HH:mm:ss')+"&&&"+mode)
}

class MyMeeting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            //所有日程
            listdata: [],
            //我的日程
            MySchedule: [],
            //会议日程
            MeetingSchedule: [],
            ConferenceSchedule: [],
            PersonalSchedule: [],
            visible: false,
            AddSchedule: false
        }
    }

    // monthCellRender = (value) => {
    //     const num = this.getMonthData(value);
    //     return num ? (
    //         <div className="notes-month">
    //             <section>{num}</section>
    //             <span>Backlog number</span>
    //         </div>
    //     ) : null;
    // }
    getMonthData = (value) => {
        if (value.month() === 8) {
            return 1394;
        }
    }
    dateCellRender = (value) => {
        const listData = this.getListData(value);
        return (
            <ul className="events">
                {listData.map(item => (
                    <li key={item.scheduleTittle}>
                        <Badge status={item.scheduleType === 1 ? 'success' : 'warning'}
                               text={'日程主题：' + item.scheduleTittle}/>
                        {/*<Tag color="#2db7f5">开始时间：{item.dayTime}</Tag>*/}
                        <Tag color="cyan">开始时间：{item.scheduleStartTime}</Tag>
                    </li>
                ))}
            </ul>
        );
    }
    getListData = (value) => {
        let listData = [];
        // console.log(value.date());
        // console.log(this.state.listdata)
        for (let i = 0; i < this.state.listdata.length; i++) {
            let date = (this.state.listdata[i].scheduleStartTime + '').split(" ")[0].split('-')[0] + "-" + (this.state.listdata[i].scheduleStartTime + '').split(" ")[0].split('-')[1] + "-" + (this.state.listdata[i].scheduleStartTime + '').split(" ")[0].split('-')[2]
            // console.log(date)
            // console.log(this.state.listdata[i].dayDate)
            let value1 = (moment(value).format('YYYY-MM-DD'))
            // console.log(value1)
            if (value1 === date) {
                listData.push(this.state.listdata[i])
            }
        }
        return listData || [];
    }
//获取日程请求
    getListdata = async () => {
        let reqList = {
            "uid": parseInt(localStorage.uid),
            "token": localStorage.token,
            "serviceName": "scheduleInfoService",
            "methodName": "selectScheduleInfoList",
            "parameters": {
                "userId": Number(localStorage.uid),
            }
        }
        const resdata = await getUserData(reqList)
        console.log(resdata)
        // let MySchedule=resdata.data.scheduleInfo.filter(i=>i.scheduleType===2)
        // let MeetingSchedule=resdata.data.scheduleInfo.filter(i=>i.scheduleType===1)
        this.setState(
            {
                listdata: resdata.data.scheduleInfo,

            }
        )
    }
//点击当日日程的回调e
    onSelect = (e) => {
        const listData = this.getListData(e);
        let MeetingSchedule = listData.filter(i => i.scheduleType === 1)
        let MySchedule = listData.filter(i => i.scheduleType === 2)
        this.setState({
            visible: true,
            MeetingSchedule,
            MySchedule
        })
        console.log(listData)
    }
    //关闭model的回调
    handleCancel = () => {
        this.setState({visible: false})
    }
    //关闭model的回调
    handleOk = () => {
        this.setState({visible: false})
    }
    //初始化获取会议日程
    componentWillMount() {
    }

    componentDidMount() {
        this.getListdata()
    }
    //打开添加日程
    BtnAddSchedule = () => {
        this.setState({
            AddSchedule: true,
            visible: false
        })
    }
    //确定添加日程
    AddScheduleOk =  () => {
        this.form.validateFields((err, fieldsValue) => {
            if (!err) {
                const rangeTimeValue = fieldsValue['rangetimepicker'];
                const values = {
                    ...fieldsValue,
                    'rangetimepicker': [//处理时间
                        rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
                        rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
                    ],
                };
                this.form.resetFields()
                console.log('Received values of form: ', values);
                //发送添加会议请求
                this.AddSchedule(values)
                this.getListdata()
            }
            else {
                message.error('请按照提示填写信息')
            }
            // Should format date value before submit.
            //初始化标准时间
        });
    }
    //关闭添加日程
    AddScheduleCancel = () => {
        this.setState({
            AddSchedule: false
        })
        this.form.resetFields()
    }
    //发起添加日程请求
    AddSchedule = async (values) => {
        let reqData = {
            "uid": parseInt(localStorage.uid),
            "token": localStorage.token,
            "serviceName": "scheduleInfoService",
            "methodName": "addOrUpdateScheduleInfo",
            "parameters": {
                "scheduleTittle": values.scheduleTittle,
                "scheduleNote": values.scheduleNote,
                "scheduleStartTime": values.rangetimepicker[0],
                "scheduleEndTime": values.rangetimepicker[1],
                "scheduleReminderTime": values.scheduleReminderTime,
                "scheduleType": 2,
                "userId": Number(localStorage.uid),
            }
        }
        let resData = await getUserData(reqData)
        if(resData.resultCode === "000000"){
            this.setState({
                AddSchedule: false
            })
        }else message.error('添加房间失败')

        console.log(resData)

    }

    render() {
        const {MeetingSchedule, MySchedule} = this.state
        return (
            <div data-component='MyMeeting'>
                <p className='_header'>会议日程</p>
                <div className='add_meeting'>
                    <p className='add_meeting_p1'>

                                              <span> {moment(new  Date()).format('YYYY-MM-DD')} &nbsp; </span>

                    </p>
                    <p className='add_meeting_p2'>
                        <Button style={{marginTop: 10}} type="primary" onClick={this.BtnAddSchedule}>添加日程</Button>
                        {/*<AddButton id='AddMt'/>*/}

                    </p>
                </div>
                <div className='_calendar '>
                    {/*日程表*/}
                    <Calendar
                        onPanelChange={onPanelChange}
                        dateCellRender={this.dateCellRender}
                        // monthCellRender={this.monthCellRender}
                        onSelect={this.onSelect}
                    />
                </div>
                {/*当天的日程*/}
                <Modal
                    cancelText='取消'
                    okText='确定'
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Tabs type="card">
                        <TabPane tab="会议日程" key="1">
                            <div>
                                <List
                                    size="large"
                                    bordered
                                    locale={{emptyText: '今日没有会议哦'}}
                                    dataSource={MeetingSchedule}
                                    renderItem={item => <List.Item>
                                        <p>
                                            会议主题：{item.scheduleTittle}
                                        </p>
                                        <p>
                                            主持人：{item.host}
                                        </p>
                                        <p>
                                            书记员：{item.recorder}
                                        </p> <p>
                                        开始时间：{item.scheduleStartTime}
                                    </p>  <p>
                                        结束时间：{item.scheduleEndTime}
                                    </p>  <p>
                                        参会人：{item.participants.map(e=><Tag>{e.userName}</Tag>)}
                                    </p>
                                    </List.Item>}
                                />
                            </div>


                        </TabPane>
                        <TabPane tab="个人日程" key="2">
                            <div>
                                <List
                                    size="large"
                                    bordered
                                    dataSource={MySchedule}
                                    locale={{
                                        emptyText: <Button type="primary" onClick={this.BtnAddSchedule}>添加日程</Button>
                                    }}
                                    renderItem={item => <List.Item>
                                        <p>
                                            日程主题：{item.scheduleTittle}
                                        </p>
                                        <p>
                                            日程内容：{item.scheduleNote}
                                        </p>  <p>
                                        开始时间：{item.scheduleStartTime}
                                    </p>  <p>
                                        结束时间：{item.scheduleEndTime}
                                    </p>  <p>
                                        状态：{item.scheduleStatus === 0?'已结束':'未开始'}
                                    </p>
                                    </List.Item>}
                                />
                            </div>
                        </TabPane>

                    </Tabs>
                </Modal>
                {/*新增日程*/}
                <Modal
                    cancelText='取消'
                    okText='确定'
                    title="添加日程"
                    visible={this.state.AddSchedule}
                    onOk={this.AddScheduleOk}
                    onCancel={this.AddScheduleCancel}
                >

                    <Addform setForm={form => this.form = form}
                    />

                </Modal>
            </div>
        )
    }


}

export default MyMeeting