import styled from 'styled-components';

const Row = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) =>
    props.center
      ? 'center'
      : props.spaceBetween
      ? 'space-between'
      : 'flex-start'};
  margin-bottom: ${(props) =>
    props.mb !== undefined ? `${props.mb}px` : '10px'};
  margin-top: ${(props) => (props.mt ? `${props.mt}px` : '0')};
`;

const Col = styled.View`
  flex: ${(props) => (props.flex ? props.flex : 1)};
  margin-right: ${(props) => (props.mr ? `${props.mr}px` : '0')};
  margin-left: ${(props) => (props.ml ? `${props.ml}px` : '0')};
`;

export {Row, Col};
