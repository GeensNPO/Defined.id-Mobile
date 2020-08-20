import styled from 'styled-components';
import {COLORS, SCREEN_WIDTH, SemiBoldText} from 'styles';

const Slide = styled.View`
  width: ${SCREEN_WIDTH}px;
  padding: 40px 20px 20px 20px;
  flex-grow: 1;
`;

const Image = styled.Image`
  width: 100%;
  flex-grow: 1;
  resize-mode: contain;
`;

const Subtitle = styled(SemiBoldText)`
  margin-bottom: 20px;
  font-size: 18px;
`;

const Description = styled(SemiBoldText)`
  font-size: 12px;
  text-align: center;
  line-height: 15px;
  color: ${COLORS.DARK_GREY};
`;

const SlideContentFooter = styled.View`
  justify-content: center;
  align-items: center;
`;

const Footer = styled.View`
  padding: 40px 20px 30px 20px;
`;

const Link = styled.TouchableOpacity`
  padding: 5px;
`;

const LinkText = styled(SemiBoldText)`
  font-size: 12px;
  color: ${COLORS.DARK_GREY};
`;

const SlidesContainer = styled.ScrollView``;

export {
  SlidesContainer,
  Image,
  Subtitle,
  Description,
  SlideContentFooter,
  Slide,
  Footer,
  Link,
  LinkText,
};
