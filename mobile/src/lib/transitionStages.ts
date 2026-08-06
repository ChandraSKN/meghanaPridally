export type TransitionDirection = 'feminizing' | 'masculinizing';

export interface TransitionStage {
  key: string;
  label: string;
  monthOffset: number;
  changes: string[];
}

// General, non-personalized reference points. Real timelines and outcomes vary
// hugely by person — see DISCLAIMER, which is always shown alongside this content.
export const TRANSITION_STAGES: Record<TransitionDirection, TransitionStage[]> = {
  feminizing: [
    {
      key: 'baseline',
      label: 'Baseline',
      monthOffset: 0,
      changes: ['Starting point before hormone therapy begins.'],
    },
    {
      key: '3mo',
      label: '~3 months',
      monthOffset: 3,
      changes: [
        'Some skin softening',
        'Early reduction in oil/acne',
        'Mood and emotional changes for some people',
      ],
    },
    {
      key: '6mo',
      label: '~6 months',
      monthOffset: 6,
      changes: [
        'Fat gradually redistributing toward hips and thighs',
        'Early breast tissue development for some people',
        'Continued reduction in muscle mass',
      ],
    },
    {
      key: '1yr',
      label: '~1 year',
      monthOffset: 12,
      changes: [
        'More noticeable fat redistribution',
        'Breast development continuing (varies widely by person)',
        'Body hair growth slowing for some people',
      ],
    },
    {
      key: '2yr',
      label: '2+ years',
      monthOffset: 24,
      changes: [
        'Most fat redistribution changes have typically settled',
        'Breast development usually reaching its individual plateau',
        'Ongoing changes are usually gradual and minor from this point',
      ],
    },
  ],
  masculinizing: [
    {
      key: 'baseline',
      label: 'Baseline',
      monthOffset: 0,
      changes: ['Starting point before hormone therapy begins.'],
    },
    {
      key: '3mo',
      label: '~3 months',
      monthOffset: 3,
      changes: [
        'Skin often becoming oilier',
        'Voice may begin to feel different before pitch changes are noticeable',
        'Some increase in muscle strength',
      ],
    },
    {
      key: '6mo',
      label: '~6 months',
      monthOffset: 6,
      changes: [
        'Voice deepening for many people',
        'Facial/body hair growth beginning or increasing',
        'Fat gradually redistributing away from hips',
      ],
    },
    {
      key: '1yr',
      label: '~1 year',
      monthOffset: 12,
      changes: [
        'More noticeable muscle mass increase',
        'Facial hair growth continuing (varies widely by person)',
        'Voice changes usually stabilizing',
      ],
    },
    {
      key: '2yr',
      label: '2+ years',
      monthOffset: 24,
      changes: [
        'Most fat redistribution changes have typically settled',
        'Facial/body hair growth usually reaching its individual plateau',
        'Ongoing changes are usually gradual and minor from this point',
      ],
    },
  ],
};

export const DISCLAIMER =
  'This is general educational information, not a personal prediction. Timelines and outcomes vary a lot from person to person. Talk to your care team about what to expect for you.';
