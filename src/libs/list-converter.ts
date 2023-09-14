/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
export const transformArray = (arr: any[]) => {
  return arr.map((item: any) => ({ value: item, label: item }));
};
