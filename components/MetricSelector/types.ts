import { TunableMetrics, MetricAttributes } from '../../redux/recommendations/types';

export interface AttributeInfo {
  title: string;
  id: TunableMetrics;
  description: string;
  icon: React.FC<{}>;
  isActivatedPayload: MetricAttributes;
}

export type AllAttributes = {
  [key in TunableMetrics]: AttributeInfo;
};
