import styled from 'styled-components';
import {COLORS, RegularText} from 'styles';
import GradientWrapper from '../GradientWrapper';

const Container = styled(GradientWrapper)`
  padding: 20px 0;
`;

const Header = styled.View`
  padding: 0 20px;
`;

const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  left: -8px;
`;

const BackText = styled(RegularText)`
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  margin-left: 5px;
  color: ${COLORS.GREY};
  text-transform: capitalize;
`;

export {Container, BackButton, BackText, Header};
