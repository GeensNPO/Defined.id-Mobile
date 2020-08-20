import styled from 'styled-components';
import {COLORS} from 'styles';

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Page = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin-right: 15px;
  margin-left: 15px;
  border: 1px solid ${COLORS.PURPLE};
  background-color: ${(props) =>
    props.active ? COLORS.PURPLE : COLORS.TRANSPARENT};
`;

export {Page, Container};
