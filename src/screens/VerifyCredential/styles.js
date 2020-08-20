import styled from 'styled-components';
import {COLORS, Row, SemiBoldText} from 'styles';
import {GradientWrapper} from 'components';

const Container = styled(GradientWrapper)`
  padding: 20px 10px;
`;

const Content = styled.View`
  flex-grow: 1;
`;

const Footer = styled.View``;

const ItemIcon = styled.Image`
  height: 40px;
  width: 40px;
  resize-mode: contain;
  margin-right: 10px;
`;

const ItemTitle = styled(SemiBoldText)`
  font-size: 16px;
  color: ${COLORS.BLACK};
`;

const ItemDetails = styled.View``;

const ItemDetailsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ItemMain = styled(Row)`
  border-radius: 10px;
  padding: 5px;
  width: 350px;
  border: 1px solid ${COLORS.LIGHT_GREY_2};
`;

export {
  Container,
  Content,
  Footer,
  ItemDetails,
  ItemDetailsWrapper,
  ItemIcon,
  ItemTitle,
  ItemMain,
};
