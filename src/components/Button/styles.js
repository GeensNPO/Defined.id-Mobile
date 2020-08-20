import styled from 'styled-components';
import {COLORS, SemiBoldText} from 'styles';
import LinearGradient from 'react-native-linear-gradient';

const Container = styled.TouchableOpacity`
  width: ${(props) => (props.small ? 110 : 300)}px;
`;

const Background = styled(LinearGradient)`
  height: ${(props) => (props.small ? 32 : 52)}px;
  width: 100%;
  border-radius: ${(props) => (props.small ? 16 : 26)}px;
  padding: 1px;
`;

const Title = styled(SemiBoldText)`
  font-size: ${(props) => (props.small ? 12 : 16)}px;
  color: ${(props) => (props.disabled ? COLORS.BLACK : COLORS.WHITE)}};
`;

const Loading = styled.ActivityIndicator`
  margin-left: 10px;
`;

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: row;
  border-radius: ${(props) => (props.small ? 15 : 25)}px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.disabled ? COLORS.LIGHT_GREY_3 : 'transparent'}};
`;

export {Container, Title, Background, Wrapper, Loading};
