export class UtilProvider {
  /**
   * regexToMatchString
   * @returns string value accepts: [alphanumeric spaces . , _]
   */
  public static regexToMatchString() {
    return /^[a-z\d\-_.\s]+$/i;
  }

  /**
   * regexToMatchDomain
   * @returns domain value accepts: [alphanumeric .]
   */
  public static regexToMatchDomain() {
    return /^[a-z\d.]+$/i;
  }

  /**
   * regexToMatchEmail
   * @returns string value accepts: [alphanumeric spaces . , _]
   */
  public static regexToMatchEmail() {
    return /^[a-z\d\-_.@\s]+$/i;
  }
}
