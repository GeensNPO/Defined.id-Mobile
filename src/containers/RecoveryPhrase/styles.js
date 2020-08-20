import styled from 'styled-components';
import {COLORS, SemiBoldText} from 'styles';

const Container = styled.View`
  background-color: ${COLORS.WHITE};
  border-radius: 15px;
  width: 100%;
  elevation: 4;
  padding: 10px;
`;

const List = styled.FlatList`
  padding: 20px 15px;
  border-radius: 15px;
`;

const Footer = styled.View`
  align-items: center;
  padding-bottom: 20px;
  justify-content: center;
  flex-direction: row;
`;

const FooterText = styled(SemiBoldText)`
  font-size: 12px;
  color: ${COLORS.PINK};
  margin-right: 10px;
`;

const FooterImage = styled.Image`
  height: 25px;
  resize-mode: contain;
`;

const PhraseContainer = styled.View`
  margin: 10px 5px;
  flex: 1;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.LIGHT_GREY};
`;

const IndexText = styled(SemiBoldText)`
  font-size: 17px;
  margin-right: 10px;
`;

const PhraseText = styled(SemiBoldText)`
  font-size: 17px;
`;

export {
  Container,
  List,
  PhraseContainer,
  IndexText,
  PhraseText,
  Footer,
  FooterText,
  FooterImage,
};
