import React from 'react';
import {Linking, ViewPropTypes} from 'react-native';
import {
  Container,
  Header,
  ItemDetails,
  ItemDetailsWrapper,
  ItemIcon,
  ItemMain,
  ItemTitle,
  List,
  SectionTitle,
  Separator,
  TransactionItem,
} from './styles';
import {connect} from 'react-redux';
import {nem as actions} from 'actions';
import * as PropTypes from 'prop-types';
import autoBind from 'auto-bind';
import {IMAGES} from 'constants';
import {Row} from 'styles';
import {Description} from 'components';
import {DefinedService, NemService} from 'services';

class TransactionsLog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      transactions: [],
    };

    autoBind(this);
  }

  componentDidMount(): void {
    this.onRefresh();
  }

  async onRefresh() {
    const {getTotalAmount} = this.props;

    const t = await NemService.getTransactions();
    console.log(t);
    Promise.all([getTotalAmount(), NemService.getTransactions()])
      .then((values) => {
        this.setState({transactions: values[1].data});
      })
      .catch(() => {
        this.setState({isRefreshing: false});
      });
  }

  openUrl(hash) {
    const url = DefinedService.createExplorerURL(hash);
    Linking.openURL(url);
  }

  renderItem = (item) => {
    const {address} = this.props;
    let amount;
    let image;

    if (item.mosaics.length === 0) {
      amount = 0;
      image = IMAGES.CONNECTIONS_ACTIVE;
    } else {
      amount = item.mosaics[0].amount.compact() / Math.pow(10, 6);
      image =
        item.recipientAddress.address === address.replace(/-/g, '')
          ? IMAGES.RECEIVE_ICON
          : IMAGES.CONNECTIONS_ACTIVE;
    }

    return (
      <TransactionItem onPress={() => this.openUrl(item.transactionInfo.hash)}>
        <ItemDetailsWrapper>
          <ItemIcon source={image} />
          <ItemDetails>
            <ItemTitle>NEM</ItemTitle>
            <Description text="Nem.io network" />
          </ItemDetails>
        </ItemDetailsWrapper>
        <ItemDetails>
          <ItemTitle>{`${amount} XYM`}</ItemTitle>
          <Description text={`${amount} USD`} />
        </ItemDetails>
      </TransactionItem>
    );
  };

  render() {
    const {style, totalAmount} = this.props;
    const {isRefreshing, transactions} = this.state;

    return (
      <Container style={style}>
        <Header>
          <Row mb={15} center>
            <SectionTitle>Your Assets</SectionTitle>
          </Row>
          <ItemMain mb={15} spaceBetween>
            <ItemDetailsWrapper>
              <ItemIcon source={IMAGES.NEM_ICON} />
              <ItemDetails>
                <ItemTitle>NEM</ItemTitle>
                <Description text="Nem.io network" />
              </ItemDetails>
            </ItemDetailsWrapper>
            <ItemDetails>
              <ItemTitle>{`${totalAmount} XYM`}</ItemTitle>
              <Description text={`${totalAmount} USD`} />
            </ItemDetails>
          </ItemMain>
          <SectionTitle>History</SectionTitle>
        </Header>
        <List
          refreshing={isRefreshing}
          onRefresh={this.onRefresh}
          ItemSeparatorComponent={() => <Separator />}
          data={transactions}
          renderItem={({item}) => this.renderItem(item)}
          keyExtractor={(item) => item.signature}
        />
      </Container>
    );
  }
}

TransactionsLog.propTypes = {
  style: ViewPropTypes.style,
  getTotalAmount: PropTypes.func.isRequired,
  totalAmount: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
};

TransactionsLog.defaultProps = {
  style: {},
};

function mapStateToProps(state) {
  const {nem} = state;
  const {totalAmount, address} = nem;
  return {totalAmount, address};
}

export default connect(mapStateToProps, {
  getTotalAmount: actions.getTotalAmount,
})(TransactionsLog);
