import React, { Component } from 'react';
import { connect } from "react-redux";
import {getUserDataAction} from "../redux/stateActions";
import {message,Icon}from 'antd'
class Login extends Component{
    constructor(props) {
        super(props);
        this.state={
            account:'',
            password:''
        }
    }
    render(){
        return(
            <div data-component='Login'>
                <div className="box"> 
                    <div className="left"><img src="../../resources/img/loginImg.png"/>
                    <div className="p1">案件会审系统</div>
                    <div className="p2">CASE JOINT TRRIAL SYSTEM</div>
                    </div>
                    <div className="right">
                        <div className="top">
                            <div className="welcome">WELCOME</div>
                            <div className="h1"></div>
                             <div className="h2"></div>
                        </div>
                        <span>登录</span>
                        <div className="form">
                        <div className="inputLog"><span ><svg style={{position:"relative" ,top:10,left:-25}} t="1578978875034" className="icon"
                                                                  viewBox="0 0 1024 1024" version="1.1"
                                                                  xmlns="http://www.w3.org/2000/svg" p-id="2804"
                                                                  width="30" height="30"><path
                            d="M512 64C265 64 64 265 64 512s201 448 448 448 448-201 448-448S759 64 512 64zM282.2 833.4c10.4-121 109.5-209.6 229.8-209.6 120.3 0 219.4 88.5 229.8 209.6-64.8 46.5-144.2 73.9-229.8 73.9-85.6 0-165-27.4-229.8-73.9z m108.4-408.8c0-66.9 54.4-121.3 121.4-121.3 66.9 0 121.4 54.4 121.4 121.3S579 546 512 546c-66.9 0-121.4-54.5-121.4-121.4zM789 793.8C766.7 690.4 688.4 609 587.8 581.3c58.1-28.2 98.3-87.8 98.3-156.7 0-96-78.1-174-174.1-174s-174.1 78.1-174.1 174c0 68.8 40.2 128.4 98.3 156.7-100.6 27.6-178.8 109-201.2 212.5C162 722 116.7 622.2 116.7 512c0-218 177.3-395.3 395.3-395.3S907.3 294 907.3 512c0 110.2-45.3 210-118.3 281.8z"
                            p-id="2805" fill="#0177D0"></path></svg></span >
                    <input name="account" type="text"  onChange={e=>this._onInputChange(e)} onKeyUp={e=>this.onInputKeyUp(e)}/>
                </div>
                <div className="pass"><span ><svg  style={{position:"relative" ,top:10,left:-25}} t="1578978804253" className="icon" viewBox="0 0 1024 1024"
                                                 version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1940"
                                                 width="30" height="30"><path
                    d="M817.08 390.05h-61.017v-81.34c0-134.513-109.475-243.932-244.062-243.932s-244.066 109.42-244.066 243.93v81.342h-61.016c-33.7 0-61.017 27.301-61.017 60.982V898.24c0 33.679 27.319 60.983 61.017 60.983h610.16c33.7 0 61.017-27.303 61.017-60.983V451.03c0-33.68-27.318-60.981-61.016-60.981z m-488.13-81.342c0-100.883 82.11-182.949 183.05-182.949 100.94 0 183.049 82.066 183.049 182.949v81.342H328.95v-81.342z m488.13 589.53H206.92V451.032h610.16V898.24zM512 786.448c16.844 0 30.508-13.657 30.508-30.492v-162.62c0-16.832-13.664-30.491-30.507-30.491s-30.508 13.66-30.508 30.491v162.621c-0.001 16.835 13.664 30.49 30.508 30.49z"
                    fill="#0177D0" p-id="1941"></path></svg></span>
                    <input name="password" type="password" onChange={e=>this._onInputChange(e)} onKeyDown={e=>this.onInputKeyUp(e)}/>
                </div>
                <button type="submit" onClick={e=>this._onSubmit(e)} onKeyDown={e=>this.onInputKeyUp(e)}>
                    登录
                </button>
                        </div>
                
                    </div>
                    
                </div>
            </div>
                 
        )
    }
    //1.当输入框的内容发生变化
    _onInputChange(e){
        //1.1获取当前数据
        let inputValue = e.target.value,
            inputName = e.target.name;
        //1.2更新数据
        this.setState({
            [inputName]:inputValue
        })

    }
    //2.处理回车
    onInputKeyUp(e){
        if(e.keyCode === 13){
            this._onSubmit();
        }
    }
    //3.当用户提交表单
    _onSubmit(){
        
        //3.1获取数据
        const {account,password}=this.state;
        //3.2输入数据
        if(!account){
            message.warning('输入的用户名不能为空');
            return;
        }
        if(!password){
            message.warning('输入的密码不能为空');
            return;
        }

        let data = {
            "serviceName":"userInfoService",
            "methodName":"userLogin",
            "parameters":{
                "account":this.state.account,
                "password": this.state.password,
                "roleType":0
            }
        }
        //3.4发起网络请求
        this.props.reqLogin(data,(userData)=>{
            console.log("此处的"+userData)
            if(userData.token !== ''){
                message.success('登陆成功');
                window.localStorage.setItem('token',userData.token)
                window.localStorage.setItem('uid', userData.uid)
                window.localStorage.setItem('name', userData.userName)
                this.props.history.push('/home');

            }
        else {
                message.error('登陆失败');
            }
        })
}

}
const mapDispatchToProps=(dispatch)=>{
    return{
        reqLogin(data,callback){
            const action = getUserDataAction(data,callback);
            dispatch(action);
        }
    }
}

export default connect(null,mapDispatchToProps)(Login);
