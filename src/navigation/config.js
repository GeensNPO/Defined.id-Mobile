import React from 'react';
import {COLORS} from 'styles';
import {BackIcon} from './styles';
import {IMAGES} from 'constants';

const TAB_BAR_OPTIONS = {
  showLabel: false,
  style: {
    height: 50,
    elevation: 0,
    backgroundColor: COLORS.LIGHT_GREY_2,
  },
};

const HEADER_OPTIONS = {
  headerBackImage: () => <BackIcon source={IMAGES.BACK} />,
  headerBackTitle: 'Back',
  headerBackTitleVisible: true,
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontSize: 16,
    paddingTop: 2,
    fontFamily: 'ITCAvantGardePro-Bold',
    color: COLORS.BLACK,
    textTransform: 'capitalize',
  },
  headerBackTitleStyle: {
    color: COLORS.GREY,
    fontSize: 14,
    fontFamily: 'ITCAvantGardePro-Md',
    marginLeft: 5,
  },
};

export {TAB_BAR_OPTIONS, HEADER_OPTIONS};
