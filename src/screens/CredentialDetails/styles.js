import styled from 'styled-components';
import {SemiBoldText} from 'styles';
import {GradientWrapper} from 'components';

const Container = styled(GradientWrapper)`
  padding: 20px 10px;
`;

const Section = styled.View``;

const Content = styled.View`
  flex-grow: 1;
`;

const SectionTitle = styled(SemiBoldText)`
  font-size: 16px;
  text-align: center;
  margin-bottom: 15px;
`;

export {Container, SectionTitle, Section, Content};
