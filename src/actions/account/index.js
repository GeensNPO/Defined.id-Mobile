import {
  ADDRESS_UPDATE,
  BIRTH_DATE_UPDATE,
  DRIVING_LICENSE_UPDATE,
  DRIVING_LICENSE_UPDATE_ERROR,
  DRIVING_LICENSE_UPDATE_START,
  EMAIL_UPDATE,
  NAME_AND_SURNAME_UPDATE,
  NATIONAL_ID_UPDATE,
  NATIONAL_ID_UPDATE_ERROR,
  NATIONAL_ID_UPDATE_START,
  PASSPORT_UPDATE,
  PASSPORT_UPDATE_ERROR,
  PASSPORT_UPDATE_START,
  PHONE_UPDATE,
  PROFILE_PHOTO_UPDATE,
  PROFILE_PHOTO_UPDATE_ERROR,
  PROFILE_PHOTO_UPDATE_START,
} from './types';
import {store} from 'store';
import {createCredential} from '../credentials';
import {CLAIM_STATUSES} from 'constants';
import {FlashMessagesService} from 'services';

export function updateNameAndSurname(request) {
  const fullNameCredential = {
    title: 'Full name',
    status: CLAIM_STATUSES.UNVERIFIED,
    description: `${request.name} ${request.surname}`,
    claims: [
      {
        title: 'First name',
        status: CLAIM_STATUSES.UNVERIFIED,
        content: request.name,
      },
      {
        title: 'Last name',
        status: CLAIM_STATUSES.UNVERIFIED,
        content: request.surname,
      },
    ],
  };

  store.dispatch(createCredential(fullNameCredential));

  const firstNameCredential = {
    title: 'First name',
    status: CLAIM_STATUSES.UNVERIFIED,
    description: request.name,
    claims: [
      {
        title: 'First name',
        status: CLAIM_STATUSES.UNVERIFIED,
        content: request.name,
      },
    ],
  };

  store.dispatch(createCredential(firstNameCredential));

  const lastNameCredential = {
    title: 'Last name',
    status: CLAIM_STATUSES.UNVERIFIED,
    description: request.surname,
    claims: [
      {
        title: 'Last name',
        status: CLAIM_STATUSES.UNVERIFIED,
        content: request.surname,
      },
    ],
  };

  store.dispatch(createCredential(lastNameCredential));

  return {
    type: NAME_AND_SURNAME_UPDATE,
    payload: request,
  };
}

export function updateAddress(request) {
  const countryCredential = {
    title: 'Country',
    status: CLAIM_STATUSES.UNVERIFIED,
    description: request.country,
    claims: [
      {
        title: 'Country',
        status: CLAIM_STATUSES.UNVERIFIED,
        content: request.country,
      },
    ],
  };

  store.dispatch(createCredential(countryCredential));

  const cityCredential = {
    title: 'City',
    status: CLAIM_STATUSES.UNVERIFIED,
    description: request.city,
    claims: [
      {
        title: 'City',
        status: CLAIM_STATUSES.UNVERIFIED,
        content: request.city,
      },
    ],
  };

  store.dispatch(createCredential(cityCredential));

  const firstAddressLineCredential = {
    title: 'Address Line 1',
    status: CLAIM_STATUSES.UNVERIFIED,
    description: request.firstAddressLine,
    claims: [
      {
        title: 'Address Line 1',
        status: CLAIM_STATUSES.UNVERIFIED,
        content: request.firstAddressLine,
      },
    ],
  };

  store.dispatch(createCredential(firstAddressLineCredential));

  const addressCredential = {
    title: 'Address',
    status: CLAIM_STATUSES.UNVERIFIED,
    description: `${request.firstAddressLine}, ${request.city} ${request.country}`,
    claims: [
      {
        title: 'Address',
        status: CLAIM_STATUSES.UNVERIFIED,
        content: `${request.firstAddressLine}, ${request.city} ${request.country}`,
      },
    ],
  };

  store.dispatch(createCredential(addressCredential));

  return {
    type: ADDRESS_UPDATE,
    payload: request,
  };
}

