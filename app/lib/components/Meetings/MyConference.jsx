import React from "react";
import  Meeting from  '../tips/meetingList'
class MyConference  extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            Title:'',
            meetingType:3
        }

    }
    render(){
        const {Title, meetingType}=this.state
        return(
            <div className='myConference'>
                <Meeting Title={Title} meetingType={meetingType}/>
            </div>
        )


    }

}
export default MyConference