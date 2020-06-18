import React from 'react';
import { Button, Container, Header, Icon, Image, Label, Table, Rating, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
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
                <Header as='h1'>Order Summary</Header>
                {data &&<Table padded inverted size='large'>

                 
                        <Table.Body>
                            <Table.Row>
                            <Table.HeaderCell colSpan='9'>
                                <Link to='/products'>
                                <Button inverted color='yellow' size='large' icon='arrow circle left' content='Continue Shopping'/>
                                </Link>
                               
         
                            </Table.HeaderCell>
                            </Table.Row>
                        <Table.Row>
                            <Table.Cell />
                            <Table.Cell />
                            <Table.Cell />
                            <Table.Cell />
                            <Table.Cell colSpan='9' as='h3'>
                                Total: ${data.total}
                            </Table.Cell>
                            <Table.Cell colSpan='3' textAlign="right">
                            <Button color="green" size='large'>
                                     Checkout
                                 </Button>
                            </Table.Cell>
                            
                            {/* <Table.HeaderCell colSpan='15' textAlign="right">
                            
                            
                                 <Button color="green">
                                     Checkout
                                 </Button>
                             </Table.HeaderCell> */}
                          
         
                       </Table.Row>
                        </Table.Body>
                   
                     </Table>}
                {data && <Table celled padded>
                           
                    <Table.Header>
                        <Table.Row>
                            
                            <Table.HeaderCell>Product Number</Table.HeaderCell>
                            <Table.HeaderCell>Overview</Table.HeaderCell>
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
                            <Table.Cell>{i}</Table.Cell>
                            <Table.Cell>
                                <Image size="small" src={order_item.item_obj.image}/>
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
                        
                        

                     </Table.Body>
                    
                </Table>}
            </Container>
        )
    }
}


export default OrderSummary