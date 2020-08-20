import styled from 'styled-components';
import {COLORS, SemiBoldText} from 'styles';

const Container = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const TextInput = styled.TextInput`
  width: 100%;
  height: 82px;
  background-color: ${COLORS.WHITE};
  elevation: 4;
  font-size: 16px;
  font-family: ITCAvantGardePro-Md;
  color: ${COLORS.BLACK};
  text-align: center;
  border-radius: 15px;
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

export {Container, TextInput, Label, Error};
