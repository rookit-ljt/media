
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Upload,
  Checkbox,
  Button,
  AutoComplete,
  message
} from 'antd';
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    loading: false,
    data:{
      info:{
        account:""
    }
    }
  };
  componentDidMount(){
    // console.log(this.props.userId)
    // let userJsonStr = sessionStorage.getItem('userID');
  
    // userJsonStr = JSON.parse(userJsonStr)
    // console.log(userJsonStr);
    
    // this.setState({
    //     data:userJsonStr
    // })
}
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传头像</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Form  {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
        <Row>
          <Col span={20}>
            <Form.Item label="头像">
              {getFieldDecorator('profile_photo', {
                rules: [

                ],
              })(<Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>)}
            </Form.Item></Col>
        </Row>
        <Row>
          <Col >
            <Form.Item label="地址">
              
              {getFieldDecorator('address', {
              
              })(<Input
                //    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}
                //  />}

                placeholder={this.state.data.userAddr} />)}
            </Form.Item></Col>
        </Row>
        <Row>
          <Col >
            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {

                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input
                //    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}
                //  />}

                placeholder={this.state.data.userMail} />)}
            </Form.Item></Col>
        </Row>
        <Row>
          <Col >
            <Form.Item label="地址">
              {getFieldDecorator('address', {
              
              })(<Input
                //    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}
                //  />}

                placeholder={this.state.data.userAddr} />)}
            </Form.Item></Col>
        </Row>
        <Form.Item>
        <p className="form_p">法院：{this.state.data.employUnit}</p>
              <p className="form_p">部门：{this.state.data.employDepartment}</p>
              <p className="form_p">职位：{this.state.data.employJob}</p>
          </Form.Item>
              
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })}

          <Button type="primary" htmlType="submit" className="login-form-button">
            保存
        </Button>

        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default WrappedRegistrationForm


