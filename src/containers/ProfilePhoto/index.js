import React from 'react';
import {ViewPropTypes} from 'react-native';
import * as PropTypes from 'prop-types';
import {account as actions} from 'actions';
import {connect} from 'react-redux';
import PhotoUpload from 'react-native-photo-upload';
import {Photo} from './styles';
import {IMAGES} from 'constants';

function ProfilePhoto(props) {
  const {style, updateProfilePhoto, profilePhoto} = props;
  const {base64} = profilePhoto;

  return (
    <PhotoUpload containerStyle={style} onPhotoSelect={updateProfilePhoto}>
      <Photo
        source={
          base64
            ? {uri: `data:image/jpeg;base64,${base64}`}
            : IMAGES.NO_PHOTO_ICON
        }
      />
    </PhotoUpload>
  );
}

ProfilePhoto.propTypes = {
  updateProfilePhoto: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  profilePhoto: PropTypes.shape({
    base64: PropTypes.string.isRequired,
  }).isRequired,
  style: ViewPropTypes.style,
};

ProfilePhoto.defaultProps = {
  style: {},
};

function mapStateToProps(state) {
  const {account} = state;
  const {profilePhoto, isLoading} = account;
  return {profilePhoto, isLoading};
}

export default connect(mapStateToProps, {
  updateProfilePhoto: actions.updateProfilePhoto,
})(ProfilePhoto);
