export const setUserToken = data => localStorage.setItem('celo-user-token', data);
export const userToken = localStorage.getItem('celo-user-token');
export const removeUserToken = () => localStorage.removeItem('celo-user-token');