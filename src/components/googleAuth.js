import React from "react";
import { connect } from "react-redux";
import { signInAction, signOutAction } from "../actions";

class GoogleAuth extends React.Component {
  // state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "776100285012-mgffhh4ihtob2opdmmj789187nash2n3.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }
  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signInAction(this.auth.currentUser.get().getId());
    } else {
      this.props.signOutAction();
    }
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return <button className="ui basic loading button">Loading</button>;
    } else if (this.props.isSignedIn) {
      return (
        <button
          className="ui red google button"
          onClick={() => this.auth.signOut()}
        >
          <i className="google icon" />
          SignOut
        </button>
      );
    } else {
      return (
        <button
          className="ui green google button"
          onClick={() => this.auth.signIn()}
        >
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}
const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};
export default connect(
  mapStateToProps,
  {
    signInAction,
    signOutAction
  }
)(GoogleAuth);
