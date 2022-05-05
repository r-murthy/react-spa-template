import { Component } from "react";
import { App, View, Navbar } from "framework7-react";
import routes from "./routes";
import { logoutClicked, getUsername, onUserChange } from "./services/authsvc";
import ErrorBoundary from "./pages/error";
import "../css/navbar.css";

const rootPath = window.location.pathname;

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      notification: "",
    };
  }

  componentDidMount() {
    onUserChange(this.triggerUserChange.bind(this));
    this.triggerUserChange();
  }

  renderAppElements({ isLoading, notification }) {
    this.setState({
      ...(isLoading !== undefined && { isLoading }),
      ...(notification !== undefined && { notification }),
    });
  }

  triggerUserChange() {
    getUsername().then((username) => {
      this.setState({ username });
    });
  }

  onLogoutClick() {
    logoutClicked().then(() => {
      window.location.reload();
    });
  }

  renderLoading() {
    if (this.state.isLoading) {
      return <div className="center">Loading...</div>;
    }
  }

  renderNotification() {
    return <div className="center">{this.state.notification}</div>;
  }

  renderSession() {
    if (this.state.username) {
      return (
        <>
          <span>{this.state.username}</span>
          <a
            href="/"
            className="link navlink"
            onClick={this.onLogoutClick.bind(this)}
          >
            Logout
          </a>
        </>
      );
    }
    return (
      <>
        <a href="/login/" className="link navlink">
          Login
        </a>
        <a href="/signup/" className="link navlink">
          Signup
        </a>
      </>
    );
  }

  render() {
    return (
      <ErrorBoundary>
        <App
          name="React template"
          theme="auto"
          id="react.template"
          routes={routes(this.renderAppElements.bind(this))}
        >
          <Navbar>
            <div className="navbar-inner">
              <a href="/" className="link">
                React template
              </a>
              {this.renderLoading()}
              {this.renderNotification()}
              <div className="right">{this.renderSession()}</div>
            </div>
          </Navbar>
          <View
            main
            url={rootPath}
            browserHistory
            browserHistorySeparator=""
            pushState
            browserHistoryRoot=""
            animate={false}
            browserHistoryInitialMatch={false}
            browserHistoryStoreHistory={false}
          ></View>
        </App>
      </ErrorBoundary>
    );
  }
}
