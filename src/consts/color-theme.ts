import { genColors } from 'utils/color.utils';

const MIN_NUM_COLORS = 3;
const DEFAULT_NUM_COLORS = 15;

export const GEN_COLORS = (numColor = DEFAULT_NUM_COLORS) => {
  const num = Math.max(MIN_NUM_COLORS, numColor);
  return genColors('#acdf87', '#265728', num);
};

const FIX_COLORS = [
  '#0b6623',
  '#29ab87',
  '#4cbb17',
  '#50c878',
  '#98fb98',
  '#c7ea46',
  '#708238',
  '#679267',
  '#9dc183',
  '#b7dfb8',
  '#4f7942',
  '#00a86b',
  '#a9ba9d',
  '#043927',
  '#444c38'
];

export const COLORS = FIX_COLORS;
