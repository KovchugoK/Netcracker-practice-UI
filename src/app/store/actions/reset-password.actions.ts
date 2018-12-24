export const SEND_EMAIL = 'SEND_EMAIL';
export const SEND_EMAIL_SUCCESS = 'SEND_EMAIL_SUCCESS';
export const SAVE_PASSWORD = 'SAVE_PASSWORD';
export const SAVE_PASSWORD_SUCCESS = 'SAVE_PASSWORD_SUCCESS';

export function sendResetPasswordEmail(email: string) {
  return {
    type: SEND_EMAIL,
    payload: {email}
  };
}

export function sendResetPasswordEmailSuccessAction(email: string) {
  return {
    type: SEND_EMAIL_SUCCESS,
    payload: {email}
  };
}

export function savePassword(email: string) {
  return {
    type: SAVE_PASSWORD,
    payload: {email}
  };
}

export function savePasswordSuccessAction(email: string) {
  return {
    type: SAVE_PASSWORD_SUCCESS,
    payload: {email}
  };
}
