import styled from 'styled-components';
import {COLORS, SemiBoldText} from 'styles';
import LinearGradient from 'react-native-linear-gradient';

const Container = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const TextInput = styled.TextInput`
  width: 100%;
  height: 100%;
  background-color: ${COLORS.LIGHT_GREY_3};
  font-size: 16px;
  font-family: ITCAvantGardePro-Md;
  color: ${COLORS.BLACK};
  text-align: center;
  border-radius: 25px;
`;

const Background = styled(LinearGradient)`
  height: 52px;
  padding: 1px;
  width: 300px;
  border-radius: 26px;
  align-items: center;
  justify-content: center;
`;

const Label = styled(SemiBoldText)`
  font-size: 12px;
  color: ${COLORS.BLACK};
  margin-bottom: 15px;
`;

const Error = styled(SemiBoldText)`
  font-size: 12px;
  color: ${COLORS.RED};
  margin-top: 10px;
`;

export {Container, TextInput, Label, Background, Error};
