export const groupByKey = (data: any[], key: string) => {
  return data.reduce((hash: any, obj: any) => {
    if (obj[key] === undefined) return hash;
    return Object.assign(hash, {
      [obj[key]]: (hash[obj[key]] || []).concat(obj),
    });
  }, {});
};

export const calculateMedian = (arr1: any[], key: string) => {
  let concat = arr1.sort(function (a, b) {
    return a[key] - b[key];
  });
  var length = concat.length / 2;
  return length % 1 === 0
    ? (concat[length - 1][key] + concat[length][key]) / 2
    : concat[Math.floor(length)][key];
};

export const calculateMode = (arr: any[], key: string) => {
  const mode: any = {};
  let max = 0,
    count = 0;
  console.log(arr, "arr is");
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i][key];
    if (mode[item]) {
      mode[item]++;
    } else {
      mode[item] = 1;
    }

    if (count < mode[item]) {
      max = item;
      count = mode[item];
    }
  }
  let tempObj: any[] = [];
  Object.keys(mode).map((item) => {
    if (mode[item].toFixed(3) === mode[max].toFixed(3)) {
      return tempObj.push(item);
    }
  });
  if (tempObj.length === arr.length) {
    return [];
  }
  return tempObj;
};
