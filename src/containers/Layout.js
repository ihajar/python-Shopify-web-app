import React from 'react'
import {
    Button,
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Segment,
} from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../store/actions/auth'
import { fetchCart } from '../store/actions/cart'


import logo from "../images/gtd_logo.png"


class CustomLayout extends React.Component {
    componentDidMount(){
        this.props.fetchCart();
    }

    render() {
        const { authenticated, cart, loading } = this.props
        
        return (
            <div>
                <Menu inverted>
                    <Container>
                        <Link to='/'>
                            <Menu.Item>
                                <img src={logo}/>
                            </Menu.Item>
                        </Link>
                        <Link to='/'>
                            <Menu.Item header>Home</Menu.Item>
                        </Link>
                     
                        <Link to='/products'>
                            <Menu.Item header>Products</Menu.Item>
                        </Link>

                        {/* right sided Menu */}
                        <Menu.Menu   position='right'>
                           {authenticated ? (
                               <React.Fragment>
                            <Dropdown 
                            icon='cart'
                            loading = {loading}
                            text={`${ cart !== null ? cart.order_items.length:0}`} pointing className='link item'>
                                <Dropdown.Menu>
                                    {cart && cart.order_items.map(order_item =>{
                                        return (<Dropdown.Item key={order_item.id}>{order_item.quantity} x {order_item.item}</Dropdown.Item>) 
                                    })}
                                    {cart && cart.order_items.length < 1 ?<Dropdown.Item>No items in your cart</Dropdown.Item>:null}
                                    <Dropdown.Divider />
                                    <Dropdown.Item icon='arrow circle right' text='Checkout' onClick={() => this.props.history.push('order-summary')}/>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Menu.Item
                                header
                                onClick={() => this.props.logout()}
                            >
                                Logout
                            </Menu.Item>
                            </React.Fragment> )
                            : (
                                 <React.Fragment>
                                 <Link to='/login'>
                                     <Menu.Item header>Login</Menu.Item>
                                 </Link>
                                 <Link to='/signup'>
                                     <Menu.Item header>Signup</Menu.Item>
                                 </Link>
                             </React.Fragment>

                            )}
                             
                        </Menu.Menu>
                {/* End right Menu */}
                    </Container>
                </Menu>

                

                {this.props.children}

                <Segment
                    inverted
                    vertical
                    style={{ margin: '5em 0em 0em', padding: '5em 0em' }}
                >
                    <Container textAlign='center'>
                        <Grid inverted stackable>
                            <Grid.Column width={8}>
                                <Header inverted as='h2' content='Customer Care' />
                                <List link inverted>
                                    <List.Item as='a'>Contact</List.Item>
                                    <List.Item as='a'>Return</List.Item>
                                    <List.Item as='a'>Policies</List.Item>
                                    <List.Item as='a'>Consultations</List.Item>
                                </List>
                            </Grid.Column>
                            
                           
                            <Grid.Column width={7}>
                                <Header
                                    inverted
                                    as='h2'
                                    content='Join us!'
                                />
                               <div>
                                <Button circular color='facebook' icon='facebook' />
                                <Button circular color='twitter' icon='twitter' />
                                <Button circular color='linkedin' icon='linkedin' />
                                <Button circular color='google plus' icon='google plus' />
                               </div>
                            </Grid.Column>
                        </Grid>

                       
                        
                        <List horizontal inverted divided link size='small'>
                            <List.Item as='a' href='#'>
                                <Icon  name='copyright outline'/> 2021
                            </List.Item>
                           
                            <List.Item as='a' href='#'>
                                Terms and Conditions
                            </List.Item>
                            <List.Item as='a' href='#'>
                                Privacy Policy
                            </List.Item>
                        </List>
                    </Container>
                </Segment>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null,
        cart: state.cart.shoppingCart,
        loading: state.cart.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
        fetchCart: () => dispatch(fetchCart())
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CustomLayout)
)
