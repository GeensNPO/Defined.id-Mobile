import styled from 'styled-components';
import {COLORS, SemiBoldText} from 'styles';

const Text = styled(SemiBoldText)`
  font-size: 12px;
  color: ${COLORS.BLACK};
  text-transform: uppercase;
`;

const Container = styled.TouchableOpacity`
  height: 30px;
  border-radius: 15px;
  padding: 0 15px;
  border: 1px solid ${COLORS.PURPLE};
  justify-content: center;
  align-items: center;
`;

export {Text, Container};
