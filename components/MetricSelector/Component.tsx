import React from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { CombinedStateType } from '../../redux/types';

import {
  AllAttributes,
  Attribute,
  AttributeIconContainer,
  AttributeTextContainer,
  AttributeTitle,
  AttributeDescription,
} from './Styled';

import { setMetric } from '../../redux/recommendations/actions';
import { TunableMetrics, MetricAttributes } from '../../redux/recommendations/types';
import { allAttributes } from './Data';
import {
  AttributeInfo,
} from './types';

const handleClick = (
  dispatch: ReturnType<typeof useDispatch>,
  id: TunableMetrics,
  payload: MetricAttributes,
): void => {
  dispatch(setMetric({ attributes: payload, name: id }));
  Router.push('/recommend/select/metrics');
};

const Component: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const unselectedAttributes = useSelector<CombinedStateType, TunableMetrics[]>(
    (state) => {
      const keys = Object.keys(state.recommendations.metrics) as TunableMetrics[];
      return keys.filter(
        (key) => !state.recommendations.metrics[key].isActivated,
      );
    },
  );

  const unselectedAttributesAvailable = unselectedAttributes.filter(
    (key) => Object.keys(allAttributes).includes(key),
  );

  return (
    <AllAttributes>
      {
        unselectedAttributesAvailable.map((attributeKey) => {
          const attribute = allAttributes[attributeKey] as AttributeInfo;
          return (
            <Attribute
              onClick={(): void => handleClick(
                dispatch, attribute.id, attribute.isActivatedPayload,
              )}
              key={attributeKey}
            >
              <AttributeIconContainer>
                <attribute.icon />
              </AttributeIconContainer>

              <AttributeTextContainer>
                <AttributeTitle>
                  {attribute.title}
                </AttributeTitle>

                <AttributeDescription>
                  {attribute.description}
                </AttributeDescription>
              </AttributeTextContainer>
            </Attribute>
          );
        })
      }
    </AllAttributes>
  );
};

export default Component;
