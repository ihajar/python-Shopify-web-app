import React from 'react';
import { Button, Container, Header, Label, Table, Rating } from 'semantic-ui-react';
import { authAxios } from '../utils';
import { orderSummaryURL } from '../constants';


class OrderSummary extends React.Component {

    state = {
        data: null,
        error: null,
        loading: false
        
    }

    componentDidMount() {
        this.handleFetchOrder()
    }

    handleFetchOrder = () => {
        this.setState({ loading: true })
        authAxios
        .get(orderSummaryURL)
        .then(res => {
            this.setState({data: res.data, loading: false })
        })
        .catch(err => {
            this.setState({error: err, loading: false })
        });
    }



    render() {
        const {data, error, loading } = this.state;
        console.log(data);
        return (
            <Container>
                <Header as='h3'>Order Summary</Header>
                {data && <Table celled padded>
                    <Table.Header>
                        <Table.Row>
                            
                            <Table.HeaderCell>Product Number</Table.HeaderCell>
                            <Table.HeaderCell>Product Name</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell>Quantity</Table.HeaderCell>
                            <Table.HeaderCell>Total Price</Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>
                    
                    <Table.Body>
                        {data.order_items.map((order_item, i) =>{
                            return (
                                <Table.Row key={order_item.id}>
                            <Table.Cell>
                                {i}
                            </Table.Cell>
                            <Table.Cell>{order_item.item}</Table.Cell>
                            <Table.Cell>${order_item.item_obj.price}</Table.Cell>
                            <Table.Cell>{order_item.quantity}</Table.Cell>
                            <Table.Cell>
                                {order_item.item_obj.discount_price && (<Label as='a' color='red' tag>On Discount</Label>)}

                                  ${order_item.final_price}
                                </Table.Cell>
                        </Table.Row>
                            )
                        })}
                        
                        <Table.Row>
                            <Table.Cell />
                            <Table.Cell />
                            <Table.Cell />

                             <Table.Cell colSpan="2" textAlign="center">
                                 Total: ${data.total}
                             </Table.Cell>
                         </Table.Row>

                     </Table.Body>
                     <Table.Footer>
                         <Table.Row>
                             <Table.HeaderCell colSpan="5" textAlign="right">
                                 <Button color="yellow">
                                     Checkout
                                 </Button>
                             </Table.HeaderCell>
                         </Table.Row>
                     </Table.Footer>
                </Table>}
            </Container>
        )
    }
}


export default OrderSummary