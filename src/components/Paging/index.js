import React from 'react';
import {ViewPropTypes} from 'react-native';
import * as PropTypes from 'prop-types';
import _ from 'lodash';
import {Container, Page} from './styles';

export default function Paging(props) {
  const {style, pagesCount, currentPage} = props;
  return (
    <Container style={style}>
      {_.range(pagesCount).map((page) => (
        <Page active={currentPage === page + 1} key={page} />
      ))}
    </Container>
  );
}

Paging.propTypes = {
  pagesCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  style: ViewPropTypes.style,
};

Paging.defaultProps = {
  style: {},
};
