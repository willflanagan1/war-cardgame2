import React, { Component } from 'react';

import { Layout } from 'antd'
const { Header } = Layout;


class GameTitle extends Component {
    render() {
        return (
            <Header style={{
                background: "darkgrey",
                color: "black",
                textAlign:"center",
                fontSize: 30,
                }}>
                <strong>Game of War</strong>
            </Header>
        )
    }
}

export default GameTitle