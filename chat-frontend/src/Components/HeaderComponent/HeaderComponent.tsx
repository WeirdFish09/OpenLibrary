import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import logo from '../../images/logo.png';
import userLogo from '../../images/userLogo.png';
import { store } from '../../Redux/Store';
import socketService from '../../Services/SocketService';
import './HeaderComponent.scss';
import authService from '../../Services/AuthService';

type HeaderProps = {
    configureSocket: any
}
const HeaderComponent = (props: HeaderProps) => {
    authService.checkToken();

    useEffect(() => {
        props.configureSocket();
    })

    const toUserProfile = () => {
        window.location.pathname = '/user-profile';
    };

    const toLibrary = () => {
        window.location.pathname = '/';
    };

    const logout = () => {
        authService.logout();
    };

    return (
        <div className="header">
            <div className="left-part">
                <div className="icon-block">
                    <a href="/">
                        <img src={logo} />
                    </a>
                </div>

                <div className="menu">
                    <div className="menu-item" onClick={() => toLibrary()}>Library</div>
                    <div className="menu-item active">Chat</div>
                </div>
            </div>

            <div className="user-data">
                <p className="userName" onClick={() => toUserProfile()}>{authService.getUserName()}</p>
                <img src={userLogo} width="40px" height="40px" onClick={() => toUserProfile()}></img>
                <p className="logout" onClick={() => logout()}>Exit</p>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch: any) => {
    return{
        configureSocket: () => socketService.configure(dispatch)
    }
}

export default connect(null,mapDispatchToProps) (HeaderComponent);