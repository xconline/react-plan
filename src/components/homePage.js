import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Slider } from 'antd';
import './homePage.less';

const electron = window.electron;
const ipcRenderer = electron.ipcRenderer;
let timerId;

console.log(ipcRenderer);
class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intervalTime: 20
        };
    }
    componentDidMount = () => {
        ipcRenderer.on('pre-intervalTime', (e, intervalTime) =>
            this.setTimer(intervalTime)
        );
        ipcRenderer.send('finish-mount');
    };
    componentWillUnmount = () => {
        if (typeof timerId !== 'undefined') clearInterval(timerId);
        ipcRenderer.removeAllListeners();
    };
    // 间隔时间改变事件
    onIntervalTimeChange = value => {
        if (typeof timerId !== 'undefined') clearInterval(timerId);
        this.setTimer(value);
        ipcRenderer.send('store-intervalTime', value);
    };
    setTimer = value => {
        console.log(value);
        this.setState({ intervalTime: value });
        timerId = setInterval(
            () => this.showDialog(),
            parseInt(value, 10) * 3 * 1000
        );
    };
    showDialog = () => {
        console.log('show dialog');
        const notification = {
            title: '事务提醒',
            body: '该休息下了'
        };

        const myNotification = new window.Notification(
            notification.title,
            notification
        );

        myNotification.onclick = () => {
            console.log('Notification clicked');
        };

        // ipcRenderer.send('open-information-dialog');
    };

    render() {
        return (
            <div className="homePage">
                <label htmlFor="intervalTime">
                    每隔 {this.state.intervalTime}
                    分钟提醒
                </label>
                <Slider
                    id="intervalTime"
                    onChange={this.onIntervalTimeChange}
                    value={this.state.intervalTime}
                    min={1}
                    max={120}
                />
            </div>
        );
    }
}

export default HomePage;
