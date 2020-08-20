import styled from 'styled-components';
import {GradientWrapper, Illustration} from 'components';

const Container = styled(GradientWrapper)`
  padding: 20px;
  justify-content: space-between;
`;

const Header = styled.View`
  height: 150px;
`;

const StyledIllustration = styled(Illustration)`
  margin-bottom: 15px;
  flex-grow: 1;
  flex-shrink: 1;
`;

export {Container, Header, StyledIllustration};
