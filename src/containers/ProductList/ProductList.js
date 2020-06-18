import React, { Component } from 'react'


import axios from 'axios'
import { connect } from 'react-redux'
  import {
    Button,
    Card,
    Icon,
    Image,
    Container,
    Segment,
    Loader,
    Item,
    Label,
    Dimmer,
    Message,
    Grid
} from 'semantic-ui-react'
import { productListURL, addToCartURL } from '../../constants'
import {authAxios} from '../../utils'
import { fetchCart } from '../../store/actions/cart'


const paragraph = <Image src='/images/wireframe/short-paragraph.png' />




class ProductList extends React.Component {
    state = {
        loading: false,
        error: null,
        data: []
    }

    componentDidMount() {
        this.setState({
            loading: true,
        })

        

        axios
            .get(productListURL)
            .then(res => {
                this.setState({
                    data: res.data,
                    loading: false,
                })
            })
            .catch(err => {
                this.setState({
                    error: err,
                    loading: false,
                })
            })
    }

    handleAddToCart = slug => {
        this.setState({
            loading: true,
        })
        authAxios
            .post(addToCartURL, { slug })
            .then(res => {
                // console.log(res.data)
                // update the cart count:
                this.props.refreshCart();
                this.setState({ loading: false })
            })
            .catch(err => {
                this.setState({
                    error: err,
                    loading: false,
                })
            })
    }

    render() {
        const { loading, error, data } = this.state
       
            return (
            
             
                 <Container>
                     
                     
                        {error && (<Message error
                        header='There was some errors with your submission'
                        content={JSON.stringify(error)}/>)}
                        {loading && ( <Segment>
                            <Dimmer active inverted>
                            <Loader inverted>Loading</Loader>
                            </Dimmer>
                            <Image src='/images/wireframe/short-paragraph.png' />
                            </Segment>)}
                            
                            <Card.Group centered>
                                {data.map(item => {
                                    return (
                                        <Card textAlign='center'>
                                            <Card.Content>
                                                <Image
                                                floated="right"
                                                size="small"
                                                src={item.image}
                                                />
                                                <Card.Header>
                                                    {item.title}
                                                </Card.Header>
                                                <Card.Meta>{item.category}</Card.Meta>
                                                <Card.Meta ><strong>{item.price}$</strong>
                                                    </Card.Meta>
                                                <Card.Description>
                                                    {item.description}</Card.Description>  
                                            </Card.Content>
                                            <Card.Content extra>
                                                <div className='ui two buttons'>
                                                    <Button
                                                color="orange"
                                                floated='right'
                                                icon
                                                labelPosition='right'
                                                onClick={() =>
                                                this.handleAddToCart(item.slug)}>
                                                    Add to cart
                                                    <Icon name='cart plus' />
                                                    </Button>
                                                    {item.discount_price && (
                                                    <Label
                                                    color={
                                                        item.label === 'limited'? 'blue': item.label ==='out of stock'? 'red': 'olive'}>
                                                            {item.label}
                                                            </Label>)}
                                                </div>
                                            </Card.Content>

                                        </Card>
                                    )
                                                    })}
                                   
                </Card.Group>
                
                                                            
                                                            
                                                            
                                                             </Container>
  
                )
        
            }

}

const mapDispatchToProps = dispath => {
    return {
        refreshCart: () => dispath(fetchCart())
    }
}

export default connect(
    null, 
    mapDispatchToProps
    )(ProductList);
