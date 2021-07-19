import React from 'react';
import './App.css';
import transactions from './dataset.json';

class App extends React.Component {
  month_start = {
    'may': 1619852400000,
    'june': 1622530800000,
    'july': 1625122800000,
    'all': 1619852400000,
  }

  month_end = {
    'may': 1622530799000,
    'june': 1625122799000,
    'july': 1627801199000,
    'all': 1627801199000,
  }

  constructor (props) {
    super(props);
    this._durationSelected = this._durationSelected.bind(this);
    this.state = {
      periodSelected: 'may',
      usersList: this.displayUserRecordsPerPeriod("may"),
      userSelected: null
    }
    return this;
  }
/**
 * React Components render method. 
 * @returns Html
 */
  render () {
    return (
      <div className="app">
        <div className="app-header"> Rewards Summary</div>
        <div className="app-content">
          <div className="content-menu">
            <div className={"menu-item" + (this.state.periodSelected === 'may'? " selected": "")} onClick={this._durationSelected.bind(this, "may")} data-testid="may-21">May '21</div>
            <div className={"menu-item" + (this.state.periodSelected === 'june'? " selected": "")} onClick={this._durationSelected.bind(this, "june")} data-testid="june-21">June '21</div>
            <div className={"menu-item" + (this.state.periodSelected === 'july'? " selected": "")} onClick={this._durationSelected.bind(this, "july")} data-testid="july-21">July '21</div>
            <div className={"menu-item" + (this.state.periodSelected === 'all'? " selected": "")} onClick={this._durationSelected.bind(this, "all")} data-testid="overall" >Overall</div>
          </div>
          <div className="content-table">
            <div className="table-header">
              <div className="header header-name-col">Customer Name</div>
              <div className="header header-amount-col">Amount Spent</div>
              <div className="header header-reward-col">Rewards Earned</div>
            </div>
            <div className="table-body">
              {
                Object.keys(this.state.usersList).map((user, index) => {
                  return (
                    <div className={"table-row row-" + index } key={index} onClick={this._rowSelected.bind(this, this.state.usersList[user].name)}>
                      <div className="row-users">
                        <div className={"row-item" + ( this.state.userSelected === this.state.usersList[user].name ? " row-chevron-down" : " row-chevron-right")}></div>
                        <div className="row-item row-name"> {this.state.usersList[user].name} </div>
                        <div className="row-item row-amount"> {(this.state.usersList[user].totalAmountSpent).toFixed(2)} </div>
                        <div className="row-item row-reward"> {this.state.usersList[user].totalRewardsEarned} </div>
                      </div>
                      {
                        ( this.state.userSelected === this.state.usersList[user].name ) ? 
                          (<div className="row-transactions"> 
                            {
                              this.state.usersList[user].transactions.map((item) => (
                                <div className="row-user-records">
                                  <div className="row-user row-user-time">{new Date(item.timeStamp).toLocaleString()}</div>
                                  <div className="row-user row-user-amount">{item.amount}</div>
                                  <div className="row-user row-user-reward">{this.calculateRewards(item.amount)}</div>
                              </div>))
                            }
                          </div>
                          ) : ""
                      }
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

/**
 * Updates the state when any month tab is selected.
 * @param {string} month 
 */
  _durationSelected (month) {
    this.setState({
      periodSelected: month,
      usersList: this.displayUserRecordsPerPeriod(month),
      userSelected: null,
    })
  }

  /**
   * Updates the state when any user row is clicked for additional transactions info. 
   * @param {string} user 
   */
  _rowSelected (user) {
    if(this.state.userSelected === user ) {
      this.setState({
        userSelected: null
      })
    } else {
      this.setState({
        userSelected: user
      })
    }
  }

  /**
   * Calculates the reward points for the amount parameter passed.
   * @param {number} amount 
   * @returns number
   */
  calculateRewards ( amount) {
    if( amount <= 50 ) {
      return 0;
    } else if(amount > 50 && amount <= 100 ) {
      return Math.round(amount) - 50;
    } else {
        return (2 * (Math.round(amount) - 100)) + 50;
    }
  }

  /**
   * Massage the raw transactions data to show sepecific data on the UI.
   * @param {string} month 
   * @returns Object
   */
  displayUserRecordsPerPeriod (month) {
    let userRecordsList = {}; 
    transactions.map((item) => {
      if(item.timeStamp > this.month_start[month] && item.timeStamp < this.month_end[month] ) {
        if(!userRecordsList.hasOwnProperty(item.name)) {
          userRecordsList[item.name] = {};
          userRecordsList[item.name]["name"] = item.name;
          userRecordsList[item.name]["transactions"] = [];
          userRecordsList[item.name]["totalAmountSpent"] = 0;
          userRecordsList[item.name]["totalRewardsEarned"] = 0;
        }
        userRecordsList[item.name]["transactions"].push(item);
        userRecordsList[item.name]["totalAmountSpent"] += item.amount;
        userRecordsList[item.name]["totalRewardsEarned"] += this.calculateRewards(item.amount);
      }
    })

    let sortedRecordList = Object.keys(userRecordsList).sort().reduce(function (acc, key) { 
      acc[key] = userRecordsList[key];
      return acc;
    }, {});
    return sortedRecordList;
  }
  
}

export default App;
