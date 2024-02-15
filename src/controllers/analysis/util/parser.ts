import {getValueOrGetDefaultValue} from '../../../util/commonService';

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

export const organizeHotelDataV1 = (arr: any[], len: number) => {
  const result = [];
  for (let i = 0; i < len; i++) {
    const obj: any = {report: []};
    obj.department = arr[0]['A'];
    arr.shift();
    while (arr[0]['A'] !== 'Outlet Total') {
      const session = arr[0]['A'];
      arr.shift();
      const resident = parseSessionInfo(arr[0]);
      arr.shift();
      const nonResident = parseSessionInfo(arr[0]);
      arr.shift();
      const sessionTotal = parseSessionInfo(arr[0]);
      arr.shift();
      obj.report.push({
        session,
        nonResident,
        resident,
        sessionTotal,
      });
    }
    obj.outletTotal = parseSessionInfo(arr[0]);
    arr.shift();
    result.push(obj);
  }
  return result;
};
