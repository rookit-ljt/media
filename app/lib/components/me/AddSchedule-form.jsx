import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';
import {
    Form,
    Select,
    Input,
    DatePicker
} from 'antd'
const { RangePicker } = DatePicker;
const Item = Form.Item
const Option = Select.Option

/*
添加日程form组件
 */
class AddScheduleForm extends PureComponent {

    static propTypes = {
        setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
        // roles: PropTypes.array.isRequired,
        // user: PropTypes.object
    }
    range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }
    componentWillMount () {
        this.props.setForm(this.props.form)
    }
    disabledDate=(current)=> {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }
disabledRangeTime=(_, type)=> {
    if (type === 'start') {
        return {
            disabledHours: () =>this.range(0, 60).splice(25, 20),
            disabledMinutes: () => this.range(30, 60),
            disabledSeconds: () => [55, 56],
        };
    }
    return {
        disabledHours: () => this.range(0, 60).splice(25, 4),
        disabledMinutes: () => this.range(0, 0),
        disabledSeconds: () => [55, 56],
    };
}
    render() {
        const rangeConfig = {
            rules: [{ type: 'array',  message: '请选择日程时间' },
                {required: true, message: '日程时间必须选择'}],
        };
        const { getFieldDecorator } = this.props.form
        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 4 },  // 左侧label的宽度
            wrapperCol: { span: 18 }, // 右侧包裹的宽度
        }

        return (
            <Form {...formItemLayout}>
                <Item label='日程主题'>
                    {
                        getFieldDecorator('scheduleTittle', {
                            rules:[ {required: true, message: '日程主题必须输入'},
                                {max:32,message:'主题最长32位字符'}]

                        })(
                            <Input placeholder='请输入日程主题'/>
                        )
                    }
                </Item>

                <Item label='日程备注'>
                    {
                        getFieldDecorator('scheduleNote', {
                            rules:[ {required: true, message: '日程备注必须输入'},
                                    {max:32,message:'备注最长32位字符'}]
                        })(
                            <Input placeholder='请输入日程备注'/>
                        )
                    }
                </Item>

                <Item label='日程时间'>
                    {getFieldDecorator('rangetimepicker', rangeConfig)(
                            <RangePicker  disabledDate={this.disabledDate}
                                      disabledTime={this.disabledRangeTime}
                                          placeholder={['开始时间', '结束时间']}
                                          showTime={{format: 'HH:mm'}}
                                      format="YYYY-MM-DD HH:mm" />,
                    )}
                </Item>
                {/*<Item label='提醒时间'>*/}
                {/*    {*/}
                {/*        getFieldDecorator('scheduleReminderTime', {*/}

                {/*        })(*/}
                {/*            <Select  style={{ width: 350 }}>*/}
                {/*                <Option value="10">提前10分钟</Option>*/}
                {/*                <Option value="20">提前30分钟</Option>*/}
                {/*                <Option value="60">*/}
                {/*                    提前1小时*/}
                {/*                </Option>*/}
                {/*                <Option value="180">提前3小时</Option>*/}
                {/*            </Select>*/}
                {/*        )*/}
                {/*    }*/}
                {/*</Item>*/}
            </Form>
        )
    }
}

export default Form.create()(AddScheduleForm)