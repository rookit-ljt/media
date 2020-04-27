import React, { Component } from 'react';
import Draw from'../whiteBoard/WhiteBoard'
import { Icon,Modal,Button,Input} from 'antd';
import {connect} from "react-redux";
import {getUserData} from '../../redux/api/'
const { TextArea } = Input;



class WhiteBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            value:'',
            confirmLoading: false,
        }

    }
//发送添加记录请求
  _AddRecord=async()=>{
        let data={
            "uid": Number(localStorage.uid),
            "token": localStorage.token,
            "serviceName": "meetingRecordService",
            "methodName": "addMeetingRecord",
            "parameters": {
                "meetingId":this.props.state.client.meetingId,
                'meetingContent':this.state.value,
                'meetingTitle':this.props.state.client.meetingTitle,
                'userId':parseInt(localStorage.uid)
            }
        }
        const res =await getUserData(data)
if(res.resultCode){
    alert('添加成功')
}
    console.log(res)
  }
  showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = e => {
        this.setState({
            visible: false,
            confirmLoading: true,
        });
        this._AddRecord()
        setTimeout(() => {

                    this.setState({
                        visible: false,
                        confirmLoading: false,
                    });
                }

            , 2000);
    };
    onChange = ({ target: { value } }) => {
        this.setState({ value });
        console.log(value)
    };
    handleCancel = e => {

        this.setState({
            visible: false,
        });
    };

    render(){

        const {value} =this.state
        return (

            <div >

            {/*<div className="WhiteBoard_header" >*/}
            {/*  <p className='WhiteBoard_text'>*/}
            {/*      <span className='WhiteBoard_span' style={{marginRight:320}}>电子白板*/}
            {/*      </span>*/}
            {/*      <a onClick={this.showModal}><Icon type="folder-add"  style={{ fontSize: 30, color: "rgba(255,255,255,1)" }} theme="twoTone" />*/}
            {/*      </a>*/}
            {/*  </p>*/}
            {/*    <Modal*/}
            {/*        title="会议记录"*/}
            {/*        visible={this.state.visible}*/}
            {/*        onOk={this.handleOk}*/}
            {/*        onCancel={this.handleCancel}*/}
            {/*        confirmLoading={this.state.confirmLoading}*/}
            {/*        okText='提交'*/}
            {/*        cancelText="取消"*/}
            {/*    >*/}
            {/*        <TextArea*/}
            {/*            value={value}*/}
            {/*            onChange={this.onChange}*/}
            {/*            placeholder="填写会议记录"*/}
            {/*            autoSize={{ minRows: 3, maxRows: 5 }}*/}
            {/*        />*/}
            {/*    </Modal>*/}
            {/*</div >*/}

                    <Draw/>

            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        state
    }
}


export default connect(mapStateToProps,null)(WhiteBoard);
