import styled from 'styled-components';
import {COLORS} from 'styles';
import {GradientWrapper} from 'components';

const Container = styled(GradientWrapper)`
  padding: 20px 10px;
`;

const Header = styled.View``;

const ProfilePhotoContainer = styled.View`
  width: 108px;
  height: 108px;
  background-color: ${COLORS.WHITE};
  border-radius: 54px;
`;

export {Container, Header, ProfilePhotoContainer};
