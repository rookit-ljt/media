import React from "react";
import {Table, Divider, Button, message, Tag,Card} from 'antd';
import {getUserData} from "../../redux/api";
import {Link} from "react-router-dom";
const columns = [
    {
        title: '发件人',
        dataIndex: 'sendName',
    },
    {
        title: '主题',
        dataIndex: 'infoTitle',
    },
    {
        title: '发送时间',
        dataIndex: 'createTime',
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
        <Link to={`/text/details/${record.infoId}`}>
       <Tag  color="#2db7f5"><a>
                  查看详情
              </a></Tag>
</Link>
      </span>
        ),
    },
];

class SendNew extends React.Component{
    constructor(porps) {
        super(porps);
        this.state={
            infoIds:[],
            DataInfo:{},
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            data:[],
            total:'',
            pageNum:1

        }
    }
    _getSend=async (pageNum)=>{
        let SendNew={
            "uid": parseInt(localStorage.uid),
            "token": localStorage.token,
            "serviceName": "infoService",
            "methodName": "queryOrSearchInformation",
            "parameters":{
                "roleId": 0,
                "pageSize": 8,
                'pageNum':pageNum,
                "userId": parseInt(localStorage.uid),
                "infoFlag": 0,
            }
        }
        const result = await getUserData(SendNew)
        console.log(result.data.info)
        this.setState({data:result.data.info,total:result.data.total})
    }
    //删除收件箱
    _deleteInfo=async ()=>{
        let reqData={
            "uid": parseInt(localStorage.uid),
            "token": localStorage.token,
            "serviceName": "infoService",
            "methodName": "deleteReceiveInformation",
            "parameters":{
                "userId":parseInt(localStorage.uid),
                "infoIds": this.state.infoIds
            }
        }
        const resData=await getUserData(reqData)
        console.log(resData)
        this.setState({
            selectedRowKeys: [],
            loading: false,
        });
        // if(resData)
        this._getSend()
    }
    start = () => {
        console.log(this.state.selectedRowKeys)
        console.log(this.state.infoIds)
        this.setState({ loading: true });
        // ajax request after empty completing
        this._deleteInfo()
        // setTimeout(() => {
        //
        // }, 1000);
    };
    //多选删除
    onSelectChange = (selectedRowKeys,selectedRows ) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys,selectedRows);
        console.log(selectedRows.map(v=>v.infoId))
        let infoIds=selectedRows.map(v=>v.infoId)
        this.setState({ selectedRowKeys,infoIds
        });
    };
    //分页方法
    onChange=(pageNum)=>{
        this.setState({
            pageNum
        })
        this._getSend(pageNum)
    }
    componentDidMount() {
        this._getSend()
    }
    render() {
        const updatePage=this.onChange
        const {loading,selectedRowKeys,data,infoIds,total} =this.state

        const rowSelection = {
            selectedRowKeys,
            infoIds,
            onSelect:this.onSelect,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const extra= <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
            删除已选项
        </Button>
        return(
            <div style={{height:"130%"}}>

                <Card title={'收件箱'} style={{height:"80%"}} extra={extra}>
                    <Table style={{height:"100%"}}
                        rowSelection={rowSelection}
                           rowKey='infoId'
                           columns={columns}
                           dataSource={data}
                            pagination={{defaultPageSize:8,showQuickJumper:true,total:total, onChange:updatePage} }/>,

                </Card>

            </div>
        )
    }
}
export default SendNew