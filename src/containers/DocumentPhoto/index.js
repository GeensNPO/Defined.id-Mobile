import React from 'react';
import {ViewPropTypes} from 'react-native';
import * as PropTypes from 'prop-types';
import PhotoUpload from 'react-native-photo-upload';
import {Container, Photo, Wrapper} from './styles';
import {IMAGES} from 'constants';
import {COLORS, SCREEN_WIDTH} from 'styles';

function DocumentPhoto(props) {
  const {style, onPhotoSelect, documentPhoto} = props;
  const {base64} = documentPhoto;

  const colors = !base64
    ? [COLORS.PINK, COLORS.PURPLE]
    : [COLORS.BLUE, COLORS.GREEN];

  return (
    <Container colors={colors} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
      <Wrapper>
        <PhotoUpload containerStyle={style} onPhotoSelect={onPhotoSelect}>
          <Photo
            style={{width: base64 ? SCREEN_WIDTH - 22 : 88}}
            source={
              base64
                ? {uri: `data:image/jpeg;base64,${base64}`}
                : IMAGES.NO_PHOTO_ICON
            }
          />
        </PhotoUpload>
      </Wrapper>
    </Container>
  );
}

DocumentPhoto.propTypes = {
  onPhotoSelect: PropTypes.func.isRequired,
  documentPhoto: PropTypes.shape({
    base64: PropTypes.string.isRequired,
  }).isRequired,
  style: ViewPropTypes.style,
};

DocumentPhoto.defaultProps = {
  style: {},
};

export default DocumentPhoto;
