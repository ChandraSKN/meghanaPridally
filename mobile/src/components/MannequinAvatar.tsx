import React from 'react';
import Svg, { Path, Circle, Ellipse, Rect } from 'react-native-svg';
import { colors } from '../theme/colors';
import { TransitionDirection } from '../lib/transitionStages';

interface Props {
  heightCm: number | null;
  weightKg: number | null;
  chestCm?: number | null;
  waistCm?: number | null;
  hipCm?: number | null;
  direction: TransitionDirection;
  stageIndex: number;
  totalStages: number;
  size?: number;
}

const VIEW_W = 200;
const VIEW_H = 340;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

// A generic dress-form/tailor's mannequin — deliberately abstract (no face, no skin
// tone, no legs/arms) so it never resembles a real person. Proportions come from the
// entered measurements; the shoulder/bust/waist/hip widths shift a little per timeline
// stage to give a schematic sense of typical body-shape change over time.
export default function MannequinAvatar({
  heightCm,
  weightKg,
  chestCm,
  waistCm,
  hipCm,
  direction,
  stageIndex,
  totalStages,
  size = 220,
}: Props) {
  const heightScale = clamp((heightCm ?? 170) / 170, 0.85, 1.15);
  const bmiHint = weightKg && heightCm ? weightKg / Math.pow(heightCm / 100, 2) : 22;
  const buildScale = clamp(bmiHint / 22, 0.85, 1.2);

  const baseShoulderHalf = 34 * buildScale;
  const baseBustHalf = (chestCm ? clamp(chestCm / 3, 24, 46) : 32) * buildScale;
  const baseWaistHalf = (waistCm ? clamp(waistCm / 3, 18, 40) : 26) * buildScale;
  const baseHipHalf = (hipCm ? clamp(hipCm / 3, 22, 44) : 30) * buildScale;

  const progress = totalStages > 1 ? stageIndex / (totalStages - 1) : 0;
  const sign = direction === 'feminizing' ? 1 : -1;

  const shoulderHalf = baseShoulderHalf - sign * 4 * progress;
  const bustHalf = baseBustHalf + sign * 3 * progress;
  const waistHalf = baseWaistHalf - sign * 3 * progress;
  const hipHalf = baseHipHalf + sign * 5 * progress;

  const cx = VIEW_W / 2;
  const shoulderY = 70;
  const bustY = 120;
  const waistY = 175;
  const hipY = 230;
  const standTopY = hipY + 15;
  const standBottomY = 300;

  const path = [
    `M ${cx - shoulderHalf} ${shoulderY}`,
    `C ${cx - shoulderHalf - 6} ${shoulderY + 35} ${cx - bustHalf} ${bustY - 20} ${cx - bustHalf} ${bustY}`,
    `C ${cx - bustHalf} ${bustY + 25} ${cx - waistHalf} ${waistY - 20} ${cx - waistHalf} ${waistY}`,
    `C ${cx - waistHalf} ${waistY + 25} ${cx - hipHalf} ${hipY - 25} ${cx - hipHalf} ${hipY}`,
    `L ${cx - hipHalf * 0.55} ${standTopY}`,
    `L ${cx + hipHalf * 0.55} ${standTopY}`,
    `L ${cx + hipHalf} ${hipY}`,
    `C ${cx + hipHalf} ${hipY - 25} ${cx + waistHalf} ${waistY + 25} ${cx + waistHalf} ${waistY}`,
    `C ${cx + waistHalf} ${waistY - 20} ${cx + bustHalf} ${bustY + 25} ${cx + bustHalf} ${bustY}`,
    `C ${cx + bustHalf} ${bustY - 20} ${cx + shoulderHalf + 6} ${shoulderY + 35} ${cx + shoulderHalf} ${shoulderY}`,
    'Z',
  ].join(' ');

  const displayHeight = ((size * VIEW_H) / VIEW_W) * heightScale;

  return (
    <Svg width={size} height={displayHeight} viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} preserveAspectRatio="none">
      <Circle cx={cx} cy={shoulderY - 20} r={14} fill={colors.secondary} stroke={colors.primary} strokeWidth={2} />
      <Path d={path} fill={colors.secondary} stroke={colors.primary} strokeWidth={2} />
      <Rect x={cx - 4} y={standTopY} width={8} height={standBottomY - standTopY} fill={colors.border} />
      <Ellipse cx={cx} cy={standBottomY + 8} rx={30} ry={8} fill={colors.border} />
    </Svg>
  );
}
