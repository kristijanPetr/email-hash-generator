import React, { Component } from 'react';
import passwordHash from 'password-hash';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      emails: '',
      hashedEmails: []
    };
  }

  componentDidMount() {
    var hashedPassword = passwordHash.generate('password123');
    this.setState({ name: btoa(hashedPassword) });
  }

  _generateEmails = () => {
    console.log('emails', this.state.emails.split('\n'));
    let emails = this.state.emails.split('\n');
    let hashedEmails = emails.map(email => {
      return {
        email,
        hashedEmail: this._hashEmail(email)
      };
    });
    this.setState({ hashedEmails });
  };

  _hashEmail = email => {
    return btoa(passwordHash.generate(email));
  };

  _renderHashedEmails = () => {
    return this.state.hashedEmails
      .filter(item => item.email.trim() !== '')
      .map((item, index) => {
        let fullAddress = `https://owner.thisisdelmar.com/register?email=${item.email.trim()}&dt=${
          item.hashedEmail
        }`;
        return (
          <li className="list__link">
            {' '}
            <a href={fullAddress} key={index} id="pass" target="_blank">
              {fullAddress}
            </a>{' '}
          </li>
        );
      });
  };

  render() {
    return (
      <main>
        <section>
          <div className="container">
            <p>Add emails each one in new line.</p>
            <textarea
              value={this.state.emails}
              onChange={e =>
                this.setState({ emails: e.target.value.replace(/[, ]+/g, ' ') })
              }
            />

            <button onClick={this._generateEmails}>Generate Emails</button>
          </div>
        </section>
        <section>
          <p>Hashed Emails :</p>
          <ul className="list-unstyled">{this._renderHashedEmails()}</ul>
        </section>
      </main>
    );
  }
}

export default Main;
