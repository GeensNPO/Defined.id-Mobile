import styled from 'styled-components';
import GradientWrapper from '../GradientWrapper';

const Container = styled(GradientWrapper)`
  align-items: center;
  justify-content: center;
`;

const Logo = styled.Image`
  resize-mode: contain;
  height: 220px;
  width: 275px;
`;

export {Container, Logo};
