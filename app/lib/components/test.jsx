import React, { Component } from 'react';
import {Calendar,Tag} from "antd";
import moment from 'moment';

moment.locale('zh-cn');
//这里接收考情状态数据
const attendanceDate=[
    {
        date:'2019-08-1',
        state:0,//正常 green
    },
    {
        date:'2019-08-2',
        state:1,//迟到 yellow
    },
    {
        date:'2019-08-3',
        state:2,//旷工 red
    },
    {
        date:'2019-08-4',
        state:3,//休假 blue
    },
    {
        date:'2019-08-5',
        state:3,//休假 blue
    },
    {
        date:'2019-08-6',
        state:3,//休假 blue
    },
    {
        date:'2019-08-7',
        state:3,//休假 blue
    },
    {
        date:'2019-08-7',
        state:3,//休假 blue
    },
    {
        date:'2019-08-7',
        state:3,//休假 blue
    }
];
// const {attendanceDate}=this.props;
function onPanelChange(value, mode) {
    // console.log("value year: "+value.year());
    // console.log(parseInt(value.month())+1);
    // console.log("value day: "+value.date());
    // console.log("mode: "+mode);
    console.log(moment(value).format('YYYY-MM-DD HH:mm:ss')+"&&&"+mode)
}

function getListData(value) {
    let listData;
    // console.log(value.date());
    for (let i = 0; i < attendanceDate.length; i++) {
        let date=attendanceDate[i].date.split("-");
        // console.log(date[2]);
        if (value.date().toString()===date[2]){
            // console.log("判断日期成功");
            switch (attendanceDate[i].state) {
                case 0:
                    listData=[
                        {color:'green',content:'正常'}
                    ];
                    break;
                case 1:
                    listData=[
                        {color:'yellow',content:'迟到'}
                    ];
                    break;
                case 2:
                    listData=[
                        {color:'red',content:'旷工'}
                    ];
                    break;
                case 3:
                    listData=[
                        {color:'blue',content:'休假'}
                    ];
                    break;
                default:
            }

        }
    }
    return listData || [];
}

function dateCellRender(value) {
    const listData = getListData(value);
    // console.log(listData);
    return (
        <ul className="events">
            {listData.map(item => (
                <li key={item.content}>
                    <Tag color={item.color}>{item.content}</Tag>
                </li>
            ))}
        </ul>
    );
}
//将要渲染到月份cell中的内容
// function getMonthData(value) {
//     if (value.month() === 8) {
//         return 1394;
//     }
// }
//渲染月份内容的方法
// function monthCellRender(value) {
//     const num = getMonthData(value);
//     return num ? (
//         <div className="notes-month">
//             <section>{num}</section>
//             <span>Backlog number</span>
//         </div>
//     ) : null;
// }
export default class AttendanceInfo extends Component{
    // constructor(){
    //     super();
    //
    // }
    // componentDidMount(){
    //     console.log(this.props.attendanceDate);
    // }
    render(){
        return(
            <Calendar className="attendanceCal"
                      onPanelChange={onPanelChange}
                      dateCellRender={dateCellRender}/>
        )
    }
}
