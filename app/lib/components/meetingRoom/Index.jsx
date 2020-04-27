import React, {Component} from 'react';
import Client from './Client'
import WhiteBoard from './WhiteBoard'
import {getUserData} from '../../redux/api/'
import Room from '../Room'
import {connect} from "react-redux";
import * as requestActions from "../../redux/requestActions";
import PropTypes from "prop-types";
import * as appPropTypes from "../appPropTypes";
import {Button, Card, Col, Icon, Layout, Row, Tabs, Tree,message,Modal,Upload} from 'antd';
const {DirectoryTree, TreeNode} = Tree
const {TabPane} = Tabs;
const {Header, Footer, Sider, Content} = Layout;


const props = {

    name: 'file',
    accept:'image/*',
    action: '/file/upload/',
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    method: 'post',
    headers: {
        authorization: 'authorization-text',
        enctype:'multipart/form-data'
    },
};

class Index extends Component {

    state = {
        collapsed: false,
        collapsed1: false,
        treeData: [],
        expandedKeys: ['0-0-0', '0-0-1'],
        autoExpandParent: true,
        checkedKeys: ['0-0-0'],
        selectedKeys: [],
        DetailsId: {},
        participants: [],
        img: '../../../resources/img/kong.png',
        visible: false,
        fileList:[]

    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    toggle1 = () => {
        this.setState({
            collapsed1: !this.state.collapsed1,
        });
    };


    _getQueryFileTreeList = async () => {
        let data = {
            "uid": Number(localStorage.uid),
            "token": localStorage.token,
            "serviceName": "meetingInfoService",
            "methodName": "queryDocument",
            "parameters": {
                "meetingId": Number(localStorage.getItem("meetingId")),

            }
        }
        const resdata = await getUserData(data)
        if (resdata.resultCode === "000000") {
            this.setState({treeData:resdata.data})
        }
    }
    onExpand = () => {
        console.log('Trigger Expand');
    };
    onSelect = (keys, event) => {
        // console.log('onSelect', info.node.props.url);
        console.log('Trigger Select', keys, event);
        this.setState({img:keys})
    };
    //上传图片服务器成功后回来的参数保存到状态中。
    upOnChange=(info)=>{
        let fileList
        console.log(info+'info')
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
            let upfileList=info.fileList
            let fileList= upfileList.map(e=> ({files:e.response.data.url,fileName:e.data.fileName}  )

            )
            console.log(fileList)
            this.setState({
                fileList
            })
        }
        if (info.file.status === 'done') {

        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败.`);
        }

    }
    handleOk=async ()=>{
        let {fileList}=this.state
        let data={
            'uid':Number(localStorage.uid),
            'token':localStorage.token,
            'serviceName':'meetingInfoService',
            'methodName':'uploadDocument',
            'parameters':{
                'meetingId':Number(localStorage.getItem("meetingId")),
                "userId":Number(localStorage.uid),
                "files":fileList
            }
        }
        const res=await getUserData(data)
        if (res.resultCode === "000000") {
            console.log(res.data)
            this.setState({treeData:res.data})
            message.success('添加图片成功')
            console.log(res)
            this.setState({
                visible: false,
            });
        }
        else {message.error('添加失败')}


        this._getQueryFileTreeList()

    }
    handleCancel=()=>{
        this.setState({
            visible: false,
        });
    }

    backRoom = () => {
        this.props.history.goBack()
    }
    componentDidMount() {

        this._getQueryFileTreeList()
    }
    upOnChange=(info)=>{

        // if (info.file.status !== 'uploading') {
        //     console.log(info.file, info.fileList);
        //     let upfileList=info.fileList
        //     let fileList= upfileList.map(e=> ({url:e.response.data}  )
        //
        //     )
        //     console.log(fileList)
        //     this.setState({
        //         fileList
        //     })
        // }
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
            let upfileList=info.fileList
            let fileList= upfileList.map(e=> ({url:e.response.data.url,fileName:e.response.data.fileName}  )

            )
            console.log(fileList)
            this.setState({
                fileList
            })
        }
        if (info.file.status === 'done') {

        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败.`);
        }

    }

    render() {
        const {treeData}=this.state
        console.log(this.state.img)
        return (
            <div data-component='MeetingRoom'>
                <Layout>
                    {/*头部*/}
                    <Row style={{backgroundColor: "#537ae8", height: "10%"}} type="flex" justify="center"
                         align="middle">
                        <Col span={4}>
                            <p>
                                <span style={{color: "white", fontSize: 30}}>房间名称</span>
                                <span style={{color: "white", fontSize: 24}}>{localStorage.getItem("roomId")}</span>
                            </p>
                        </Col>
                        <Col span={1} offset={16}>
                         {/*<Button href={'EVshell://hello'}>屏幕录制</Button>*/}
                            {/*<Link to='/home'><Button>退出房间</Button></Link>*/}
                        </Col>
                        <Col span={1} offset={1} >
                            <Button onClick={this.backRoom}>退出房间</Button>
                            {/*<Link to='/home'><Button>退出房间</Button></Link>*/}
                        </Col>
                    </Row>
                    {/*功能区*/}
                    <Layout>
                        <Sider collapsedWidth={0} width={500} trigger={null} collapsible
                               collapsed={this.state.collapsed} style={{backgroundColor: "white"}}>
                            <Card style={{width: "100%", height: "100%"}}>
                                <Tabs type="card">
                                    <TabPane tab="白板" key="1">
                                        <WhiteBoard/>
                                    </TabPane>
                                    <TabPane tab="文件共享" key="2">
                                        {/*需要拼接服务器路径*/}
                                        <img style={{width: "100%", height: "100%"}}
                                             src={this.state.img}></img>
                                    </TabPane>
                                </Tabs>
                            </Card>
                        </Sider>
                        <Sider width={30} style={{backgroundColor: "#f0f2f5"}}>
                            {/*展开·收缩按钮*/}
                            <div style={{
                                height: "20%",
                                width: 30,
                                backgroundColor: "#537ae8",
                                borderRadius: 5,
                                marginTop: 100,
                                color: "white",
                                fontSize: 18,
                                textAlign: "center",
                                paddingTop: 30
                            }} onClick={this.toggle}> {this.state.collapsed ? '展开画板' : '缩进画板'}
                                <Icon
                                    style={{color: "white"}}
                                    type={this.state.collapsed ? "right-circle" : 'left-circle'}/>
                            </div>
                            {/*<div style={{*/}
                            {/*    height: "20%",*/}
                            {/*    width: 30,*/}
                            {/*    backgroundColor: "#537ae8",*/}
                            {/*    borderRadius: 5,*/}
                            {/*    marginTop: 100,*/}
                            {/*    color: "white",*/}
                            {/*    fontSize: 18,*/}
                            {/*    textAlign: "center",*/}
                            {/*    paddingTop: 30*/}
                            {/*}} onClick={this.toggle1}> {this.state.collapsed1 ? '展开画板' : '缩进画板'}<Icon*/}
                            {/*    style={{color: "white"}} type={this.state.collapsed1 ? "left-circle" : 'right-circle'}/>*/}
                            {/*</div>*/}
                        </Sider>
                        <Content> <Room/></Content>

                        <Sider width={30} style={{backgroundColor: "#f0f2f5"}}>
                            {/*展开·收缩按钮*/}
                            {/*<div style={{*/}
                            {/*    height: "20%",*/}
                            {/*    width: 30,*/}
                            {/*    backgroundColor: "#537ae8",*/}
                            {/*    borderRadius: 5,*/}
                            {/*    marginTop: 100,*/}
                            {/*    color: "white",*/}
                            {/*    fontSize: 18,*/}
                            {/*    textAlign: "center",*/}
                            {/*    paddingTop: 30*/}
                            {/*}} onClick={this.toggle}> {this.state.collapsed ? '展开画板' : '缩进画板'}*/}
                            {/*    <Icon*/}
                            {/*        style={{color: "white"}}*/}
                            {/*        type={this.state.collapsed ? "left-circle" : 'right-circle'}/>*/}
                            {/*</div>*/}
                            <div style={{
                                height: "20%",
                                width: 30,
                                backgroundColor: "#537ae8",
                                borderRadius: 5,
                                marginTop: 100,
                                color: "white",
                                fontSize: 18,
                                textAlign: "center",
                                paddingTop: 30
                            }} onClick={this.toggle1}> {this.state.collapsed1 ? '展开聊天' : '缩进聊天'}<Icon
                                style={{color: "white"}} type={this.state.collapsed1 ? "left-circle" : 'right-circle'}/>
                            </div>
                        </Sider>
                        {/*白板功能区*/}

                        {/*聊天·文件功能区*/}
                        <Sider collapsedWidth={0} width={400} trigger={null} collapsible
                               collapsed={this.state.collapsed1} style={{backgroundColor: "white"}}>
                            <Card style={{width: "100%", height: "100%"}}>
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="聊天" key="1">
                                        <Client/>
                                    </TabPane>
                                    <TabPane tab="文件" key="2">
                                        <Button type="primary" size={"small"} onClick={this.showModal}>添加文件</Button>
                                        <DirectoryTree
                                            multiple
                                            defaultExpandAll
                                            onSelect={this.onSelect}
                                            onExpand={this.onExpand}
                                            treeData={treeData}
                                        >

                                        </DirectoryTree>

                                    </TabPane>
                                </Tabs>
                            </Card>
                        </Sider>
                    </Layout>
                    <Footer style={{backgroundColor: "#537ae8"}}></Footer>
                </Layout>
                <Modal
                    title="图片上传"
                    visible={this.state.visible}
                    okText="确定"
                    cancelText="取消"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Upload {...props} onChange={this.upOnChange}>
                        <Button>
                            上传
                        </Button>
                    </Upload>
                </Modal>
            </div>

        )
    }

}

Room.propTypes =
    {
        roomClient: PropTypes.any.isRequired,
        room: appPropTypes.Room.isRequired,
        me: appPropTypes.Me.isRequired,
        amActiveSpeaker: PropTypes.bool.isRequired,
        onRoomLinkCopy: PropTypes.func.isRequired
    };

const mapStateToProps = (state) => {
    return {
        room: state.room,
        roomId: state.client.room,
        me: state.me,
        amActiveSpeaker: state.me.id === state.room.activeSpeakerId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRoomLinkCopy: () => {
            dispatch(requestActions.notify(
                {
                    text: 'Room link copied to the clipboard'
                }));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Index)

