import { Auth0Provider } from "@auth0/auth0-react";
import type { ReactNode } from "react";

export const Auth0ProviderWithNavigate = ({
  children,
}: {
  children: ReactNode;
}) => {
  const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_REACT_APP_AUTH0_CALLBACK_URL;

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin || redirectUri,
      }}
    >
      {children}
    </Auth0Provider>
  );
};
