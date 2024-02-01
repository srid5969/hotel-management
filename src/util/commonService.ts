export const getValueOrGetDefaultValue = (
  param: string | number | null
): number => {
  if (!param) {
    return 0;
  }
  const stringWithoutCommas = +param.toString().replace(/,/g, '');
  return stringWithoutCommas ? stringWithoutCommas : 0;
};
