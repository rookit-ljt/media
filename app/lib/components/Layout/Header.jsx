import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Divider,Modal,Icon} from 'antd';
import {getMyDataAction, userLogoutAction} from "../../redux/stateActions";
import {createHashHistory} from 'history'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            UserData: {},
            visible:false

        }
    }
    showModal=()=>{
        this.setState({visible:true})
    }
    //确定退出
    handelOK=()=>{
        this.setState({
            visible:false
        })
        this._logOut()
    }
    //取消退出
    handleCancel=()=>{
        this.setState({
            visible:false
        })
    }
    _logOut() {
        let data = {
            "uid": Number(localStorage.uid),
            "token": localStorage.token,
            "serviceName": "userInfoService",
            "methodName": "userLogout",
            "parameters": {
                "userId": parseInt(localStorage.uid)
            }
        }
        this.props.userLogout(data, (userData) => {
            console.log(userData)
            if (userData === "000000") {
                console.log("注销" + userData);
                //   1. 清空本地数据
                sessionStorage.removeItem('myData');
                localStorage.removeItem('token')
                // 2. 回到首页
                window.location.href = '/';
            }

        })
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
            if (myData.resultCode !== '000000') {
                window.sessionStorage.setItem('myData', JSON.stringify(myData))
            }
        })
    }

    render() {
        const info = this.props.info
        return (
            <div className="header">
                <div className="header-content">
                    <div className="header-text">宜联科技案件会审系统</div>

                    <div className="header-right">

                        <div className="header-right-person">

                            <div className="dropdown">
                                    <div>
                                        <Link to="/myid">
                                            <a title='基本信息' >
                                                <svg t="1577956479450" className="icon" viewBox="0 0 1024 1024" version="1.1"
                                                     xmlns="http://www.w3.org/2000/svg" p-id="11660" width="28" height="28">
                                                    <path
                                                        d="M929.024 816.2816a452.9152 452.9152 0 0 0-240.2304-239.4112l-1.4336-0.5632a297.728 297.728 0 1 0-348.672 0c-0.512 0-0.9728 0.3584-1.4336 0.6144a449.3824 449.3824 0 0 0-275.712 404.48 9.5744 9.5744 0 0 0 9.6256 9.8304H143.36a9.6256 9.6256 0 0 0 9.6256-9.3184 359.7312 359.7312 0 0 1 360.192-349.5936 359.7312 359.7312 0 0 1 360.192 349.5936 9.472 9.472 0 0 0 9.6256 9.3184h71.9872a9.5744 9.5744 0 0 0 9.6256-9.8304 445.44 445.44 0 0 0-35.584-165.12z m-416-274.688A206.2848 206.2848 0 1 1 658.9952 481.28a205.4144 205.4144 0 0 1-145.9712 60.3136z"
                                                        fill="#707070" p-id="11661"></path>
                                                </svg>
                                            </a>
                                        </Link>
                                    </div>

                                <div className="dropdown-content">
                                    <p><span className='span1'>姓名：</span><span className='span_1'>{info.userName}</span>
                                    </p>
                                    <p><span className='span1'>用户名：</span><span className='span_1'>{info.account}</span>
                                    </p>
                                    <p><span className='span1'>组织：</span><span className='span_1'>{info.unit}</span></p>
                                    <p><span className='span1'>部门：</span><span
                                        className='span_1'>{info.department}</span></p>
                                    <p><span className='span1'>电话：</span><span
                                        className='span_1'>{info.phone}</span></p>
                                    <p><span className='span1'>角色：</span><span
                                        className='span_1'>{info.roleName}</span></p>
                                </div>

                            </div>
                            <Divider type="vertical"
                                     style={{height: 30, marginRight: 20, width: 2, backgroundColor: '#cdcdcd'}}/>
                            <div className="dropbtn">
                                <a title='注销' style={{fontSize: 20,}} onClick={this.showModal}>
                                    <svg t="1577956643658" className="icon" viewBox="0 0 1024 1024" version="1.1"
                                         xmlns="http://www.w3.org/2000/svg" p-id="12529" width="28" height="28">
                                        <path
                                            d="M844.743718 155.159516c102.669129 91.975601 161.44772 223.185706 161.784387 361.004309 0 272.076108-220.339897 490.36121-494.526058 490.36121-274.191278 0-494.531175-218.37413-494.531175-490.294696 0.33462-137.818603 59.136747-269.028708 161.783363-361.004309 22.613998-13.416541 54.046832-17.937499 85.479666 4.386905 31.521861 26.700052 36.030539 62.384714 13.416541 84.709118-76.282208 66.827901-125.752824 160.432602-125.752824 271.840748 0 196.197082 161.783363 356.64094 359.603405 356.64094 197.814926 0 359.597266-160.443858 359.597266-356.64094 0-106.888212-49.470616-205.013871-125.751801-271.840748-9.10843-13.427797-18.01527-49.034688 13.416541-84.776656 22.751121-24.0763 60.410761-26.006252 85.480689-4.385881zM450.114658 84.380637v-0.077771 426.995147c0 35.595635 31.43181 66.749107 67.469513 66.749107 35.89751 0 67.396858-31.153472 67.396858-66.749107V84.302866c0-35.606891-31.432834-66.827901-67.464396-66.827901-35.90365 0-67.401975 31.219986-67.401975 66.905672z"
                                            p-id="12530" fill="#af1504"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal title='提示'
                visible={this.state.visible}
                onOk={this.handelOK}
                onCancel={this.handleCancel}
                       okText='退出'
                       cancelText='返回'
                >
                    <h5>确定退出？</h5>
                </Modal>
            </div>

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        reqUserId(data, callback) {
            const action = getMyDataAction(data, callback);
            dispatch(action);
        },
        userLogout(data, callback) {
            const action = userLogoutAction(data, callback);
            dispatch(action);
        }
    }
}

const mapStateToProps = state => ({
    info: state.my.info
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)


