import React, {Component} from 'react';
import {connect} from "react-redux";
import InfiniteScroll from 'react-infinite-scroller';
import io from "socket.io-client";
import {Button, Input, List, Typography} from 'antd';
import {getUserData} from '../../redux/api/index'
const {Search} = Input

class Context extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayContent: '',
            inputContent: '',
            messages: [],
            socket: {}
        }

        this.contentInputRef = React.createRef()
    }


    setScrollTop = () => {
        this.chat.refs.message.setScrollTop(1200);  //set scrollTop position
    }

    //发送单条聊天请求
    insertMeetingChartRecord =async(content)=>{
       let data={

            "serviceName":"meetingChatInfoService",
            "methodName":"insertMeetingChartRecord",
            "parameters":{
            "userId":Number(localStorage.uid),
                "content":content,
                "meetingId":Number(localStorage.meetingId)

        }

       }
        const resData = await getUserData(data)
       console.log(resData)
    }
    render() {
        const data = this.state.messages
        console.log(data)
        const socket = this.state.socket
        const room = localStorage.getItem("roomId");
        const userName = localStorage.getItem("name");
        return (
            <div>
                {/*<InfiniteScroll initialLoad={false}*/}
                {/*                pageStart={0}*/}
                {/*                useWindow={false}>*/}
                    <List
                        locale={{emptyText:'聊天区'}}
                        style={{height: '60vh', overflow: "auto",marginBottom:"2vh"}}
                        bordered
                        split='true'
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <Typography.Text mark></Typography.Text> {item}
                            </List.Item>
                        )}
                    />

                {/*</InfiniteScroll>*/}

                <div id='inputText'>
                    <textarea
                        style={{
                            borderRadius: 5,
                            backgroundColor: "#e5e5e5",
                            border:1,
                            borderColor:"black",
                            width: 280,
                            height: 100,
                            padding: 10,
                            resize: "none"
                        }}
                        ref={this.contentInputRef}
                        onKeyUp={e => this._onInputKeyUp(e, socket, room, userName)}
                        type="text" name="inputContent" placeholder="Ctrl+Enter发送"
                        onChange={e => this.onInputChange(e)}/>
                    <Button
                        style={{position: 'relative', top:-80, right: '0%'}}
                        shape="round" type='submit' onClick={e => this.onSend(socket, room, userName)}>发送</Button>
                </div>
            </div>
        )
    }
    queryMeetingChartRecordByMeetingId= async ()=>{
        let req={
            "serviceName":"meetingChatInfoService",
            "methodName":"queryMeetingChartRecordByMeetingId",
            "parameters":{
                "meetingId":Number(localStorage.meetingId)
            }
        }
        const res=await getUserData(req)

        let arr=res.data.info.map(e=>e.content)
        console.log (arr)
        this.setState({messages:arr})
    }
    componentDidMount() {
        const socket = io.connect('https://192.168.0.141:9999');
        this.setState({
            socket
        })
        const roomId = localStorage.getItem("roomId");
        socket.emit('join',(roomId))
        socket.on('message', (roomId, id, data) => {
            console.log("此处的room,id,data" + roomId, data)
            this.state.messages.push(data)

        });
        this.queryMeetingChartRecordByMeetingId()
    };


    // //1.当输入框的内容发生变化
    onInputChange(e) {
      console.log(e.target.value)
        console.log(e.target.name)

        //1.1获取当前数据
        let inputValue = e.target.value.replace(/\s+/g,'')
            // ,
        //             // inputName = e.target.name
        //1.2更新数据
        this.setState({
            inputContent: inputValue
        })
    }

    //回車發送
    _onInputKeyUp(e, socket, room, userName) {
        const {inputContent} = this.state
        if (e.keyCode === 13) {
            if (inputContent==='') {
                alert("发送消息不能为空");
                return;
            }
            this.onSend(socket, room, userName);
        }
    }

    // 2.发送内容
    onSend(socket, room, userName) {
        console.log("此处的room" + room)
        console.log("此处的userName" + userName)
        //2.1获取数据
        const {inputContent} = this.state
        console.log(inputContent)
        //2.2验证数据
        if (inputContent==='') {
            alert("发送消息不能为空");
            return;
        }
        let data = userName + ":" + inputContent
        socket.emit('message', room, data);
        console.log(data)
        this.state.messages.push(data);
        this.contentInputRef.current.value = '';
        this.setState({inputContent:''})
       this.insertMeetingChartRecord(data)
    }
}

const mapStateToProps = (state) => {
    return {
        state
    }
}


export default connect(mapStateToProps, null)(Context)
