import styled from 'styled-components';
import {COLORS} from 'styles';
import {GradientWrapper} from 'components';

const Container = styled(GradientWrapper)`
  padding: 20px;
`;

const ScannerContainer = styled.View`
  padding: 20px;
  background-color: ${COLORS.WHITE};
  padding: 25px;
  width: 100%;
  flex-shrink: 1;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  elevation: 4;
`;

const ScannerWrapper = styled.View`
  width: 100%;
  height: 300px;
  overflow: hidden;
  margin-bottom: 25px;
`;

export {Container, ScannerContainer, ScannerWrapper};
