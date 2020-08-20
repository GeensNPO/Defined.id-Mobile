import React from 'react';
import {ViewPropTypes} from 'react-native';
import * as PropTypes from 'prop-types';
import {Container, Step, Line, StepIcon, StepText, StepTitle} from './styles';
import {IMAGES} from 'constants';

export default function ClaimStatus(props) {
  const {
    style,
    creationDate,
    timestampDate,
    expirationDate,
    timestampText,
  } = props;

  return (
    <Container style={style}>
      <Step>
        <StepIcon
          source={creationDate ? IMAGES.CIRCLE_ACCEPTED : IMAGES.CIRCLE_DENIED}
        />
        <StepTitle>Created</StepTitle>
        <StepText>
          {creationDate ? new Date(creationDate).toDateString() : 'Pending'}
        </StepText>
      </Step>
      <Line />
      <Step>
        <StepIcon
          source={timestampDate ? IMAGES.CIRCLE_ACCEPTED : IMAGES.CIRCLE_DENIED}
        />
        <StepTitle>{timestampText}</StepTitle>
        <StepText>
          {timestampDate ? new Date(timestampDate).toDateString() : 'Pending'}
        </StepText>
      </Step>
      <Line />
      <Step>
        <StepIcon
          source={
            expirationDate &&
            new Date(expirationDate).getTime() >= new Date().getTime()
              ? IMAGES.CIRCLE_ACCEPTED
              : IMAGES.CIRCLE_DENIED
          }
        />
        <StepTitle>Expiration</StepTitle>
        <StepText>
          {expirationDate ? new Date(expirationDate).toDateString() : 'Pending'}
        </StepText>
      </Step>
    </Container>
  );
}

ClaimStatus.propTypes = {
  creationDate: PropTypes.string,
  expirationDate: PropTypes.string,
  timestampText: PropTypes.string,
  verifyDate: PropTypes.string,
  style: ViewPropTypes.style,
};

ClaimStatus.defaultProps = {
  style: {},
  creationDate: null,
  timestampText: 'Timestamped',
  timestampDate: null,
  expirationDate: null,
};
