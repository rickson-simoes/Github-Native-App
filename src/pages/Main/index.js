import React, { Component } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
  ButtonsMenu,
  DeleteButton
} from './styles';

export default class Main extends Component {
  state = {
    newUser: '',
    users: [],
    loading: false,
    error: false
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;

    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    const { newUser, users } = this.state;

    this.setState({ loading: true, error: false });

    try {
      const response = await api.get(`/users/${newUser}`);

      const data = {
        name: response.data.name,
        login: response.data.login,
        bio: response.data.bio,
        avatar: response.data.avatar_url
      };
      this.setState({
        users: [...users, data],
        newUser: '',
        loading: false,
        error: false
      });

      Keyboard.dismiss();
    } catch (err) {
      this.setState({ error: true, loading: false });
    }
  };

  handleDeleteUser = user => {
    const { users } = this.state;

    this.setState({
      users: users.filter(u => u !== user)
    });
  };

  handleNavigate = user => {
    const { navigation } = this.props;

    navigation.navigate('User', { user });
  };

  render() {
    const { users, newUser, loading, error } = this.state;

    return (
      <Container>
        <Form>
          <Input
            error={error}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar usuário"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />

          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Icon name="add" size={20} color="#FFF" />
            )}
          </SubmitButton>
        </Form>

        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>

              <ButtonsMenu>
                <ProfileButton onPress={() => this.handleNavigate(item)}>
                  <ProfileButtonText> Ver perfil </ProfileButtonText>
                </ProfileButton>

                <DeleteButton onPress={() => this.handleDeleteUser(item)}>
                  <Icon name="delete-forever" size={20} color="#FFF" />
                </DeleteButton>
              </ButtonsMenu>
            </User>
          )}
        />
      </Container>
    );
  }
}

Main.navigationOptions = {
  title: 'Usuários'
};