export function updateEmail(request) {
  const emailCredential = {
    title: 'Email',
    status: CLAIM_STATUSES.UNVERIFIED,
    description: request.email,
    claims: [
      {
        title: 'Email',
        status: CLAIM_STATUSES.UNVERIFIED,
        content: request.email,
      },
    ],
  };

  store.dispatch(createCredential(emailCredential));

  return {
    type: EMAIL_UPDATE,
    payload: request,
  };
}

export function updateBirthDate(request) {
  const phoneCredential = {
    title: 'Birth date',
    status: CLAIM_STATUSES.UNVERIFIED,
    description: request.birthDate,
    claims: [
      {
        title: 'Birth date',
        status: CLAIM_STATUSES.UNVERIFIED,
        content: request.birthDate,
      },
    ],
  };

  store.dispatch(createCredential(phoneCredential));

  return {
    type: BIRTH_DATE_UPDATE,
    payload: request,
  };
}

export function updatePhone(request) {
  const phoneCredential = {
    title: 'Phone',
    status: CLAIM_STATUSES.UNVERIFIED,
    description: request.phone,
    claims: [
      {
        title: 'Phone',
        status: CLAIM_STATUSES.UNVERIFIED,
        content: request.phone,
      },
    ],
  };

  store.dispatch(createCredential(phoneCredential));

  return {
    type: PHONE_UPDATE,
    payload: request,
  };
}

export function updateProfilePhoto(base64String) {
  return async (dispatch) => {
    try {
      dispatch({type: PROFILE_PHOTO_UPDATE_START});
      // const response = await Geens.uploadFile(url, FILE_TYPES.PROFILE);
      // const {key_id} = response.data;
      // const bytes = await Geens.getFile(key_id).data;
      dispatch({type: PROFILE_PHOTO_UPDATE, payload: {base64: base64String}});
    } catch (exception) {
      FlashMessagesService.showGenericError();
      dispatch({type: PROFILE_PHOTO_UPDATE_ERROR});
    }
  };
}

export function updatePassportPhoto(base64String) {
  return async (dispatch) => {
    try {
      dispatch({type: PASSPORT_UPDATE_START});
      // const response = await Geens.uploadFile(url, FILE_TYPES.PROFILE);
      // const {key_id} = response.data;
      // const bytes = await Geens.getFile(key_id).data;
      dispatch({type: PASSPORT_UPDATE, payload: {base64: base64String}});
    } catch (exception) {
      FlashMessagesService.showGenericError();
      dispatch({type: PASSPORT_UPDATE_ERROR});
    }
  };
}

export function updateNationalIdPhoto(base64String) {
  return async (dispatch) => {
    try {
      dispatch({type: NATIONAL_ID_UPDATE_START});
      // const response = await Geens.uploadFile(url, FILE_TYPES.PROFILE);
      // const {key_id} = response.data;
      // const bytes = await Geens.getFile(key_id).data;
      dispatch({type: NATIONAL_ID_UPDATE, payload: {base64: base64String}});
    } catch (exception) {
      FlashMessagesService.showGenericError();
      dispatch({type: NATIONAL_ID_UPDATE_ERROR});
    }
  };
}

export function updateDrivingLicensePhoto(base64String) {
  return async (dispatch) => {
    try {
      dispatch({type: DRIVING_LICENSE_UPDATE_START});
      // const response = await Geens.uploadFile(url, FILE_TYPES.PROFILE);
      // const {key_id} = response.data;
      // const bytes = await Geens.getFile(key_id).data;
      dispatch({type: DRIVING_LICENSE_UPDATE, payload: {base64: base64String}});
    } catch (exception) {
      FlashMessagesService.showGenericError();
      dispatch({type: DRIVING_LICENSE_UPDATE_ERROR});
    }
  };
}
