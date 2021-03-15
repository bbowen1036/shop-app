// React
import AsyncStorage from "@react-native-community/async-storage";
// Keys
import FBAPI from "../../config/keys";

// export const SIGNUP = "SIGNUP";
// export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";   

export const authenticate = (userId, token) => {  
  // for when users session token is still valid. Dont want to send a request to DB only update redux state
  return {
    type: AUTHENTICATE,
    userId,
    token
  }
}

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FBAPI.firebaseAPIKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;

      let message;
      switch (errorId) {
        case "EMAIL_EXISTS":
          message = "This email has already been taken!";
          break;
        default:
          message = "Something went wrong!";
          break;
      }

      throw new Error(message);
    }
    const resData = await response.json(); // takes response and transforms it from json to js object
    /*  
    SAMPLE RESPONSE FROM FB AUTH ENDPOINT
    {
      "idToken": "[ID_TOKEN]",
      "email": "[user@example.com]",
      "refreshToken": "[REFRESH_TOKEN]",
      "expiresIn": "3600",
      "localId": "tRcfmLH7..."
    } */
    dispatch(authenticate(resData.localId, resData.idToken));
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};


export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FBAPI.firebaseAPIKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;

      let message;
      switch (errorId) {
        case "EMAIL_NOT_FOUND":
          message = "This email could not be found!";
          break;
        case "INVALID_PASSWORD":
          message = "Password or Email is not valid!";
          break;
        default:
          message = "Something went wrong!";
          break;
      }

      throw new Error(message);
    }

    const resData = await response.json(); // takes response and transforms it from json to js object
    dispatch(authenticate(resData.localId, resData.idToken));
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString()
    })
  );
};