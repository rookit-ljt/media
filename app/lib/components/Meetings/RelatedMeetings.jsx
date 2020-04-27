import React from "react";
import Meeting from "../tips/meetingList";
class RelatedMeetings  extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            Title:'',
            meetingType:2
        }
    }
    render(){
        const {Title, meetingType}=this.state
        return(
            <div className='relatedMeetings'>
                <Meeting Title={Title} meetingType={meetingType}/>
        </div>
        )
    }
}
export default RelatedMeetings