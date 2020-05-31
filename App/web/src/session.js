import Cookie from 'js-cookie';

export const setUser = (user) => 
  Cookie.set('user', user, {expires: 1});
export const setAuthToken = (authToken) => 
  Cookie.set('authToken', authToken, { expires: 1 });

export const getUser = () => 
  Cookie.get('user');
export const getAuthToken = () => 
  Cookie.get('authToken');

export const deleteUser = () => 
  Cookie.remove('user');
export const deleteAuthToken = () => 
  Cookie.remove('authToken');

