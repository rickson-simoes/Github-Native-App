import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

export const Input = styled.TextInput.attrs(props => ({
  placeholderTextColor: props.error ? '#797979' : '#999'
}))`
  flex: 1;
  height: 40px;
  background: ${props => (props.error ? '#f9d5d5' : '#eee')};
  border-radius: 4px;
  padding: 0 15px;
  border: 1px solid ${props => (props.error ? '#ff9393' : '#eee')};
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #68a1f7;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 12px;
  opacity: ${props => (props.loading ? 0.7 : 1)};
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false
})`
  margin-top: 20px;
`;

export const User = styled.View`
  align-items: center;
  margin: 0 20px 30px;
  background: #f7f7f7;
  padding: 20px;
  border-radius: 15px;
`;

export const Avatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background: #eee;
`;

export const Name = styled.Text`
  font-size: 14px;
  color: #333;
  font-weight: bold;
  margin-top: 4px;
  text-align: center;
`;

export const Bio = styled.Text.attrs({
  numberOfLines: 2
})`
  font-size: 13px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
  text-align: center;
`;

export const ButtonsMenu = styled.View`
  flex-direction: row;
`;

export const ProfileButton = styled(RectButton)`
  margin-top: 10px;
  align-self: stretch;
  border-radius: 4px;
  background: #68a1f7;
  justify-content: center;
  align-items: center;
  height: 36px;
  padding: 10px 50px;
`;

export const ProfileButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;

export const DeleteButton = styled.View`
  margin-top: 10px;
  margin-left: 10px;
  align-self: stretch;
  border-radius: 4px;
  background: #ff9393;
  justify-content: center;
  align-items: center;
  height: 36px;
  padding: 10px 20px;
`;
