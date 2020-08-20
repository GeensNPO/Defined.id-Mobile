import styled from 'styled-components';
import {COLORS} from 'styles';
import LinearGradient from 'react-native-linear-gradient';

const Photo = styled.Image`
  height: 100%;
  resize-mode: contain;
`;

const Container = styled(LinearGradient)`
  width: 100%;
  height: 277px;
  border-radius: 15px;
  padding: 1px;
  overflow: hidden;
`;

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 14px;
  background-color: ${COLORS.WHITE};
`;

export {Photo, Container, Wrapper};
