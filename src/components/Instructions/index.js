import React, { Component } from 'react';

import { Modal, Menu } from 'antd';


class Instructions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <p onClick={this.showModal}>Instructions</p>
                <Modal
                    title="Instructions"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <p>High card wins each hand (2 is lowest & Ace is highest).</p>
                    <p>When you win a hand, you get your opponents card</p>
                    <p>along with your card and they go to the bottom of your stack.</p>
                    <p>A war happens when you and your opponent show the same card.</p>
                    <p>To break the tie each player puts 3 more cards down and the winner</p>
                    <p>is decided by whoever has the highest 4th card. The winner gets all</p>
                    <p>the cards on the table.</p>
                    <br></br>
                    <p>If card images are not showing up in chrome, please visit:</p>
                    <p>chrome://flags/ and enable new download backend.</p>
            </Modal>
            </div>
        )
    }
}

export default Instructions