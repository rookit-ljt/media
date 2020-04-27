import React from 'react';
import {getUserData} from '../../redux/api/'
import moment from 'moment';
import {
    Form,
    Input,
    Select,
    Button,
    DatePicker,
    message
} from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;
function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}
function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
}
function disabledRangeTime(_, type) {
    if (type === 'start') {
        return {
            disabledHours: () => range(0, 60).splice(25, 20),
            disabledMinutes: () => range(30, 60),
            disabledSeconds: () => [55, 56],
        };
    }
    return {
        disabledHours: () => range(0, 60).splice(25, 4),
        disabledMinutes: () => range(0, 0),
        disabledSeconds: () => [55, 56],
    };
}
class RegistrationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            startTime: '',
            endTime: '',
            list: [],
            RoomList:[],

        }
    }
    //添加会议请求
    addMeeting = async (value) => {
        console.log('请求'+value)
        const startTime=value.rangetimepicker[0]
        const endTime=value.rangetimepicker[1]
        let meetingdata = {
            "uid": parseInt(localStorage.uid),
            "token": localStorage.token,
            "serviceName": "meetingInfoService",
            "methodName": "addOrUpdateMeeting",
            "parameters": {
                "meetingTitle": value.meetingTitle,
                "userId": parseInt(localStorage.uid),
                "meetingNote": value.meetingNote,
                "startTime": startTime,
                "endTime": endTime,
                "participantIds": value.userid.map(Number),
                'hostId':parseInt(localStorage.uid),
                'roomNum':value.roomNum
            }
        }

        const result = await getUserData(meetingdata)
        if (result.resultCode === "000000") {
            message.success('添加成功')
            this.props.gethandleOk()
        }
        else{
            message.error('添加失败')
        }
        this.props.gethandleOk()
    }
    //获取用户id
    getProducts1 = async () => {
        console.log("进来了")

        let userdata = {
            "uid": Number(localStorage.uid),
            "token": localStorage.token,
            "serviceName": "userInfoService",
            "methodName": "queryUserInfoByUserName",
            "parameters": {
                "userId": Number(localStorage.uid),
            }
        }
        const result = await getUserData(userdata)
        const userid = result.data.info
        console.log(userid)
        this.setState({
            list: userid

        })
    }
    //获取RoomList
    getRoomList=async ()=>{
            let RoomList={
                "uid": localStorage.uid,
                "token": localStorage.token,
                "serviceName": "roomInfoService",
                "methodName": "queryRoomNum",
                "parameters": {
                }
            }
        const resRoomList= await getUserData(RoomList)
        console.log(resRoomList.data.info)
        RoomList=resRoomList.data.info
        this.setState(
            {
                RoomList
            }
        )
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            // Should format date value before submit.
                                    //处理时间
            const rangeTimeValue = fieldsValue['rangetimepicker'];
            const values = {
                ...fieldsValue,
                'rangetimepicker': [
                    rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
                    rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
                ],
            };
            console.log('Received values of form: ', values);
            //发送添加会议请求
            this.addMeeting(values)
        });
    };
    onChange = (value, dateString) => {

        this.setState({
            startTime: dateString[0]
        })
    }
    //初始化数据
    componentDidMount() {
        this.getProducts1()
        this.getRoomList()
    }
    render() {
        const { RangePicker } = DatePicker;
        const { getFieldDecorator } = this.props.form;
        const { list,RoomList } = this.state;
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: '请添加参会人员' }],
        };
        const rangeConfig_1={
    rules: [{  required: true, message: '清选择会议房间' }],
}
        const children = [];
        const roomChildren=[]
        RoomList.forEach(function (item, i) { roomChildren.push(<Option key={item.roomNum}>{item.roomNum}</Option>) })
        function _handleChange(value) {
            console.log(`selected ${value}`);
        }
        list.forEach(function (item, i) { children.push(<Option key={item.userId}>{item.userName}</Option>) })
        function handleChange(value) {
            console.log(`selected ${value}`);
        }
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} labelAlign='left'>
                <Form.Item label="会议时间">
                    {getFieldDecorator('rangetimepicker', rangeConfig)(
                        <RangePicker  disabledDate={disabledDate}
                                      disabledTime={disabledRangeTime}
                                      showTime={{
                                          hideDisabledOptions: true,
                                      }}
                                      format="YYYY-MM-DD HH:mm:ss" />,
                    )}
                </Form.Item>
                <Form.Item label="主题">
                    {getFieldDecorator('meetingTitle', {
                        rules: [
                            {

                                message: '请填写会议主题!',
                            },
                            {
                                required: true,
                                message: '请填写会议主题!',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="会议备注">
                    {getFieldDecorator('meetingNote', {
                        rules: [
                            {

                                message: '请填写会议备注!',
                            },
                            {
                                required: true,
                                message: '请填写会议备注!',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="参会人员">
                    {getFieldDecorator('userid', rangeConfig)
                    (<Select mode="tags" style={{ width: '100%' }}
                             onChange={_handleChange} tokenSeparators={[',']}>
                        {children}
                    </Select>)}
                </Form.Item>
                <Form.Item label="选择房间号">
                    {getFieldDecorator('roomNum', rangeConfig_1)
                    (<Select  style={{ width: '100%' }}
                             onChange={handleChange} tokenSeparators={[',']}>
                        {roomChildren}
                    </Select>)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        添加
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
export default WrappedRegistrationForm
