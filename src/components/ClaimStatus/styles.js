import styled from 'styled-components';
import {COLORS, RegularText} from 'styles';

const Container = styled.View`
  flex-direction: row;
  width: 100%;
  padding: 0 20px;
`;

const Step = styled.View`
  align-items: center;
`;

const StepIcon = styled.Image`
  resize-mode: contain;
  width: 30px;
  margin-bottom: 5px;
  height: 30px;
`;

const StepText = styled(RegularText)`
  color: ${COLORS.GREY};
  font-size: 12px;
  text-align: center;
`;

const StepTitle = styled(RegularText)`
  color: ${COLORS.GREY};
  font-size: 14px;
  text-align: center;
`;

const Line = styled.View`
  flex-grow: 1;
  height: 1px;
  margin-top: 15px;
  background-color: ${COLORS.GREY};
`;

export {Container, Step, Line, StepIcon, StepText, StepTitle};
