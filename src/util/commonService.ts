import moment from 'moment';
import {PreconditionFailedError} from './app-error';

export const getValueOrGetDefaultValue = (
  param: string | number | null
): number => {
  if (!param) {
    return 0;
  }
  const stringWithoutCommas = +param.toString().replace(/,/g, '');
  return stringWithoutCommas ? stringWithoutCommas : 0;
};

export const verifyUploadDateIsEqualsToFileDate = async (
  fileDate: number | any,
  selectedDate: string
) => {
  fileDate = moment(selectedDate);
  const parsedExpectedDate = moment(selectedDate);

  const isEqual = parsedExpectedDate.isSame(moment(fileDate), 'day');
  if (isEqual) return await Promise.resolve(true);
  throw new PreconditionFailedError(
    'File date and selected date does not match'
  );
};

export const verifyFileNameAsExpected = (
  expectedFileNameRegex: RegExp,
  actualFileName: string
) => {
  const match = actualFileName.match(expectedFileNameRegex);
  if (match) return true;
  else {
    const failedMatch = actualFileName.match(/^(.*?)([^(.xls)]*)/);
    if (failedMatch && failedMatch[0]) {
      const whereFailed = failedMatch[0];
      const failedToMatch = failedMatch[1];
      throw new PreconditionFailedError(
        `File Name is not in format as expected. The filename ${actualFileName} failed to match at '${whereFailed}', it failed to match '${failedToMatch}'.`
      );
    } else {
      throw new PreconditionFailedError(
        'File Name is not in format as expected.'
      );
    }
  }
};
export const validateObj = (expectedObj: string[], receivedObj: object) => {
  const receivedValues = Object.values(receivedObj);

  // Check if lengths of arrays are equal
  if (receivedValues.length !== expectedObj.length) {
    throw new PreconditionFailedError('Expected Object is not present');
  }

  // Check if each element in receivedValues is equal to corresponding element in expectedObj
  for (let i = 0; i < expectedObj.length; i++) {
    if (receivedValues[i] !== expectedObj[i]) {
      throw new PreconditionFailedError('Expected Object is not present');
    }
  }
};
