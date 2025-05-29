import Keycloak from "keycloak-js";
import type { KeycloakInstance, KeycloakInitOptions, KeycloakTokenParsed } from "keycloak-js";

const _kc: KeycloakInstance = new Keycloak('/keycloak.json');

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback: () => void): void => {
  const isLoginRedirect = window.location.pathname === '/login' && window.location.href.includes('code=');

  _kc.init({
    onLoad: isLoginRedirect ? 'login-required' : 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    pkceMethod: 'S256',
  } as KeycloakInitOptions)
    .then((authenticated) => {
      if (!authenticated) {
        console.log("user is not authenticated..!");
      }

      if (isLoginRedirect) {
        window.history.replaceState({}, '', '/'); 
      }

      onAuthenticatedCallback();
    })
    .catch(console.error);
};



const doLogin = () => _kc.login();
const doLogout = () => _kc.logout();

const getToken = (): string | undefined => _kc.token;

const getTokenParsed = (): KeycloakTokenParsed | undefined => _kc.tokenParsed;

const isLoggedIn = (): boolean => !!_kc.token;

const updateToken = (successCallback: () => void): void => {
  _kc.updateToken(5)
    .then(() => successCallback())
    .catch(() => {
      doLogin();
    });
};
const getUser = (): {
  userId: string;
  email?: string;
  name?: string;
  preferredUsername?: string;
  roles?: string[];
} | undefined => {
  if (!_kc.tokenParsed) return undefined;

  return {
    userId: _kc.tokenParsed.sub ?? '',
    email: _kc.tokenParsed.email,
    name: _kc.tokenParsed.name,
    preferredUsername: _kc.tokenParsed.preferred_username,
    roles: _kc.tokenParsed.realm_access?.roles ?? [],
  };
};


const getUsername = (): string | undefined => _kc.tokenParsed?.preferred_username;

const hasRole = (roles: string[]): boolean =>
  roles.some((role) => _kc.hasRealmRole(role));

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  getTokenParsed,
  updateToken,
  getUsername,
  hasRole,
  getUser,
};

export default UserService;
