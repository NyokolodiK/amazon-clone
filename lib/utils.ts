export const round2 = (num: number) =>
  Math.round(num * 100 + Number.EPSILON) / 100;

export const convertDocToObj = (doc: any) => {
  doc._id = doc._id.toString();
  return doc;
};
