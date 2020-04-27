import React from "react";
import Draw from "../../draw"
import {Button}from'antd'

export default class WhiteBoard extends React.PureComponent {
    /* 重置功能 */
    reset() {
        Draw.clear();
    }

    /* 导出 */
    exp() {
        let exportImg = Draw.exportImg();
        console.log('exportImg: ', exportImg);
        if(exportImg === -1) {
            return console.log('please draw!');
        }
        this.refs['imgC'].src = exportImg;
    }

    render() {
        return (
            <div className="component-canvas">
                <div className="canvas-wrap" ref='canvas-wrap' style={{height:600}}></div>

                    <Button type="primary" onClick={this.reset}>清除画板
                    </Button>
                    {/*<span onClick={this.exp.bind(this)}>export</span>*/}

                {/*<img ref="imgC" />*/}
            </div>
        );
    }

    componentDidMount() {
        Draw.init(this.refs['canvas-wrap']);
    }
}