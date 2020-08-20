import styled from 'styled-components';
import {COLORS} from 'styles';
import {GradientWrapper} from 'components';

const Container = styled(GradientWrapper)`
  padding: 20px;
  justify-content: space-between;
`;

const Wrapper = styled.View`
  background-color: ${COLORS.WHITE};
  padding: 25px;
  width: 100%;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  elevation: 4;
`;

export {Container, Wrapper};
