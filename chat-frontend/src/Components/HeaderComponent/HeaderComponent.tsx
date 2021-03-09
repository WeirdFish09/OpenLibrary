import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import logo from '../../images/logo.png';
import userLogo from '../../images/userLogo.png';
import { store } from '../../Redux/Store';
import socketService from '../../Services/SocketService';
import './HeaderComponent.scss';

type HeaderProps = {
    configureSocket: any
}
const HeaderComponent = (props: HeaderProps) => {
    useEffect(() => {
        props.configureSocket();
    })

    const toUserProfile = () => {
        window.location.pathname = '/user-profile';
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
                    <div className="menu-item "><a href="/">Library</a></div>
                    <div className="menu-item active">Chat</div>
                </div>
            </div>

            <div className="user-data">
                <p onClick={() => toUserProfile()}>Profile</p>
                <img src={userLogo} width="40px" height="40px"></img>
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