import styled from 'styled-components';
import {COLORS, SemiBoldText} from 'styles';
import {MESSAGE_TYPES} from 'constants';
import hexToRgba from 'hex-to-rgba';

const Text = styled(SemiBoldText)`
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  border-radius: 15px;
  padding: 15px;
  width: 100%;
  color: ${COLORS.BLACK};
  background-color: ${(props) =>
    props.type === MESSAGE_TYPES.DANGER ? hexToRgba(COLORS.PURPLE_2, '0.2') : COLORS.GREEN};
`;

export {Text};
