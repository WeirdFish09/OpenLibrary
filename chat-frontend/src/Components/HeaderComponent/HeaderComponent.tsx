import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import logo from '../../images/logo.png';
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

    return (
        <div className="header">
            <div className="left-part">
                <div className="icon-block">
                    <a href="/">
                        <img src={logo} />
                    </a>
                </div>

                <div className="menu">
                    <div className="menu-item active">Library</div>
                    <div className="menu-item">Chat</div>
                </div>
            </div>

            <div className="user-data">
                <img src="{{ userLogoLink }}" width="40px" height="40px"></img>
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