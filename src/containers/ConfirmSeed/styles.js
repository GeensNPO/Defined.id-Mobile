import styled from 'styled-components';
import {COLORS, SCREEN_WIDTH} from 'styles';
import {Divider} from 'components';

const Container = styled.View`
  width: 100%;
`;

const List = styled.FlatList`
  padding: 20px 15px;
  border-radius: 15px;
`;

const PhrasesContainer = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
`;

const PhraseContainer = styled.TouchableOpacity`
  height: 36px;
  elevation: 4;
  width: ${(SCREEN_WIDTH - 54) / 3}px;
  margin: 2px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.disabled ? COLORS.GREY : COLORS.WHITE)};
`;

const PhraseText = styled.Text`
  font-size: 13px;
  color: ${COLORS.BLACK};
`;

const Separator = styled(Divider)`
  margin: 30px auto;
`;

export {
  Container,
  List,
  PhraseContainer,
  PhraseText,
  PhrasesContainer,
  Separator,
};
