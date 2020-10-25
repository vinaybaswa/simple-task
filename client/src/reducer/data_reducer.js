export const SET_USERS = 'SET_USERS';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_SERVICES = 'SET_SERVICES';
export const SET_TASKERS = 'SET_TASKERS';

const dataReducer = (state, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users,
        loading: false,
      };

    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
        loading: false,
      };

    case SET_SERVICES:
      return {
        ...state,
        services: action.services,
        loading: false,
      };

    case SET_TASKERS:
      return {
        ...state,
        taskers: action.taskers,
        loading: false,
      };

    default:
      return state;
  }
};

export default dataReducer;