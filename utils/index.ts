export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const convertArrayToObject = (array: any[], key: string): any => {
  const initialValue = {};
  return array.reduce((obj, item) => ({
    ...obj,
    [item[key]]: item,
  }), initialValue);
};
