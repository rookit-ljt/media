import React from "react";
import E from 'wangeditor'
import {Select, Input, Button, Form, message,Card} from 'antd';
import {getUserData} from '../../redux/api/'

class InboxForm extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            Addressee:[],
            infoTitle:'',
            infoContent:'',
            IdList:[],
        }
    }
    //发送消息请求
    _SendOut= async (value)=>{
        console.log(value)
        let information={
            "uid": parseInt(localStorage.uid),
            "token": localStorage.token,
            "serviceName": "infoService",
            "methodName": "sendInformation",
            "parameters": {
                "userId" : parseInt(localStorage.uid),
                "infoMark" : 0,
                "infoTitle" :value.infoTitle,
                "infoContent" :this.state.infoContent,
                "receiveUserIds":value.receiveUserIds.map(Number)
            }

        }
        console.log(information)
        const result = await getUserData(information)
        if (result.resultCode === "000000") {
            console.log("添加成功");
            message.success('发送成功')
            this.props.history.push('/text/result');
        }
        else{
            message.error('发送失败')
        }
    }
    //初始化用户列表
    getProducts1 = async () => {
        console.log("进来了")

        let userdata = {
            "uid": Number(localStorage.uid),
            "token": localStorage.token,
            "serviceName": "userInfoService",
            "methodName": "queryUserList",
            "parameters": {
                "userId":Number(localStorage.uid)
            }
        }
        const result = await getUserData(userdata)
        const userid = result.data
        console.log(userid)
        this.setState({
            IdList: userid

        })
    }
    //获取表单输出值
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            this._SendOut(values)
        });

    };
    //初始化
    componentDidMount() {
        this.getProducts1()
        const elemMenu = this.refs.editorElemMenu;
        const elemBody = this.refs.editorElemBody;
        const editor = new E(elemMenu,elemBody)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            console.log(editor.txt.html())
            this.setState({
                // editorContent: editor.txt.text()
                infoContent: editor.txt.html()
            })
        }
        editor.customConfig.menus = [
            // 'head',  // 标题
            'bold',  // 粗体
            // 'fontSize',  // 字号
            // 'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            // 'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            // 'link',  // 插入链接
            // 'list',  // 列表
            // 'justify',  // 对齐方式
            // 'quote',  // 引用
            // 'emoticon',  // 表情
            // 'image',  // 插入图片
            // 'table',  // 表格
            // 'video',  // 插入视频
            // 'code',  // 插入代码
            // 'undo',  // 撤销
            // 'redo'  // 重复
        ]
        editor.customConfig.uploadImgShowBase64 = true
        editor.create()
    };
    render() {
        const { IdList} = this.state;
        console.log(IdList)
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 22 },
            },
        };
        const children=[]

        IdList.forEach(function (item, i) { children.push(<Option key={item.userId}>{`${item.userName}(${item.unit}/${item.department})`}</Option>) })
        function handleChange(value) {
            console.log(`selected ${value}`);
        }
        return(
                <div className="text-area"  >

                    <Card title="发送消息" bodyStyle={{height:600}}  extra={<Button type="primary" onClick={this.handleSubmit}  style={{float:"right"}}>
                        发送
                    </Button>} >
                        <Form {...formItemLayout}
                              onSubmit={this.handleSubmit}>
                            <Form.Item label="标题">
                                {getFieldDecorator('infoTitle', {
                                    rules: [{ required: true,message: '请添加标题!' }],
                                })(
                                    <Input
                                        placeholder="输入消息标题"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item label="收件人">
                                {getFieldDecorator('receiveUserIds',{
                                    rules: [{ required: true,message: '请添加收件人!' }],
                                })
                                (<Select  mode="tags" style={{ width: '100%' }}
                                          onChange={handleChange} tokenSeparators={[',']}
                                          dropdownStyle={{zIndex:9999999}}
                                          filterOption={(input, option) =>
                                              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                          }
                                          placeholder="添加收件人"
                                >
                                    {children}
                                </Select>)}
                            </Form.Item>



                        </Form>

                        <div ref="editorElemMenu"
                             style={{backgroundColor:'#f1f1f1',border:"1px solid #ccc",width:'100%',}}
                             className="editorElem-menu">
                        </div>
                        <div
                            style={{
                                padding:"0 10px",
                                overflowY:"scroll",
                                height:'60%',
                                width:'100%',
                                border:"1px solid #ccc",
                                borderTop:"none"
                            }}
                            ref="editorElemBody" className="editorElem-body">
                        </div>
                    </Card>
            </div>
        )
    }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(InboxForm);

export default WrappedNormalLoginForm