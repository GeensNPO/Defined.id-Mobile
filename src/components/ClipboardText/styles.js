import styled from 'styled-components';
import {COLORS, SemiBoldText} from 'styles';
import LinearGradient from 'react-native-linear-gradient';

const Container = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Background = styled(LinearGradient)`
  height: 52px;
  padding: 1px;
  width: 300px;
  border-radius: 26px;
`;

const SelectContainer = styled.TouchableOpacity``;

const Content = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  background-color: ${COLORS.LIGHT_GREY_3};
`;

const Label = styled(SemiBoldText)`
  font-size: 12px;
  color: ${COLORS.BLACK};
  margin-bottom: 15px;
`;

const Value = styled(SemiBoldText)`
  color: ${COLORS.BLACK};
  font-size: 10px;
`;

export {Container, Label, Background, Value, SelectContainer, Content};
