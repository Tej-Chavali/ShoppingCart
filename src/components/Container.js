import React, { Component } from 'react';
import axios from 'axios';
import { createStore } from 'redux';
import { reducer } from './CreateStore';
import Header from '../components/Header';
import { Row, Column } from 'simple-flexbox';
import { Image } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import MyCart from './MyCart'


class Containers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartData: [],
            cartItemsAdd: [],

            pagemove: "false",

        };
        this.mycart = this.mycart.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.countDisplay = this.countDisplay.bind(this);
    }
    mycart(e) {
        this.setState({ pagemove: true })
    }
    componentDidMount() {
        axios.get('http://localhost:6800/')
            .then(res => {
                console.log('Response', res.data)
                this.setState({ cartData: res.data })
            });
        console.log("Data Inserted -> ", this.state.cartData)
    }

    addToCart(e) {
        let value = e.target.value
        console.log("value-->",value)
        let match = this.state.cartData.find(x => {
            if (x.Pid == value) {
                return x
            }
        });
        console.log("event-->", match);
        console.log("value-->", value);
        var joined = this.state.cartItemsAdd.concat(match);
        this.setState({ cartItemsAdd: joined })
    }

    removeFromCart=(cartValue)=>{
    
        const cartItemsAdd=this.state.cartItemsAdd.filter(a=>a.Pid !== cartValue.Pid)
        this.setState({cartItemsAdd})
  
  
    }
    countDisplay(e) {
        let flag = 0;
        let decryptValue = e.target.value.split(' ');
        let countValue = decryptValue[2]
        const store = createStore(reducer);
        store.subscribe(function () {
            countValue = store.getState();
            flag = 1;
        })
        const Action = {
            type: decryptValue[0],
            count_Value: decryptValue[2],
            quantity_default: this.state.cartData[decryptValue[1] - 1].Quantity
        }
        store.dispatch(Action);
        if (flag === 1) {
            const newItems = [...this.state.cartData];
            newItems[decryptValue[1] - 1].product_default = countValue;
            this.setState({ cartData: newItems });
        }
    }

    render() {
        let li = this.state.cartData.map((plist, index) => (

            <div className="ProductList">
            
                <Container>
                    <Row>
                        <Column xs={6} md={4}>
                            <Image src={plist.Img_path} rounded width="270" height="190" />
                        </Column>
                        <Column xs={6} md={4}>
                            <Card border="info" >
                                <Card.Body>
                                    <Card.Title>{plist.ProductName}</Card.Title>
                                    <Card.Text>{plist.ProDesc}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Row>
                                        <div className="start">
                                            <h2><Badge pill variant="primary">Price: ${plist.Price}</Badge></h2>
                                        </div>
                                        <div className="center">
                                            <ButtonToolbar>
                                                <Button onClick={this.countDisplay} value={"DECREMENT " + plist.Pid + " " + plist.product_default} variant="danger">-</Button>
                                                <div className="quantity">{plist.product_default}</div>
                                                <Button onClick={this.countDisplay} value={"INCREMENT " + plist.Pid + " " + plist.product_default} variant="success">+</Button>
                                            </ButtonToolbar>
                                        </div>
                                        <div className="right">
                                            <Form inline>
                                                <Button onClick={this.addToCart} value={plist.Pid} variant="info">Add to Cart</Button>
                                            </Form>
                                        </div>
                                    </Row>
                                </Card.Footer>
                            </Card>
                        </Column>

                    </Row>
                </Container>

            </div>
        ))

        return (
            <div>
                
                <Header />
                {li}
                <div>
                <Navbar bg="warning" variant="dark"> <h1>MyCart</h1></Navbar>
            <MyCart data={this.state.cartItemsAdd} remove={this.removeFromCart}/></div>
            </div>
        );
    }
}

export default Containers;