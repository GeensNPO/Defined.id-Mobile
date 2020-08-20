import styled from 'styled-components';
import {COLORS, LightText, SemiBoldText} from 'styles';

const Container = styled.TouchableOpacity`
  width: 100%;
  background-color: ${COLORS.WHITE};
  height: 58px;
  border-radius: 15px;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  elevation: 4;
`;

const Title = styled(SemiBoldText)`
  font-size: 16px;
  color: ${COLORS.BLACK};
`;

const Image = styled.Image`
  margin-right: 15px;
  resize-mode: contain;
`;

const Arrow = styled.Image`
  width: 25px;
  height: 25px;
`;

const Description = styled(LightText)`
  font-size: 12px;
  line-height: 15px;
  color: ${(props) =>
    props.danger
      ? COLORS.RED
      : props.success
      ? COLORS.GREEN
      : COLORS.DARK_GREY};
`;

const Content = styled.View`
  justify-content: center;
  flex-direction: ${(props) => (props.reversed ? 'column-reverse' : 'column')};
  flex-grow: 1;
  flex-shrink: 1;
`;

export {Container, Title, Content, Description, Image, Arrow};
