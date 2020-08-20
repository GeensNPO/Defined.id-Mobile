import styled from 'styled-components';
import {COLORS, SemiBoldText} from 'styles';
import {GradientWrapper} from 'components';

const Container = styled(GradientWrapper)`
  padding: 30px 20px;
`;

const SpaceBetweenContent = styled.View`
  justify-content: space-between;
  flex: 1;
`;

const SectionTitle = styled(SemiBoldText)`
  font-size: 16px;
  text-align: center;
`;

const Content = styled.View`
  background-color: ${COLORS.WHITE};
  border-radius: 15px;
  elevation: 4;
`;

const SwitchRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px 15px 15px;
`;

const Section = styled.View``;

export {
  Container,
  SpaceBetweenContent,
  Section,
  SectionTitle,
  Content,
  SwitchRow,
};
