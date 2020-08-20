import styled from 'styled-components';
import {SemiBoldText} from 'styles';
import {GradientWrapper} from 'components';

const Container = styled(GradientWrapper)`
  padding: 20px;
  justify-content: space-between;
`;

const Header = styled.View`
  height: 150px;
`;

const SectionTitle = styled(SemiBoldText)`
  font-size: 16px;
  text-align: center;
  margin-bottom: 15px;
`;

const Section = styled.View``;

export {Container, Header, SectionTitle, Section};
