import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from 'styles';

const Container = styled.View`
  width: 100%;
`;

const List = styled.FlatList``;

const Input = styled.TextInput`
  width: 100%;
  height: 100%;
  background-color: ${COLORS.LIGHT_GREY_3};
  font-size: 12px;
  font-family: ITCAvantGardePro-Md;
  color: ${COLORS.BLACK};
  text-align: center;
  border-radius: 9px;
`;

const Background = styled(LinearGradient)`
  height: 40px;
  padding: 1px;
  width: 32.3%;
  margin: 2px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export {Container, List, Input, Background};
