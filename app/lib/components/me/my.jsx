import React, {Component} from 'react'
import {connect} from "react-redux";
// import { getUserId } from '../../store/actionCreators'
import {getMyDataAction} from "../../redux/stateActions";

import {Link} from 'react-router-dom';

export class My extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }

    componentDidMount() {
        const data =
            {
                "uid": localStorage.uid,
                "token": localStorage.token,
                "serviceName": "userInfoService",
                "methodName": "queryUserInfoDetailByUserId",
                "parameters": {
                    "userId": Number(localStorage.uid)
                }

            }
        this.props.reqUserId(data, (myData) => {
            // console.log(myData);
            if (myData.resultCode !== '000000') {
                console.log(myData)
                window.sessionStorage.setItem('myData', JSON.stringify(myData))
            }
        })
    }

    render() {
        const info = this.props.info
        console.log("此处的职" + JSON.stringify(info.info))

        return (
            <div data-component="My">
                <div className="MyAvatar">
                    <div className="MyAvatar_header"><img src={info.imgUrl} alt=""
                                                          style={{width: 150, height: 150}}/></div>
                    <div className="MyAvatar_header_1">
                        <p>用户名:{info.account}</p>
                        <p>成为成员日期:{info.createTime}</p>
                        <p>部门：{info.employDepartment}</p>
                    </div>
                    <Link to="/myid">
                        <div className="MyAvatar_button">查看详情</div>
                    </Link>
                </div>
                <div className='MyAvatar_2'>
                    <p>提供单位：</p>
                    <p>个人兴趣：</p>
                </div>
                <div className='MyAvatar_3'>
                    <p>姓名：{info.userName}</p>
                    <p>电话：{info.mobile}</p>
                    <p>性别：{info.userGender}</p>
                    <p>组织：{info.unit}</p>
                    <p>部门：{info.department}</p>
                    <p>职位：{info.employ}</p>
                    <p>地址：{info.userAddr}</p>
                </div>
            </div>
        )
    }

}


const mapDispatchToProps = (dispatch) => {
    return {
        reqUserId(data, callback) {
            const action = getMyDataAction(data, callback);
            dispatch(action);
        }
    }
}
const mapStateToProps = state => ({
    info: state.my.info
})
export default connect(mapStateToProps, mapDispatchToProps)(My)