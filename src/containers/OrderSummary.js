import React from 'react';
import { Button, Container, Header, Icon, Image, Label, Message, Table, Segment, Dimmer, Loader } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom'
import { authAxios } from '../utils';
import { addToCartURL, orderSummaryURL, orderItemDeleteURL, orderItemUpdateQuantityURL } from '../constants';
import { connect } from 'react-redux';




class OrderSummary extends React.Component {

    state = {
        data: null,
        error: null,
        loading: false
        
    }

    componentDidMount() {
        this.handleFetchOrder();
    }

    handleFetchOrder = () => {
        this.setState({ loading: true })
        authAxios
        .get(orderSummaryURL)
        .then(res => {
            this.setState({data: res.data, loading: false })
        })
        // .catch(err => {
        //     if (err.response.status == 404) {
        //         this.setState({
        //             error: "You don't have currently any order",
        //             loading: false
        //         })
        //     } else {
        //     this.setState({error: err, loading: false })
        //     }
        // })
    }

    // renderVariations = orderItem => {
    //     let text = "";
    //     orderItem.item_variatons.forEach(iv => {
    //         text += `${iv.variation.name}: ${iv.value}, `
    //     })
    //     return text
    // }

    // handleFormatData = itemVariations => {
    //     // convert [{id: 1},{id: 2}] to [1,2] - they're all variations
    //     return Object.keys(itemVariations).map(key => {
    //       return itemVariations[key].id
    //     })
    //   };

    // handleAddtoCart = (slug, itemVariations) => {
    //     this.setState({ loading : true });
    //     const variations = this.handleFormatData(itemVariations);
    //     authAxios
    //     .post(addToCartURL, {slug, variations })
    //     .then(res => {
    //         this.handleFetchOrder()
    //         this.setState({ loading: false })
    //     })
    //     .catch(err => {
    //         this.setState({ error: err, loading: false })
    //     });
    // };

    handleRemoveQuantityFromCart  = slug => {
        authAxios
        .post(orderItemUpdateQuantityURL, {slug})
        .then(res => {
            this.handleFetchOrder()
        })
        .catch(err => {
            this.setState({ error: err })
        });
    };

    handleRemoveItem = itemID => {
        authAxios
        .delete(orderItemDeleteURL(itemID))
        .then(res => {
            this.handleFetchOrder();
        })
        .catch(err => {
            this.setState({ error: err });
        })
    }

    render() {
        const {data, error, loading } = this.state;
        
        const { isAuthenticated } = this.props;
        if (!isAuthenticated) {
            return <Redirect to="/login"/>
        }
        console.log(data);
        return (
            <Container>
                <Header as='h1'>Order Summary</Header>
                {error && (
                    <Message 
                    error
                    header="There was an error"
                    contect={JSON.stringify(error)}
                    />
                )}
                {loading && (
                    <Segment>
                        <Dimmer active inverted>
                            <Loader inverted>Loading</Loader>
                        </Dimmer>
                        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png"/>
                    </Segment>
                )}

                {data &&<Table padded inverted size='large'>

                 
                        <Table.Body>
                            <Table.Row>
                            <Table.HeaderCell colSpan='9'>
                                <Link to='/products'>
                                <Button inverted color='orange' size='large' icon='arrow circle left' content='Continue Shopping'/>
                                </Link>
                               
         
                            </Table.HeaderCell>
                            </Table.Row>
                        <Table.Row>
                            <Table.Cell />
                            <Table.Cell />
                            <Table.Cell />
                            <Table.Cell />
                            <Table.Cell colSpan='9' as='h3' textAlign="center">
                                Total: ${data.total}
                            </Table.Cell>
                            <Table.Cell colSpan='3'>
                                <Link to='checkout'>
                                    <Button color="green" size='large' floated="right">
                                        Checkout
                                    </Button>
                                </Link>
                            
                            </Table.Cell>
                            
                            {/* <Table.HeaderCell colSpan='15' textAlign="right">
                            
                            
                                 <Button color="green">
                                     Checkout
                                 </Button>
                             </Table.HeaderCell> */}
                          
         
                       </Table.Row>
                        </Table.Body>
                   
                     </Table>}

                {data && <Table celled padded size="large">
                           
                    <Table.Header>
                        <Table.Row>
                            
                            <Table.HeaderCell>Product Number</Table.HeaderCell>
                            {/* <Table.HeaderCell>***</Table.HeaderCell> */}
                            <Table.HeaderCell>Product Name</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell>Quantity</Table.HeaderCell>
                            <Table.HeaderCell>Total Price</Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>
                    
                    <Table.Body>
                        {data.order_items.map((orderItem, i) =>{
                            return (
                                <Table.Row key={orderItem.id}>
                            <Table.Cell>{i + 1 }</Table.Cell>
                            {/* <Table.Cell>
                                <Image size="small" src={orderItem.image}/>
                            </Table.Cell> */}
                            <Table.Cell>
                                {orderItem.item_obj.title}
                                {/* {this.renderVariations(orderItem)} */}
                            </Table.Cell>
                            <Table.Cell>${orderItem.item_obj.price}</Table.Cell>
                            <Table.Cell>
                                {/* <Icon
                                    name="minus"
                                    style={{ float:"left", cursor: "pointer" }}
                                    onClick={() =>
                                        this.handleRemoveQuantityFromCart(orderItem.item_obj.slug)
                                }
                                /> */}
                                {orderItem.quantity}
                                {/* <Icon
                                    name="plus"
                                    style={{ float:"right", cursor:"pointer" }}
                                    onClick={() => 
                                        this.handleAddtoCart(
                                            orderItem.item_obj.slug,
                                            orderItem.item_variatons
                                        )
                                    }
                                /> */}
                            </Table.Cell>
                            <Table.Cell>
                                {orderItem.item_obj.discount_price && (
                                    <Label as='a' tag>
                                        % On Discount
                                    </Label>
                                    )}
                                ${orderItem.final_price}
                                <Icon
                                    name="trash"
                                    color="red"
                                    style={{ float: "right", cursor:"pointer" }}
                                    onClick={() => this.handleRemoveItem(orderItem.id)}
                                />
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


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(OrderSummary);