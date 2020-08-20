import styled from 'styled-components';
import {SemiBoldText} from 'styles';
import {GradientWrapper} from 'components';

const Container = styled(GradientWrapper)`
  padding: 20px 10px;
`;

const Content = styled.ScrollView``;

const SectionTitle = styled(SemiBoldText)`
  font-size: 16px;
  text-align: center;
  margin-bottom: 15px;
`;

const Footer = styled.View`
  padding: 10px 0;
`;

export {Container, SectionTitle, Content, Footer};
