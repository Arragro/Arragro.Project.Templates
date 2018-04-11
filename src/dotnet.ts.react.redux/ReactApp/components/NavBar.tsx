import * as React from 'react'
import { Link } from 'react-router-dom'
import { Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

import AppSettings from 'app/appSettings'

export interface INavBarProps {
}

export interface INavBarState {
    alertDropdownOpen: boolean
    clickerDropdownOpen: boolean
}

enum AlertType {
    Info,
    Warning,
    Error,
    Success
}

class NavBar extends React.Component<INavBarProps, INavBarState> {
    constructor (props: INavBarProps) {
        super(props)
        this.state = {
            alertDropdownOpen: false,
            clickerDropdownOpen: false
        }
        this.alertToggle = this.alertToggle.bind(this)
        this.clickerToggle = this.clickerToggle.bind(this)
        this.alert = this.alert.bind(this)
    }

    alertToggle () {
        this.setState(state => ({
            ...state,
            alertDropdownOpen: !state.alertDropdownOpen
        }))
    }

    clickerToggle () {
        this.setState(state => ({
            ...state,
            clickerDropdownOpen: !state.clickerDropdownOpen
        }))
    }

    alert (alertType: AlertType, msg: string, data?: any) {
        switch (alertType) {
        case AlertType.Info:
            AppSettings.info(msg, data)
            break
        case AlertType.Warning:
            AppSettings.warning(msg, data)
            break
        case AlertType.Error:
            AppSettings.error(msg, data)
            break
        default:
            AppSettings.success(msg, data)
            break
        }
        this.alertToggle()
    }

    public render () {
        return (
            <div id='navBar' className='d-flex justify-content-between align-self-center no-select'>
                <Nav className='logo-home align-self-center'>
                    <NavItem>
                        <Link to={'/'} >
                            <img src='//arragro-static-web.azureedge.net/public/images/svgs/arragro-logo-blue.svg' />
                            <span>{AppSettings.ApplicationName}</span>
                        </Link>
                    </NavItem>
                </Nav>

                <Nav className='options align-self-center'>

                    <Dropdown className='nav-item' nav inNavbar isOpen={this.state.clickerDropdownOpen} toggle={this.clickerToggle}>
                        <DropdownToggle nav caret>
                            <span className='nav-text'>Clickers</span>
                        </DropdownToggle>
                        <DropdownMenu className='dropdown-content'>
                            <DropdownItem header>
                                <Link to='/another-button-clicker' onClick={this.clickerToggle}>Another</Link>
                            </DropdownItem>
                            <DropdownItem header>
                                <Link to='/another-button-clicker/50' onClick={this.clickerToggle}>Another starting 50</Link>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    <NavItem>
                        <Link to={'/todos'}>Todos</Link>
                    </NavItem>

                    <NavItem>
                        <Link to={'/formsy'}>Formsy</Link>
                    </NavItem>

                    <Dropdown className='nav-item' nav inNavbar isOpen={this.state.alertDropdownOpen} toggle={this.alertToggle}>
                        <DropdownToggle nav caret>
                            <span className='nav-text'>Alerts</span>
                        </DropdownToggle>
                        <DropdownMenu className='dropdown-content'>
                            <DropdownItem header>
                                <a onClick={() => this.alert(AlertType.Info, 'Info!!!')}>Info</a>
                            </DropdownItem>
                            <DropdownItem header>
                                <a onClick={() => this.alert(AlertType.Warning, 'Warning!!!')}>Warning</a>
                            </DropdownItem>
                            <DropdownItem header>
                                <a onClick={() => this.alert(AlertType.Error, 'Error!!!')}>Error</a>
                            </DropdownItem>
                            <DropdownItem header>
                                <a onClick={() => this.alert(AlertType.Success, 'Success!!!')}>Success</a>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                </Nav>
            </div>
        )
    }
}

export default NavBar
