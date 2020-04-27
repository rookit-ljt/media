import React from "react";
import {getUserData} from '../../redux/api/'

class RecordDetails extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            record:{}
        }

    }
    getRecordDetails= async ()=>{
        let reqRecord={
            "uid": parseInt(localStorage.uid),
            "token": localStorage.token,
            "serviceName": "meetingRecordService",
            "methodName": "queryMeetingRecordById",
            "parameters": {
                "recordId":parseInt(this.props.match.params.newid)
        }

    }
        const resRecord=await getUserData(reqRecord)
        console.log(resRecord)
        this.setState({
            record:resRecord.data
        })
    }
    componentDidMount() {
        this.getRecordDetails()
    }

    render() {
        console.log(this.props.match.params.newid)
const data=this.state.record
        return(
            <div className="RecordDetails" data-component="RecordDetails">
                <div className='RecordDetails_div'>
                    <p className='header'>
                        某某县人民法院第一次
                    </p>
                    <p className='header_content'>
                        <div>主持人：{data.hostName}</div>
                        <div>会议开始时间：{data.startTime}</div>
                        <div>会议结束时间：{data.endTime}</div>
                    </p>
                    <div className='content'>

                        {data.meetingContent}

                    </div>
                </div>
            </div>
        )
       }

}
export default RecordDetails