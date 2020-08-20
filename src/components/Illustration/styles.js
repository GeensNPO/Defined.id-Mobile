import styled from 'styled-components';
import {SemiBoldText, COLORS, LightText} from 'styles';

const Title = styled(SemiBoldText)`
  font-size: 18px;
  line-height: 22px;
  color: ${COLORS.BLACK};
  margin-bottom: 15px;
  text-align: center;
`;

const Description = styled(LightText)`
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: ${COLORS.DARK_GREY};
`;

const Image = styled.Image`
  width: 100%;
  resize-mode: contain;
  margin-bottom: 15px;
`;

const Container = styled.View`
  background-color: ${COLORS.WHITE};
  padding: 40px 25px;
  width: 100%;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  elevation: 4;
`;

export {Title, Description, Image, Container};
