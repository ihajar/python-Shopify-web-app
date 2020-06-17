import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Container,
  Card,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";

import landing from "../images/landing page.jpg"
import gift from "../images/gift.png"
import glam from "../images/glam.png"
import fashion from "../images/fashion.png"

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};


// Heading page

// Heading page

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        />
        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        {children}
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const HomepageLayout = () => (
  <ResponsiveContainer>
    {/* <Segment style={{ padding: "1em 0em" }} vertical> */}
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8} textAlign="center">
            <Header as="h3" style={{ fontSize: "2em" }}>
              Buy Online With Us
            </Header>
            <p style={{ fontSize: "1.33em" }}>
            Experience what more products, more features, and more simplicity can you have online. 
            And more important best value of money, with our trusted online payment. 
            </p>
            <Header as="h3" style={{ fontSize: "2em" }}>
              We offer wide range of wishList 
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Yes that's right, you thought it was the stuff of dreams, but yes a way much more of only products.
            </p>
          </Grid.Column>
          <Grid.Column floated="left" width={8}>
            <Image
              size="massive"
              src={landing}
            />
          </Grid.Column>
        </Grid.Row>
        {/* <Grid.Row>
          <Grid.Column textAlign="left">
            <Button size="huge" color="orange">Check Them Out</Button>
          </Grid.Column>
        </Grid.Row> */}
      </Grid>
    {/* </Segment> */}

    {/* <Segment style={{ padding: "0em" }} vertical textAlign='center'  color='white'> */}
    <Grid  container stackable centered verticalAlign="middle" style={{padding:"4em 0em"}}>
    <Card.Group >
      <Card>
       
        <Image
    src={glam}
    size='medium'
    
    rounded
    style={{height:"25em"}}/>
       
      </Card>
    {/* <Card color='red' image='' />
    <Card color='orange' image='' />
    <Card color='yellow' image={logo} /> */}
    
    
    <Card>
    <Image
    src={gift}
    size='medium'
    rounded
    style={{height:"25em"}}/>
    </Card>
   <Card>
   <Image
    src={fashion}
    size='medium'
    rounded
    style={{height:"25em"}}/>
   </Card>

  

  </Card.Group>
  {/* </Segment> */}
  </Grid>
   
  </ResponsiveContainer>
);
export default HomepageLayout;