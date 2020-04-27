import React, {Component} from 'react';

class ClintInput extends Component{
    constructor(props){
        super(props);
        // 绑定ref
        this.myInput = React.createRef();
    }

    render() {
        return (
            <div className="todo-header">
                <input
                    ref={this.myInput}
                    type="text"
                    placeholder="请输入今天的任务清单，按回车键确认"
                    onKeyDown={(e)=>this._handleEvent(e)}
                />
            </div>
        )
    }

    _handleEvent(e){
        // 1. 判断是否是回车键
        if(13 === e.keyCode){
            // 2. 判断输入的内容是否为空
            if(!this.myInput.current.value){
                alert('输入的内容不能为空！');
                return;
            }
            // 4. 清空内容
            this.myInput.current.value = '';
        }
    }
}

export default ClintInput;
