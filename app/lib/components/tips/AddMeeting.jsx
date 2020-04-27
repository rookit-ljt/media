
import React from 'react';
import { Modal, Button } from 'antd';
import WrappedRegistrationForm from '../tips/MeetingFrom';
import moment from "moment";
function onPanelChange(value, mode) {
    // console.log("value year: "+value.year());
    // console.log(parseInt(value.month())+1);
    // console.log("value day: "+value.date());
    // console.log("mode: "+mode);
    console.log(moment(value).format('YYYY-MM-DD HH:mm:ss')+"&&&"+mode)
}
class AddButton extends React.Component {
    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
        title: '添加会议'
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,

        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };

    render() {
        const { visible, confirmLoading, ModalText, title } = this.state;
        return (
            <div>
                <Button style={{margin:10}} type="primary" onClick={this.showModal}>
                    添加会议
                </Button>
                <Modal
                    title={title}
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    width={570}
                    mask={false}
                    footer={null}
                >
                    <WrappedRegistrationForm gethandleOk={this.handleOk} />
                </Modal>
            </div>
        );
    }
}
export default AddButton;
