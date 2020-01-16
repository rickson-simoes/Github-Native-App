import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  BodyFlatList,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  ActivityIndDiv
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func
    }).isRequired
  };

  state = {
    stars: [],
    loading: false,
    page: 1,
    refreshing: false
  };

  async componentDidMount() {
    this.loadMore();
  }

  loadMore = async () => {
    const { navigation } = this.props;
    const { page, stars } = this.state;
    const user = navigation.getParam('user');

    this.setState({ loading: true });

    try {
      const response = await api.get(`/users/${user.login}/starred`, {
        params: {
          page
        }
      });

      console.tron.log(response);

      this.setState({
        stars: [...stars, ...response.data],
        loading: false,
        refreshing: false,
        page: page + 1
      });
    } catch (err) {
      console.tron.log(err);
    }
  };

  refreshList = () => {
    this.setState({ refreshing: true, stars: [] }, this.loadMore);
  };

  renderFooter = () => {
    const { loading } = this.state;
    if (!loading) return null;
    return (
      <ActivityIndDiv>
        <ActivityIndicator color="#68a1f7" />
      </ActivityIndDiv>
    );
  };

  render() {
    const { navigation } = this.props;
    const { stars, refreshing } = this.state;
    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        <BodyFlatList>
          <Stars
            data={stars}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={this.renderFooter}
          />
        </BodyFlatList>
      </Container>
    );
  }
}
