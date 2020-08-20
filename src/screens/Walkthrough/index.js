import React, {useState} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {app as actions} from 'actions';
import {
  Description,
  Footer,
  Image,
  Link,
  LinkText,
  Slide,
  SlideContentFooter,
  SlidesContainer,
  Subtitle,
} from './styles';
import {IMAGES} from 'constants';
import {GradientWrapper, Paging, Title} from 'components';
import {Row} from 'styles';
import {NAVIGATORS} from 'navigation/constants';

const SLIDES = [
  {
    title: 'Welcome!',
    subtitle: 'Your private digital wallet',
    description:
      'You control your digital identity and proactively decide which information you share with others.',
    image: IMAGES.IDENTIFICATION_ILLUSTRATION,
  },
  {
    title: 'Start with your info',
    subtitle: 'Create your ID',
    description: 'Add your personal information such as name or email.',
    image: IMAGES.PROFILE_ILLUSTRATION,
  },
  {
    title: 'Build Your Profile',
    subtitle: 'Improve your ID',
    description:
      'Add official certificates (from government, bank, university) & combine info to strong credentials.',
    image: IMAGES.VERIFIED_ILLUSTRATION,
  },
  {
    title: 'Prove Your Identity',
    subtitle: 'Share your credentials',
    description:
      'Connect with 3rd parties and share the exact information they ask for - not more & only if you like.',
    image: IMAGES.PROVE_ILLUSTRATION,
  },
  {
    title: 'Backup & Restore',
    subtitle: 'Secure your Wallet!',
    description:
      'Only you can access your private wallet & restore it. Back it up now in Settings.',
    image: IMAGES.BACKUP_ILLUSTRATION,
  },
];

function WalkthroughScreen(props) {
  const {completeWalkthrough, navigation} = props;
  const [page, setPage] = useState(1);

  const onScrollEnd = ({nativeEvent}) => {
    const {contentOffset, layoutMeasurement} = nativeEvent;
    const {x} = contentOffset;
    const nextPage = Math.floor(x / layoutMeasurement.width) + 1;
    setPage(nextPage);
  };

  const complete = () => {
    completeWalkthrough();
    navigation.reset({
      routes: [{name: NAVIGATORS.MAIN}],
    });
  };

  const renderSlideContent = (slide) => {
    return (
      <Slide key={slide.title}>
        <Title text={slide.title} />
        <Image source={slide.image} />
        <SlideContentFooter>
          <Subtitle>{slide.subtitle}</Subtitle>
          <Description>{slide.description}</Description>
        </SlideContentFooter>
      </Slide>
    );
  };

  return (
    <GradientWrapper>
      <SlidesContainer
        showsHorizontalScrollIndicator={false}
        horizontal
        onMomentumScrollEnd={onScrollEnd}
        pagingEnabled>
        {SLIDES.map((slide) => renderSlideContent(slide))}
      </SlidesContainer>
      <Footer>
        <Row mb={40}>
          <Paging pagesCount={SLIDES.length} currentPage={page} />
        </Row>
        <Row center mb={0}>
          <Link onPress={complete}>
            <LinkText>{SLIDES.length === page ? 'Complete' : 'Skip'}</LinkText>
          </Link>
        </Row>
      </Footer>
    </GradientWrapper>
  );
}

WalkthroughScreen.propTypes = {
  completeWalkthrough: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    reset: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, {
  completeWalkthrough: actions.completeWalkthrough,
})(WalkthroughScreen);
