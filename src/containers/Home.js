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
          <Grid.Column width={8}>
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
          <Grid.Column floated="right" width={8}>
            <Image
             
              
              size="massive"
              src={landing}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="left">
            <Button size="huge" color="orange">Check Them Out</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    {/* </Segment> */}

    {/* <Segment style={{ padding: "0em" }} vertical textAlign='center'  color='white'> */}
    <Card.Group centered  style={{ padding: "6em 0em"}}>
    {/* <Card color='red' image='' />
    <Card color='orange' image='' />
    <Card color='yellow' image={logo} /> */}
    <Image
    src={glam}
    size='medium'
    centered
    rounded
    style={{height:"25em"}}/>
    
    {/* <Card centered
    color='violet'
    size='large'
     header='Our latest glam collections'
    image={glam}
  /> */}
   <Image
    src={gift}
    size='medium'
    centered
    rounded
    style={{height:"25em"}}/>

  
<Image

    src={fashion}
    
    size='medium'
    centered
    rounded
    style={{height:"25em"}}/>
  </Card.Group>
  {/* </Segment> */}

   
  </ResponsiveContainer>
);
export default HomepageLayout;