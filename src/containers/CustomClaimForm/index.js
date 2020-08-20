import React from 'react';
import BaseForm from '../BaseForm';
import autoBind from 'auto-bind';
import {BUTTONS, Row} from 'styles';
import {Button, Description, Input, Textarea} from 'components';
import {Container, Content, Footer} from './styles';
import * as PropTypes from 'prop-types';
import * as validations from 'utils';
import {CLAIM_STATUSES} from 'constants';

class CustomClaimForm extends BaseForm {
  validations = {
    title: (value) => validations.notEmpty(value, 'Title is required'),
    content: (value) => validations.notEmpty(value, 'Content is required'),
  };

  constructor(props) {
    super(props);

    this.state = {
      fields: {
        title: {value: '', error: null, dirty: false},
        content: {value: '', error: null, dirty: false},
      },
    };

    autoBind(this);
  }

  componentDidMount() {
    this.validateForm();
  }

  save() {
    const {onSubmit} = this.props;
    const {fields} = this.state;

    if (this.validateForm()) {
      onSubmit({
        title: fields.title.value,
        status: CLAIM_STATUSES.UNVERIFIED,
        description: fields.content.value,
        claims: [
          {
            status: CLAIM_STATUSES.UNVERIFIED,
            title: fields.title.value,
            content: fields.content.value,
          },
        ],
      });
    }
  }

  render() {
    const {fields} = this.state;

    return (
      <Container>
        <Content>
          <Row mb={20}>
            <Input
              error={fields.title.error}
              dirty={fields.title.dirty}
              label="Name your claim"
              value={fields.title.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              placeholder="Enter Title"
              name="title"
            />
          </Row>
          <Row mb={0}>
            <Textarea
              error={fields.content.error}
              dirty={fields.content.dirty}
              label="Add Content"
              value={fields.content.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              placeholder="Enter Content"
              name="content"
            />
          </Row>
        </Content>
        <Footer>
          <Row mb={20}>
            <Description
              center
              text="Name your claim and add content e.g. Work Email mail@work.com"
            />
          </Row>
          <Row center mb={0}>
            <Button
              type={BUTTONS.SECONDARY}
              disabled={this.hasErrors()}
              title="Done"
              onPress={this.save}
            />
          </Row>
        </Footer>
      </Container>
    );
  }
}

CustomClaimForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CustomClaimForm;
