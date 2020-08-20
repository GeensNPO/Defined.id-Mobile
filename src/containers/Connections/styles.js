import styled from 'styled-components';
import {COLORS, SemiBoldText} from 'styles';
import {FlatList} from 'react-native';
import {Illustration} from 'components';

const Container = styled.View`
  background-color: ${COLORS.WHITE};
  width: 100%;
  border-radius: 15px;
  elevation: 4;
  flex: 1;
  padding: 10px 0;
`;

const Separator = styled.View`
  margin: 1px 0;
`;

const List = styled(FlatList)``;

const ConnectionContainer = styled.View`
  padding: 4px 10px;
`;

const SectionTitle = styled(SemiBoldText)`
  font-size: 16px;
`;

const EmptyContainer = styled.View``;

const Icon = styled.Image`
  resize-mode: contain;
`;

const EmptyIllustration = styled(Illustration)`
  elevation: 0;
`;

const Header = styled.View`
  padding: 5px 15px 15px 15px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export {
  Container,
  Separator,
  List,
  ConnectionContainer,
  SectionTitle,
  EmptyContainer,
  EmptyIllustration,
  Icon,
  Header,
};
