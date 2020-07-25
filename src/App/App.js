import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../Login/handlers/_helpers';
import { alertActions } from '../Login/handlers/_actions';
import { PrivateRoute } from '../Login/handlers/_components';
import { Home } from '../Home';
//import { Login } from '../Login';
import { Register } from '../Register';

import { Login } from '../Login';
import Selection from '../Selection/Selection';
import Visualization from '../Visualization/Visualization';


class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <Switch>
                                  <PrivateRoute exact path="/"  component={Home} />
                                  <Route path="/Login"  component={Login} />
                                  <Route path="/register" component={Register} />
                                  <Route path="/Selection" component={Selection} />
                                  <Route path="/Visualization" component={Visualization} />
                                  <Redirect to="/" />
                                </Switch>                            
                                </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 