import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Instructions from '../Instructions'

import { Menu, Dropdown, Button, Icon, message } from 'antd';
import { Layout } from 'antd';
const { Sider } = Layout;


class GameMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameStarted: false,
        }
    }

    handleMenuClick = (e) => {
        if (e.key == 4 ) {
            this.setState({ gameStarted: true })
        }
        if (e.key == 2) {
            this.setState({ gameStarted: false })
        }
    }

    render() {
        if (this.state.gameStarted) {
            return (
                <Menu onClick={this.handleMenuClick} style={{backgroundColor:"darkgrey", borderStyle:'solid', borderWidth:10, borderColor:'white', fontWeight:'bold'}}>
                    <Menu.Item key="2">
                        <Link to="/home">End Game</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Instructions />
                    </Menu.Item>
                    <Menu.Item/>
                </Menu>
            )
        } else {
            return (
                <Menu onClick={this.handleMenuClick} style={{backgroundColor:"darkgrey", borderStyle:'solid', borderWidth:10, borderColor:'white', fontWeight:'bold'}}>
                    <Menu.Item>
                        <Link to="/home">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/home/game">Start Game</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Instructions />
                    </Menu.Item>
                </Menu >
            )
        }
    }
}

class GameNav extends Component {
    render() {
        return (
            <div>
                <Sider><GameMenu /></Sider>
            </div >
        )
    }
}

export default GameNav