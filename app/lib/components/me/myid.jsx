import React, {Component} from 'react'
import {
    getUserData} from "../../redux/api/index";
import { Form,Card,Input,Button, message} from 'antd';
import {connect} from "react-redux";
import {getMyDataAction, userLogoutAction} from "../../redux/stateActions";

export class MyId extends Component {
    constructor(props) {
        super(props)
        this.state={
            userInfo:{}
        }
    }
    onFinish=async()=>{
        this.props.form.validateFields(async (err,value)=>{
            if(!err){
                console.log(value)
                let data={
                    'uid':Number(localStorage.uid),
                    'token':localStorage.token,
                    'serviceName':'userInfoService',
                    'methodName':'addOrUpdateUser',
                    'parameters':{
                        'userId':Number(localStorage.uid),
                         'account':value.account,
                        'userName':value.userName,
                        'password':value.password,
                        'phone':value.phone,
                        'unit':value.unit,
                        'department':value.department
                    }
                }
                const res = await getUserData(data)
                console.log(res)
                if(res.resultCode==='000000'){
                    message.success('修改成功')
                }
                    else
                    {
                    message.error('修改失败')

                }
            }
        })
}
    componentDidMount() {

    }



    render() {
        const userInfo=this.props.info
        console.log(userInfo)
        const {getFieldDecorator}=this.props.form
            const formItemLayout={
                labelCol:{span:3},
                wrapperCol:{
                    span:20
                }
            }
        return (

            <div data-component='MyId'>
                {/*编辑/保存，按钮 */}<Card
                title={'个人信息' }
                style={{width:500,margin:'Auto'}}
                extra={<Button onClick={this.onFinish} >保存</Button>}
            >
                < Form {...formItemLayout}
                >
                    <Form.Item label='帐号'>
                        {
                            getFieldDecorator(
                                'account',{
                                    initialValue:userInfo.account
                                }


                            )
                            (<Input disabled></Input>)
                        }
                    </Form.Item>
                    <Form.Item label='姓名'>
                        {
                            getFieldDecorator(
                                'userName',{
                                    initialValue:userInfo.userName,
                                    rules:[
                                        {required:true,message:'姓名不能为空'

                                        },
                                        {
                                            max:13,message: '姓名过长'
                                        }
                                    ]  }



                            )
                            (<Input></Input>)
                        }

                    </Form.Item>
                    <Form.Item label='密码'>
                        {
                            getFieldDecorator(
                                'password',{
                                    rules:[
                                        {required:true,message:'密码不能为空'

                                        },
                                        {
                                            max:13,message: '密码过长'
                                        }
                                    ],
                                    initialValue:userInfo.password
                                }


                            )
                            (<Input.Password></Input.Password>)
                        }
                     </Form.Item>
                    <Form.Item label='手机号'>
                        {
                            getFieldDecorator(
                                'phone',{
                                    rules:[
                                        {required:true,message:'手机号不能为空'

                                        },
                                        {
                                            required: false,
                                            pattern:new RegExp(/^1[3456789]\d{9}$/,'g'),
                                            message: '请输入在正确的手机号'
                                        }
                                    ],
                                    initialValue:userInfo.phone
                                }


                            )
                            (<Input></Input>)
                        }
                    </Form.Item>
                    <Form.Item label='单位'>
                        {
                            getFieldDecorator(
                                'unit',{
                                  rules:[
                                      {required:true, message:'单位名称必须输入'},{
                                      max:13,message: '字符过长'
                                      }
                                  ],
                                    initialValue:userInfo.unit
                                }


                            )
                            (<Input></Input>)
                        }
                    </Form.Item>
                    <Form.Item label='部门'>
                        {
                            getFieldDecorator(
                                'department',{
                                    rules:[
                                        {required:true, message:'部门名称必须输入'},{
                                            max:13,message: '字符过长'
                                        }
                                    ],
                                    initialValue:userInfo.department
                                }


                            )
                            (<Input></Input>)
                        }
                    </Form.Item>
                </Form>
            </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create() (MyId))