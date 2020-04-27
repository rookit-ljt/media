import React from "react";
import { Result, Button } from 'antd';

class ResultSuccess extends React.Component {
    constructor(props) {
        super(props);
    }
back(){
    window.history.back(-1)
}

    render() {
        return (
            <Result
                status="success"
                title="消息发送成功!"
                extra={[

                    <Button key="buy" onClick={this.back}>返回</Button>,
                ]}
            />
        )
    }
}

export default ResultSuccess
