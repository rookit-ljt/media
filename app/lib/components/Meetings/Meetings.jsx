import React, {Component} from 'react';
import {Menu, Tabs} from 'antd';
import {connect} from "react-redux";
import MyConference from "./MyConference";
import RelatedMeetings from "./RelatedMeetings";

const {SubMenu} = Menu;
const {TabPane} = Tabs;

class Meetings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Title: ''
        }
    }

    componentDidMount() {
    }

    render() {
        return (

            <div data-component='Meetings'>


                <Tabs defaultActiveKey="1" size='large' animated={{inkBar: false, tabPane: true}}
                      tabBarStyle={{color: "black", fontSize: 50}}>
                    <TabPane tab="相关会议" key="1" className='MyConference'>
                        <MyConference/>
                    </TabPane>
                    <TabPane tab="我的会议" key="2" className='RelatedMeetings'>
                        <RelatedMeetings/>
                    </TabPane>


                </Tabs>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        reqUserId(data, callback) {
            const action = getRecord(data, callback);
            dispatch(action);
        }
    }
}
const mapStateToProps = state => ({
    state: state
})
export default connect(mapStateToProps, mapDispatchToProps)(Meetings)
