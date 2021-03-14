import FBAPI from "../../config/keys";

export const SIGNUP = "SIGNUP";

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
      throw new Error("Something went wrong!")
    }

    const resData = await response.json();   // takes response and transforms it from json to js object
    /*  
    SAMPLE RESPONSE FROM FB AUTH ENDPOINT
    {
      "idToken": "[ID_TOKEN]",
      "email": "[user@example.com]",
      "refreshToken": "[REFRESH_TOKEN]",
      "expiresIn": "3600",
      "localId": "tRcfmLH7..."
    } */

    
    dispatch({ type: SIGNUP });
  };
};
