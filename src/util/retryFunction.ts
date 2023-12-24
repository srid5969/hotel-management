const sleep = (duration: number) =>
  new Promise(res => setTimeout(res, duration));

/**
 * Retries a function when failed
 * @param {Promise} fn Method to retry
 * @param {Mixed} args Arguments for method
 * @param {Number} retries Max number of of retries
 * @param {Number} delayMs Delay in miliseconds before each retry
 */

export const retryFnOnFailure = (
  fn: any,
  args: any,
  retries = 5,
  delayMs = 2000
) =>
  fn(args).catch((err: Error) => {
    if (retries > 1) {
      console.debug('retryFnOnFailure', {
        fn,
        retries: retries - 1,
        delayMs,
        err,
      });
      return sleep(delayMs).then(() =>
        retryFnOnFailure(fn, args, retries - 1, delayMs)
      );
    }
    console.error('retryFnOnFailureErr', {fn, delayMs, err});
    throw err;
  });
