import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import classnames from 'classnames';
import * as appPropTypes from './appPropTypes';
import {withRoomContext} from '../RoomContext';
import * as requestActions from '../redux/requestActions';
import {Appear} from './transitions';
import Me from './Me';
import Peers from './Peers';
import Stats from './Stats';
import Notifications from './Notifications';
import NetworkThrottle from './NetworkThrottle';

class Room extends React.Component {
    render() {
        const {
            room,
            amActiveSpeaker
        } = this.props;

        return (
            <Appear duration={300}>
                <div data-component='Room'>
                    <Notifications/>
                    {/* 链接指示灯 */}
                    <div className='state'>
                        <div className={classnames('icon', room.state)}/>
                        <p className={classnames('text', room.state)}>音视频信号灯</p>
                    </div>
                    <Peers/>

                    <div
                        className={classnames('me-container', {
                            'active-speaker': amActiveSpeaker
                        })}
                    >
                        <Me/>
                    </div>
                    {/*<Stats/>*/}

                    <If condition={window.NETWORK_THROTTLE_SECRET}>
                        <NetworkThrottle
                            secret={window.NETWORK_THROTTLE_SECRET}
                        />
                    </If>

                    <ReactTooltip
                        type='light'
                        effect='solid'
                        delayShow={100}
                        delayHide={100}
                        delayUpdate={50}
                    />
                </div>
            </Appear>
        );
    }

    componentDidMount() {
        const {roomClient} = this.props;
        const roomId = localStorage.getItem("roomId")
        roomClient.join(roomId);
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
        // roomId: state.client.room,
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

const RoomContainer = withRoomContext(connect(
    mapStateToProps,
    mapDispatchToProps
)(Room));

export default RoomContainer;
