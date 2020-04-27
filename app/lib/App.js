import React from 'react';
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import LayOut from './components/Layout/LayOut';
import Home from './components/home/Home'
import Record from './components/Record/record'
import My from './components/me/my'
import MyId from "./components/me/myid"
import MyMeeting from "./components/me/myMeeting";
import text from "./components/text/text"
import Meetings from "./components/Meetings/Meetings";
import MeetingRoom from './components/meetingRoom/Index'
import Login from "./components/Login";
import RecordDetails from './components/Record/RecordDetails'
import AttendanceInfo from './components/test'
import Bord from './components/whiteBoard/WhiteBoard'
import {connect} from "react-redux";
import {getUserDataAction} from "./redux/stateActions";
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

class App extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        console.log(this.props.userData)
        let LayOutRouter = (
            < LayOut>
                < Route
                    path="/home"
                    component={Home}
                    exact
                />
                < Route
                    path="/recordDetails/:newid"
                    component={RecordDetails}
                />
                < Route
                    path="/text"
                    component={text}
                />
                < Route
                    path="/record"
                    component={Record}
                />
                < Route
                    path="/my"
                    component={My}
                />
                < Route
                    path="/myid"
                    component={MyId}
                />
                < Route
                    path='/mymeeting'
                    component={MyMeeting}
                />
                < Route
                    path='/meetings'
                    component={Meetings}
                />
                < Route
                    path='/Board'
                    component={Bord}
                />
            </LayOut>
        );
        return (
            < Router>
                < Switch>
                    < Route exact path="/" render={
                        this.props.userData === undefined ? (props) =>
                            < Redirect to="/login" push/> : LayOutRouter}
                    />

                    < Route path="/login" component={Login}/>
                    < Route
                        path="/meetingRoom"
                        component={MeetingRoom}
                    />

                    < Route path="/" render={props => LayOutRouter}/>

                </Switch>
            </Router>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        reqLogin(data, callback) {
            const userData = JSON.parse(sessionStorage.getItem('myData'));
            const action = getUserDataAction(userData, callback);
            dispatch(action);
        }
    }
}
const mapStateToProps = (state) => {
    return {
        userData: state.userData
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

