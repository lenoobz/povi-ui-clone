import React, { useContext, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { GlobalContext } from 'stores/contexts/GlobalContext';
import { GlobalContextType } from 'stores/contexts/GlobalContext';
import { loadEnabledAccounts, saveEnabledAccounts, saveJwtToken, saveUserDetails, getAccounts } from 'api/fundAPI';
import { useHistory } from 'react-router';
import { Actions } from 'consts/action.enum';

export const MainLayout: React.FC = ({ children }) => {
  const [ctx, dispatch]: GlobalContextType = useContext(GlobalContext);
  const { enabledAccounts, userDetails, jwtToken } = ctx;

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getToken().then((jwtToken) => {
            saveJwtToken(jwtToken);
            redirect();
          });
          getUser().then((userDetails) => saveUserDetails(userDetails));
          break;
      }
    });
  }, []);

  // This effect is triggered when the app load the first time.
  // With current PoC, we will load user portfolios, portfolio
  // positions, view porfolios and the whole asset lists
  useEffect(() => {
    const fetchInitalData = async () => {
      try {
        dispatch({ type: Actions.START_FETCHING });

        const jwtToken = await getToken();
        const userDetails = await getUser();
        const enabledAccounts = loadEnabledAccounts();
        const accounts = await getAccounts(userDetails.sub);

        const payload = {
          accounts,
          jwtToken,
          userDetails,
          enabledAccounts
        };

        dispatch({ type: Actions.INIT_REQUEST_SUCCESS, payload });
      } catch (err) {
        dispatch({ type: Actions.ERROR_FETCHING });
      } finally {
        dispatch({ type: Actions.FINISH_FETCHING });
      }
    };

    fetchInitalData();
  }, [dispatch]);

  // Save enabled accounts to local storage
  useEffect(() => {
    saveEnabledAccounts(enabledAccounts);
  }, [enabledAccounts]);

  // Save user details to local storage
  useEffect(() => {
    saveUserDetails(userDetails);
  }, [userDetails]);

  // Save jwt token to local storage
  useEffect(() => {
    saveJwtToken(jwtToken);
  }, [jwtToken]);

  // NOTE: Redirect after use from signup page to home
  // Triggered after use login using google button
  const hist = useHistory();
  const redirect = () => {
    setTimeout(() => {
      hist.push('/');
    }, 100);
  };

  return <>{children}</>;
};

const getToken = () => {
  return Auth.currentAuthenticatedUser().then((userData) => {
    const userSession = userData.getSignInUserSession();
    const idToken = userSession.getIdToken();
    const jwtToken = idToken.getJwtToken();

    return jwtToken;
  });
};

const getUser = () => {
  return Auth.currentAuthenticatedUser().then((userData) => {
    const userSession = userData.getSignInUserSession();
    const idToken = userSession.getIdToken();
    const payload = idToken.decodePayload();

    const userDetails = {
      sub: payload.sub,
      name: payload.name,
      picture: payload.picture
    };

    return userDetails;
  });
};
