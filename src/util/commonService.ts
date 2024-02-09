import moment from 'moment';
import { PreconditionFailedError } from './app-error';

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
      // If not equal, throw an error indicating where the mismatch occurred
      throw new PreconditionFailedError(
        `Mismatch found at index ${i}. Expected: ${expectedObj[i]}, Received: ${receivedValues[i]}`
      );
    }
  }
};

export function parseSessionInfo(data: any) {
  return {
    foodCov: getValueOrGetDefaultValue(data['B']),
    foodAmd: getValueOrGetDefaultValue(data['C']),
    foodAvg: getValueOrGetDefaultValue(data['D']),

    liqCov: getValueOrGetDefaultValue(data['E']),
    liqAmd: getValueOrGetDefaultValue(data['F']),
    liqAvg: getValueOrGetDefaultValue(data['G']),

    softDrinkCov: getValueOrGetDefaultValue(data['H']),
    softDrinkAmd: getValueOrGetDefaultValue(data['I']),
    softDrinkAvg: getValueOrGetDefaultValue(data['J']),

    tobaccoCov: getValueOrGetDefaultValue(data['K']),
    tobaccoAmd: getValueOrGetDefaultValue(data['L']),
    tobaccoAvg: getValueOrGetDefaultValue(data['M']),

    othersCov: getValueOrGetDefaultValue(data['N']),
    othersAmd: getValueOrGetDefaultValue(data['O']),
    othersAvg: getValueOrGetDefaultValue(data['P']),

    totalCov: getValueOrGetDefaultValue(data['Q']),
    totalAmd: getValueOrGetDefaultValue(data['R']),
    totalAvg: getValueOrGetDefaultValue(data['S']),
  };
}

export function takeOneSession(data: any[]) {
  const hotel = data[0].A;
  if (hotel == 'Session Total') return;
  data.shift();
  const session = data[1].A;
  data.shift();
  const result: any = {};
  for (let i = 0; i < data.length; i++) {
    if (data[i]['A'] === 'Resident') {
      result.resident = parseSessionInfo(data[i]);
      data.shift();
      continue;
    } else if (data[i]['A'] === 'Non Resident') {
      result.non_resident = parseSessionInfo(data[i]);
      data.shift();
      continue;
    } else if (data[i]['A'] === 'Session Total') {
      result.sessionTotal = parseSessionInfo(data[i]);
      data.shift();
      continue;
    } else {
      result.outletTotal = parseSessionInfo(data[i]);
      data.shift();
      break;
    }

  }
  return {
    hotel,
    session,
    resident: result.resident,
    non_resident: result.non_resident,
    sessionTotal: result.sessionTotal,
    outletTotal: result.outletTotal,
  };
}
