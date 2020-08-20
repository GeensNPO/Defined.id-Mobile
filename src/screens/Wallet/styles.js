import styled from 'styled-components';
import {GradientWrapper} from 'components';

const Container = styled(GradientWrapper)`
  padding: 20px;
`;

const Header = styled.View`
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  justify-content: flex-end;
`;

const IconLink = styled.TouchableOpacity``;
const Icon = styled.Image`
  width: 25px;
  margin-left: 15px;
  height: 25px;
`;

export {Container, Header, IconLink, Icon};
