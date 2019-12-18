import React, { Component } from 'react';
import { Row, Column } from 'simple-flexbox';
import { Image } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import { Form } from 'react-bootstrap';


class MyCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

     render() {
        const cartNewData = this.props.data
        const dataShow = cartNewData.map(cartValue=>{
            return(
                <div className="ProductList">
                    <Container>
                    <Row>
                        <Column xs={6} md={4}>
                            <Image src={cartValue.Img_path} rounded width="270" height="190" />
                        </Column>
                        <Column xs={6} md={4}>
                            <Card border="info" >
                                <Card.Body>
                                    <Card.Title>{cartValue.ProductName}</Card.Title>
                                    <Card.Text>{cartValue.ProDesc}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Row>
                                        <div className="start">
                                            <h2><Badge pill variant="primary">Price: ${cartValue.Price * cartValue.product_default }</Badge></h2>
                                        </div>
                                        <div className="right">
                                            <Form inline>
                                                <Button  onClick={()=>this.props.remove(cartValue)} value={cartValue.Pid}  variant="danger">Remove  From Cart</Button>
                                            </Form>
                                        </div>
                                    </Row>
                                </Card.Footer>
                            </Card>
                        </Column>

                    </Row>
                </Container>
                </div>
            )
        })

        return (
            <div>
                {dataShow}
            </div>
        );
    }
}

export default MyCart;