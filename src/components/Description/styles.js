import styled from 'styled-components';
import {COLORS, SemiBoldText} from 'styles';

const Text = styled(SemiBoldText)`
  font-size: 12px;
  line-height: 15px;
  text-align: ${(props) => (props.center ? 'center' : 'left')};
  color: ${COLORS.DARK_GREY_2};
`;

export {Text};
