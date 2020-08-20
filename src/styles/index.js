import {Dimensions} from 'react-native';

import COLORS from './colors';
import BUTTONS from './buttons';
import {Col, Row} from './grid';
import {BoldText, LightText, RegularText, SemiBoldText} from './typography';

const SCREEN_WIDTH = Dimensions.get('window').width;

export {
  COLORS,
  BUTTONS,
  Row,
  Col,
  RegularText,
  BoldText,
  LightText,
  SemiBoldText,
  SCREEN_WIDTH,
};
