import React from "react";
import {getUserData} from "../../redux/api";
import { Tag ,Card}from 'antd'
class Details extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            data:{},
            array:[]
        }
    }
    _getDetails=async ()=>{
        let resdata={
            "uid": parseInt(localStorage.uid),
            "token": localStorage.token,
            "serviceName": "infoService",
            "methodName": "selectAndUpdateInformationDetail",
            "parameters":{
                "userId": parseInt(localStorage.uid),
                "infoId":parseInt(this.props.match.params.newid)
            }
        }
        const reqdata=await getUserData(resdata)
        console.log(reqdata)
        this.setState({
            data:reqdata.data,
            array:reqdata.data.receive
        })

    }
    componentDidMount() {
        this._getDetails()
    }

    render() {
        console.log(this.props.match.params.methd)
        const {array,data}=this.state

        return(
            <div className='Details'>
                <p className='Details-header'>消息详情 <span
                    style={{float:"right",marginRight:10}} onClick={this.props.history.goBack}>
                                        <a href="#" > 返回</a>
                </span></p>
                <p className='Details-header_p1'>发件人：{data.sendName}</p>
                <p className='Details-header_p1'>时间：{data.createTime}</p>
                <p className='Details-header_p1'>收件人：{array.map(e=><Tag color="blue">{e}</Tag>)}</p>
                <div style={{padding:10}}
                    dangerouslySetInnerHTML={{__html:data.infoContent}}></div>
            </div>
        )
    }
}
export default Details