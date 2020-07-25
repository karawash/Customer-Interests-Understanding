import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../Login/handlers/_actions';

class Home extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        //const { user, users } = this.props;
        return (
          <div>
          <ul id="nav-ul">
              <li id="nav-li">
                  <a  id="nav-a"><img className ="profile-group" src={require('../img/profile.png')}/></a>
                  <ul id="nav-ul" class="dropdown">
                      <li id="nav-li"><a id="nav-a" href="/">home</a></li>
                      <li id="nav-li"><a  id="nav-a" href="/Login">Log out</a></li>
                  </ul>
              </li>
          </ul>
            <div className="options-body">
              <div className ="option-group">
              <tr>
              <Link to="/Tutorial"><img className ="img-group" src={require('../img/tutorial.png')} ref="/Tutorial"/></Link>
              </tr><tr>
              <label>Tutorial</label>
              </tr>
              </div>
              <div className ="option-group">
              <tr>
              <Link to="/Selection"><img className ="img-group" src={require('../img/newreport.png')} ref="/Selection"/></Link>
              </tr><tr>
              <label>New Report</label>
              </tr>
              </div>
              <div className ="option-group">
              <tr>
              <Link to="/Reports"><img className ="img-group" src={require('../img/viewreport.png')} ref="/Reports"/></Link>
              </tr><tr>
              <label>View Report</label>
              </tr>
              </div>
      
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(Home);
export { connectedHomePage as Home };