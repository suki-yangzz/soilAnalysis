import React, {Component} from 'react';
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavDropdown,
    NavItem,
    NavLink
} from 'reactstrap';
import {Link} from 'react-router-dom';

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            dropdown: false
        };
        this.toggle = this.toggle.bind(this);
        this.dropdownToggle = this.dropdownToggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    dropdownToggle() {
        this.setState({
            dropdown: !this.state.dropdown
        });
    }


    render() {
        return <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
            <Nav className="ml-auto" navbar>
                <NavDropdown isOpen={this.state.dropdown} toggle={this.dropdownToggle}>
                    <DropdownToggle color="primary" nav caret>
                        Data Analysis
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>Manage Data</DropdownItem>
                        <DropdownItem>Action1</DropdownItem>
                        <DropdownItem>Action2</DropdownItem>
                        <DropdownItem>Action3</DropdownItem>
                    </DropdownMenu>
                </NavDropdown>
                <NavItem>
                    <NavLink
                        href="https://github.com/oktadeveloper/okta-spring-boot-react-crud-example">GitHub</NavLink>
                </NavItem>
            </Nav>
        </Navbar>;
    }
}