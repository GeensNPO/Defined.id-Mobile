import styled from 'styled-components';
import {SemiBoldText} from 'styles';

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const Content = styled.View`
  flex-grow: 1;
`;

const Footer = styled.View``;

const SectionTitle = styled(SemiBoldText)`
  font-size: 16px;
  text-align: center;
`;

const OrText = styled(SemiBoldText)`
  font-size: 16px;
  text-align: center;
  padding: 0 20px;
`;

export {Container, Content, Footer, SectionTitle, OrText};
