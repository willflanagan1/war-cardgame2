import React, { Component } from 'react';
import { Card, Row, Col, Button, Icon, Alert } from 'antd'
import { CardImagePaths } from '../Game/cardImages'


import { DECKOFCARDS } from '../../constants/cards'

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: [],
            userCards: [],
            compCards: [],
            gameOver: false,
            turns: 0,
            warIndex: 0,
            shuffled: false
        }
    }

    //when this page is about to render
    //this function shuffles the cards and then
    //deals them to two players
    componentWillMount() {
        var array = DECKOFCARDS.slice();
        var shuffledArray = array.slice()
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        var userCards = []
        var compCards = []
        var i = 0;
        shuffledArray.forEach((card) => {
            if (i % 2 == 0) {
                userCards.push(card)
            } else {
                compCards.push(card)
            }
            i++;
        })
        var winner = ''
        if (userCards[0].value < compCards[0].value) {
            winner = 'Computer';
        } else {
            winner = 'You';
        }
        this.setState({
            deck: shuffledArray,
            userCards: userCards,
            compCards: compCards,
            handWinner: winner
        })
    }

    //handles scenario when the players have the same card
    //recursive function for scenario of double/triple etc. war
    handleWar(x) {
        var turns = this.state.turns
        var index = x + 4;
        var winner = '';
        var userCards = this.state.userCards.slice()
        var compCards = this.state.compCards.slice()
        if (userCards[index] == undefined) {
            var userValue = userCards[userCards.length - 1].value
            var compValue = compCards[index].value
        } else if (compCards[index] == undefined) {
            var compValue = compCards[compCards.length - 1].value
            var userValue = userCards[index].value
        } else {
            var userValue = userCards[index].value
            var compValue = compCards[index].value
        }
        if (userValue > compValue) {
            winner = 'You'
        } else if (userValue < compValue) {
            winner = 'Comp'
        } else {
            //called in case of another war with the current index
            //the second call will start at the index plus 4 so that
            //this function will work for another war
            this.handleWar(index)
        }
        //depending on number of wars that happened the winner gets
        //the correct amount of cards
        if (winner == 'You') {
            var removedCompCards = []
            var removedUserCards = []
            if (compCards.length < index) {
                removedCompCards = compCards.slice();
                compCards = []
                for (let i = 0; i < index + 1; i++) {
                    removedUserCards[i] = userCards.shift()
                }
            }
            else if (userCards.length < index) {
                removedUserCards = userCards.slice();
                userCards = []
                for (let i = 0; i < index + 1; i++) {
                    removedCompCards[i] = compCards.shift()
                }
            } else {
                for (let i = 0; i < index + 1; i++) {
                    removedCompCards[i] = compCards.shift()
                    removedUserCards[i] = userCards.shift()
                }
            }
            userCards.push(...removedCompCards)
            userCards.push(...removedUserCards)
            this.setState({
                userCards: userCards,
                compCards: compCards,
                warIndex: 0,
                turns: ++turns
            })
            var tempCards = removedCompCards.slice()
            var removedCompCardsString = tempCards.map((card) => {
                if (card.secondValue !== undefined) {
                    return card.secondValue + ' of ' + card.suit
                } else {
                    return card.value + ' of ' + card.suit
                }
            }).join(', ')
            alert("You won the war and got these cards: " + removedCompCardsString)
        } else if (winner == 'Comp') {
            var removedCompCards = []
            var removedUserCards = []
            if (compCards.length < index) {
                removedCompCards = compCards.slice();
                compCards = []
                for (let i = 0; i < index + 1; i++) {
                    removedUserCards[i] = userCards.shift()
                }
            }
            else if (userCards.length < index) {
                removedUserCards = userCards.slice();
                userCards = []
                for (let i = 0; i < index + 1; i++) {
                    removedCompCards[i] = compCards.shift()
                }
            } else {
                for (let i = 0; i < index + 1; i++) {
                    removedCompCards[i] = compCards.shift()
                    removedUserCards[i] = userCards.shift()
                }
            }
            compCards.push(...removedUserCards)
            compCards.push(...removedCompCards)
            this.setState({
                userCards: userCards,
                compCards: compCards,
                warIndex: 0,
                turns: ++turns
            })
            var tempCards = removedUserCards.slice()
            var removedUserCardsString = tempCards.map((card) => {
                if (card.secondValue !== undefined) {
                    return card.secondValue + ' of ' + card.suit
                } else {
                    return card.value + ' of ' + card.suit
                }
            }).join(', ')
            alert("Computer won the war and got these cards from you: " + removedUserCardsString)
        }

    }

    //when user clicks next hand
    //determines winner of previous hand and pushes cards to respective winner
    handleEndHand(userCard, compCard) {
        var turns = this.state.turns;
        var winner = '';
        var userCards = this.state.userCards.slice()
        var compCards = this.state.compCards.slice()
        if (userCard.value < compCard.value) {
            winner = 'Computer';
        } else if (userCard.value > compCard.value) {
            winner = 'You';
        } else {
            this.handleWar(0)
        }
        if (winner == 'You') {
            var compRemoved = compCards.shift();
            var userRemoved = userCards.shift();
            userCards.push(compRemoved)
            userCards.push(userRemoved)
            this.setState({
                userCards: userCards,
                compCards: compCards,
                turns: ++turns
            })
        } else if (winner == 'Computer') {
            var userRemoved = userCards.shift();
            var compRemoved = compCards.shift();
            compCards.push(userRemoved)
            compCards.push(compRemoved)
            this.setState({
                userCards: userCards,
                compCards: compCards,
                turns: ++turns
            })
        }
    }

    //shuffles the user cards randomly
    shuffle() {
        if (this.state.shuffled == true) {
            alert("You may only shuffle once per game!")
        } else {
            var tempArray = this.state.userCards.slice()
            for (let i = tempArray.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]];
            }
            this.setState({
                userCards: tempArray,
                shuffled: true
            })
        }
    }


    render() {
        console.log(this.state.userCards)
        console.log(this.state.compCards)
        //tests to see if a player has won
        if (this.state.userCards.length == 0) {
            return (
                <div style={{ alignItems: 'center' }}>
                    <Alert message={'You lost in ' + this.state.turns + ' turns!'} type="error" />
                </div>

            )
        }
        if (this.state.compCards.length == 0) {
            return (
                <div style={{ alignItems: 'center' }}>
                    <Alert message={'You won in ' + this.state.turns + ' turns!'} type="success" />
                </div>
            )
        }

        const userCard = this.state.userCards[0]
        const compCard = this.state.compCards[0]
        var userCardName;
        var compCardName;

        //sets the name for the card
        if (userCard.secondValue !== undefined) {
            userCardName = userCard.secondValue + ' of ' + userCard.suit
        } else {
            userCardName = userCard.value + ' of ' + userCard.suit
        }
        if (compCard.secondValue !== undefined) {
            compCardName = compCard.secondValue + ' of ' + compCard.suit
        } else {
            compCardName = compCard.value + ' of ' + compCard.suit
        }

        //sets the path for the card image
        var userCardImage = (userCard.value - 2) * 4;
        var compCardImage = (compCard.value - 2) * 4;
        switch (userCard.suit) {
            case 'diamonds':
                userCardImage = ++userCardImage;
                break;
            case 'hearts':
                userCardImage = 2 + userCardImage;
                break;
            case 'spades':
                userCardImage = 3 + userCardImage;
                break;
            default:
                userCardImage = userCardImage;
        }
        switch (compCard.suit) {
            case 'diamonds':
                compCardImage = ++compCardImage;
                break;
            case 'hearts':
                compCardImage = 2 + compCardImage;
                break;
            case 'spades':
                compCardImage = 3 + compCardImage;
                break;
            default:
                compCardImage = compCardImage;
        }
        var userCardImagePath = require("./PNG-cards-1.3/" + CardImagePaths[userCardImage])
        var compCardImagePath = require("./PNG-cards-1.3/" + CardImagePaths[compCardImage])

        //removes shuffle button if already shuffled
        if (this.state.shuffled == true) {
            return (
                <div>
                    <Row type="flex" align="top" gutter={[48, 16]} style={{
                        textAlign: "center", marginLeft: 200,
                        height: 200, marginTop: 100, color: 'white'
                    }}>
                        <Col span={12} >
                            <strong style={{ fontSize: 20 }}>You:</strong>
                            <div style={{ margin: 20 }}><img alt={userCardName} style={{ width: 220 }} src={userCardImagePath}></img></div>
                            You have<strong> {this.state.userCards.length} </strong>cards left
                        </Col>
                        <Col span={12}>
                            <strong style={{ fontSize: 20 }}>Computer:</strong>
                            <div style={{ margin: 20 }}><img alt={compCardName} style={{ width: 220 }} src={compCardImagePath}></img></div>
                            Computer has<strong> {this.state.compCards.length} </strong>cards left
                        </Col>
                    </Row>
                    <Row align="top" style={{
                        textAlign: "center", marginLeft: 240,
                        height: 200, marginTop: 280
                    }}>
                        <Button type="primary" onClick={() => this.handleEndHand(userCard, compCard)}>Next Hand<Icon type="right" /></Button>
                    </Row>
                </div>

            )
        } else {
            return (
                <div>
                    <Row type="flex" align="top" gutter={[48, 16]} style={{
                        textAlign: "center", marginLeft: 250,
                        height: 200, marginTop: 100, color: 'white'
                    }}>
                        <Button style={{ marginLeft: -220, marginTop: 200 }} onClick={() => this.shuffle()}>Shuffle (One per game)</Button>
                        <Col span={12} >
                            <strong style={{ fontSize: 20 }}>You:</strong>
                            <div style={{ margin: 20 }}><img style={{ width: 220 }} src={userCardImagePath}></img></div>
                            You have<strong> {this.state.userCards.length} </strong>cards left
                    </Col>
                        <Col span={12}>
                            <strong style={{ fontSize: 20 }}>Computer:</strong>
                            <div style={{ margin: 20 }}><img style={{ width: 220 }} src={compCardImagePath}></img></div>
                            Computer has<strong> {this.state.compCards.length} </strong>cards left
                    </Col>
                    </Row>
                    <Row align="top" style={{
                        textAlign: "center", marginLeft: 240,
                        height: 200, marginTop: 280
                    }}>
                        <Button type="primary" onClick={() => this.handleEndHand(userCard, compCard)}>Next Hand<Icon type="right" /></Button>
                    </Row>
                </div>

            )
        }

    }
}

export default Game