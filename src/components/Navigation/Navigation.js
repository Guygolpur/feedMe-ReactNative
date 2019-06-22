import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Tabbar from 'react-native-tabbar-bottom'
import Search from '../Search/Search'
import Profile from '../Profile/Profile'
import Favorites from '../Favorites/Favorites'
import propTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default class Navigation extends Component {
  constructor() {
    super()
    this.state = {
      page: 'SearchScreen'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {
          // if you are using react-navigation just pass the navigation object in your components like this:
          // {this.state.page === "HomeScreen" && <MyComp navigation={this.props.navigation}>Screen1</MyComp>}
        }
        {this.state.page === 'Log Out' && this.props.changeGmailMode()}
        {this.state.page === 'FavoriteScreen' && <Favorites gmailAccount={this.props.gmailAccount}/>}
        {this.state.page === 'SearchScreen' && <Search gmailAccount={this.props.gmailAccount}/>}
        {this.state.page === 'ProfileScreen' && <Profile gmailAccount={this.props.gmailAccount}/>}

        <Tabbar
          stateFunc={tab => {
            this.setState({ page: tab.page })
            //this.props.navigation.setParams({tabTitle: tab.title})
          }}
          activePage={this.state.page}
          tabs={[
            {
              page: 'Log Out',
              icon: 'md-log-out',
              iconText: 'Log out'
            },
            {
              page: 'FavoriteScreen',
              icon: 'star',
              iconText: 'Favorites'
              // badgeNumber: 11,
            },
            {
              page: 'SearchScreen',
              iconText: 'Search',
              icon: 'search'
            },
            {
              page: 'ProfileScreen',
              iconText: 'Profile',
              icon: 'person'
            }
          ]}
        />
      </View>
    )
  }
}
Navigation.propTypes = {
  changeGmailMode: propTypes.func
}
