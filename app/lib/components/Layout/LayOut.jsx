import React, {Component} from 'react';
import Footer from "./Footer";
import Aside from "./Aside"
import Header from "./Header"

class LayOut extends Component {
    render() {
        return (
            <div data-component='LayOut'>
                <div className="top">
                    <div className="left">
                        <Aside/>
                    </div>
                    <div className="right">
                        <Header/>
                        <div className="child">
                            {this.props.children}
                        </div>
                        <div className="bottom">
                            <Footer/>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

export default LayOut
