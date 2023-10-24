export const utilProvider = {
  replaceDoubleQouteToSingle(input: string): string {
    /*eslint-disable */
    const result = input.replace(/"/g, "'");
    return result;
    /*eslint-enable */
  },
  isNullOrEmpty(str: string) {
    let returnValue = false;
    if (
      !str ||
      str === null ||
      str === 'null' ||
      str === '' ||
      str === '{}' ||
      str === 'undefined' ||
      str.length === 0
    ) {
      returnValue = true;
    }
    return returnValue;
  },
};
