import update from 'immutability-helper';
import {
  ADDRESS_UPDATE,
  BIRTH_DATE_UPDATE,
  EMAIL_UPDATE,
  NAME_AND_SURNAME_UPDATE,
  PHONE_UPDATE,
  PROFILE_PHOTO_UPDATE,
  PROFILE_PHOTO_UPDATE_ERROR,
  PROFILE_PHOTO_UPDATE_START,
  PASSPORT_UPDATE,
  PASSPORT_UPDATE_ERROR,
  PASSPORT_UPDATE_START,
  DRIVING_LICENSE_UPDATE,
  DRIVING_LICENSE_UPDATE_ERROR,
  DRIVING_LICENSE_UPDATE_START,
  NATIONAL_ID_UPDATE,
  NATIONAL_ID_UPDATE_ERROR,
  NATIONAL_ID_UPDATE_START
} from 'actions/account/types';

const initialState = {
  email: '',
  phone: '',
  name: '',
  surname: '',
  birthDate: '',
  country: '',
  firstAddressLine: '',
  city: '',
  profilePhoto: {
    base64: '',
  },
  passportPhoto: {
    base64: '',
  },
  nationalIdPhoto: {
    base64: '',
  },
  drivingLicensePhoto: {
    base64: '',
  },
  isLoading: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case NAME_AND_SURNAME_UPDATE: {
      return update(state, {
        name: {$set: payload.name},
        surname: {$set: payload.surname},
      });
    }

    case DRIVING_LICENSE_UPDATE_START:
    case NATIONAL_ID_UPDATE_START:
    case PASSPORT_UPDATE_START:
    case PROFILE_PHOTO_UPDATE_START: {
      return update(state, {
        isLoading: {$set: true},
      });
    }

    case DRIVING_LICENSE_UPDATE_ERROR:
    case NATIONAL_ID_UPDATE_ERROR:
    case PASSPORT_UPDATE_ERROR:
    case PROFILE_PHOTO_UPDATE_ERROR: {
      return update(state, {
        isLoading: {$set: false},
      });
    }

    case DRIVING_LICENSE_UPDATE: {
      return update(state, {
        drivingLicensePhoto: {
          base64: {$set: payload.base64},
        },
      });
    }

    case PASSPORT_UPDATE: {
      return update(state, {
        passportPhoto: {
          base64: {$set: payload.base64},
        },
      });
    }

    case NATIONAL_ID_UPDATE: {
      return update(state, {
        nationalIdPhoto: {
          base64: {$set: payload.base64},
        },
      });
    }

    case PROFILE_PHOTO_UPDATE: {
      return update(state, {
        profilePhoto: {
          base64: {$set: payload.base64},
        },
      });
    }

    case ADDRESS_UPDATE: {
      return update(state, {
        country: {$set: payload.country},
        firstAddressLine: {$set: payload.firstAddressLine},
        city: {$set: payload.city},
      });
    }

    case EMAIL_UPDATE: {
      return update(state, {
        email: {$set: payload.email},
      });
    }

    case BIRTH_DATE_UPDATE: {
      return update(state, {
        birthDate: {$set: payload.birthDate},
      });
    }

    case PHONE_UPDATE: {
      return update(state, {
        phone: {$set: payload.phone},
      });
    }

    default:
      return state;
  }
};
