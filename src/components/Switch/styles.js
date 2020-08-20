import styled from 'styled-components';
import {COLORS} from 'styles';
import LinearGradient from 'react-native-linear-gradient';

const Container = styled.TouchableOpacity`
  width: 54px;
  height: 30px;
  border-radius: 15px;
`;

const SlideContainer = styled(LinearGradient)`
  padding: 1px;
  border-radius: 15px;
`;

const Slider = styled(LinearGradient)`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  transform: translateX(${(props) => (props.checked ? 22 : 0)}px);
`;

const SliderWrapper = styled.View`
  background-color: ${COLORS.WHITE};
  width: 100%;
  height: 100%;
  justify-content: center;
  border-radius: 14px;
  padding: 0 3px;
`;

export {Container, SlideContainer, Slider, SliderWrapper};
