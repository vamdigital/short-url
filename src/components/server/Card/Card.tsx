import { CardTitle, type CardTitleProps } from './CardTitle';
import { CardIcon, type CardIconProps } from './CardIcon';
import { CardDetails, type CardDetailsProps } from './CardDetails';

import React, {
  Children,
  FC,
  memo,
  PropsWithChildren,
  ReactElement,
} from 'react';

export type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export type CardComposition = {
  CardTitle: FC<CardTitleProps>;
  CardIcon: FC<CardIconProps>;
  CardDetails: FC<CardDetailsProps>;
};

export const Card: FC<CardProps> & CardComposition = ({
  children,
  className,
  ...props
}) => {
  const childrenWithProps = Children.map(children, (child) => {
    const cardTitle = child as ReactElement<PropsWithChildren<CardTitleProps>>;
    const cardIcon = child as ReactElement<PropsWithChildren<CardIconProps>>;
    const cardDetails = child as ReactElement<
      PropsWithChildren<CardDetailsProps>
    >;
    if (React.isValidElement(cardTitle)) {
      return React.cloneElement(cardTitle, { ...props, ...cardTitle.props });
    }
    if (React.isValidElement(cardIcon)) {
      return React.cloneElement(cardIcon, { ...props, ...cardIcon.props });
    }
    if (React.isValidElement(cardDetails)) {
      return React.cloneElement(cardDetails, {
        ...props,
        ...cardDetails.props,
      });
    }
    return child;
  });
  return (
    <div
      className={`relative my-4 flex w-80 flex-col items-center justify-center rounded-md bg-white px-7 py-12 pt-20 md:my-8 ${className}`}
    >
      {childrenWithProps}
    </div>
  );
};

Card.CardTitle = memo(CardTitle);
Card.CardIcon = memo(CardIcon);
Card.CardDetails = memo(CardDetails);

export default memo(Card);
