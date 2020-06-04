export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function convertArrayToObject<T extends {[key: string]: any}>(
  array: T[], key: string,
): {[key: string]: T} {
  const obj: {[key: string]: T} = {};
  array.forEach((item) => {
    obj[item[key]] = item;
  });

  return obj;
}
