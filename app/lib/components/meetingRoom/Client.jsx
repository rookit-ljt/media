import React, {Component} from 'react';
import {Statistic} from 'antd';
import ClintContent from '../tips/Chat';

const {Countdown} = Statistic;

class Client extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="ClintContent">
                <ClintContent/>
            </div>
        )
    }
}


export default Client;
