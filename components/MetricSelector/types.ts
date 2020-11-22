import { TunableMetrics, MetricAttributes } from '../../redux/recommendations/types';

export interface SliderResults {
  max: number;
  min: number;
}

export interface AttributeInfo {
  title: string;
  id: TunableMetrics;
  description: string;
  icon: React.FC;
  isActivatedPayload: MetricAttributes;
  resultsTransformer: (arg0: SliderResults) => SliderResults;
}

export type AllAttributes = {
  [key in TunableMetrics]: AttributeInfo;
};
