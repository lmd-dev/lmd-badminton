import { SHA512 } from "../libs/sha512/sha512";

/**
 * Service responsible for the authentication of users
 */
class ServiceAuthentication
{
  private static readonly userKey: string = "bad-user";
  private static readonly sessionKey: string = "bad-session";
  private static readonly shaKey: string = "LMD-BAD";

  /**
   * Initialize user's ID at first start of the application
   * @param username
   * @param password
   */
  initialize(username: string, password: string)
  {
    const storedData = localStorage.getItem(ServiceAuthentication.userKey);

    if(!storedData || this.isConnected)
    {
      localStorage.setItem(ServiceAuthentication.userKey, this.hash(JSON.stringify({ username: username, password: password})));
    }
  }

  /**
   * Tries to login the user from the given ID
   * @param username
   * @param password
   * @returns true if ID is correct, false else
   */
  login(username: string, password: string): boolean
  {
    const storedData = localStorage.getItem(ServiceAuthentication.userKey);

    if(storedData && this.hash(JSON.stringify({username: username, password: password})))
    {
      sessionStorage.setItem(ServiceAuthentication.sessionKey, "open");
      return true;
    }

    return false;
  }

  /**
   * Logs out the user
   */
  logout()
  {
    sessionStorage.removeItem(ServiceAuthentication.sessionKey)
  }

  /**
   * Indicates if the user is connected
   * @returns True if user is connected, false else
   */
  isConnected(): boolean
  {
    return sessionStorage.getItem(ServiceAuthentication.sessionKey) === "open";
  }

  /**
   * Hashes the given string with SHA512 algorithm and shaKey
   * @param stringToHash String to hash
   * @returns Hashed string
   */
  private hash(stringToHash: string): string
  {
    return SHA512.hash(ServiceAuthentication.shaKey + stringToHash)
  }
}

export const serviceAuthentication = new ServiceAuthentication();
