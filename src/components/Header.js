import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import {Row, Column} from 'simple-flexbox';
import {Redirect} from 'react-router-dom';

class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            pagemove:"false",
        }
        this.mycart=this.mycart.bind(this);

    }
    mycart(e){
        this.setState({pagemove:true})
    }
  
    render() { 
        if(this.state.pagemove===true){
            return <Redirect to='/back' />
        }
        return ( <div>
            <Navbar fixed="top" />
            <Navbar bg="warning" variant="dark">
            <Navbar.Brand href="#home">ShoppingCart</Navbar.Brand>
            <Row>
                <div className="cartButton">
            <Form inline>
            <Button  onClick={this.mycart} variant="outline-success">MyCart</Button>
            </Form>
            </div>
            </Row>
          </Navbar>
        
          <br />
          </div>
         );
    }
}
 
export default Header;