import styled from 'styled-components';
import {COLORS, Row, SemiBoldText} from 'styles';
import {FlatList} from 'react-native';

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

const TransactionItem = styled.TouchableOpacity`
  padding: 5px 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ItemDetailsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Container = styled.View`
  background-color: ${COLORS.WHITE};
  border-radius: 15px;
  elevation: 4;
  flex: 1;
`;

const Header = styled.View`
  padding: 15px;
`;

const SectionTitle = styled(SemiBoldText)`
  font-size: 12px;
  text-align: center;
  color: ${COLORS.BLACK};
`;

const Separator = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.LIGHT_GREY_2};
  margin: 5px 0;
`;

const ItemMain = styled(Row)`
  border-radius: 10px;
  padding: 5px;
  border: 1px solid ${COLORS.LIGHT_GREY_2};
`;

const List = styled(FlatList)`
  flex-grow: 1;
`;

export {
  Container,
  ItemIcon,
  ItemTitle,
  ItemDetails,
  Separator,
  SectionTitle,
  Header,
  ItemDetailsWrapper,
  ItemMain,
  List,
  TransactionItem,
};
