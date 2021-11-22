import { KolorWheel } from './KolorWheel';

export const genFillRange = (minVal: number, maxVal: number, num: number, baseColor: string, targetColor: string) => {
  const fillRange = [];

  let prevMin = minVal;
  let prevMax = minVal;
  const range = Math.ceil((maxVal - minVal) / num);

  const base = new KolorWheel(baseColor);
  const target = base.abs(targetColor, num);

  for (let i = 0; i < num; i++) {
    if (i === 0) {
      prevMin = minVal;
      prevMax += range;
    } else {
      prevMin = prevMax;
      prevMax += range;
    }

    if (i === num - 1) {
      prevMax = maxVal;
    }

    fillRange.push({ color: target.get(i).getHex(), min: prevMin, max: prevMax });
  }

  return fillRange;
};

export const genColors = (baseColor: string, targetColor: string, numColor: number) => {
  const base = new KolorWheel(baseColor);
  const target = base.abs(targetColor, numColor);

  const colors = [];
  for (let i = 0; i < numColor; i++) {
    colors.push(target.get(i).getHex());
  }

  return colors;
};
