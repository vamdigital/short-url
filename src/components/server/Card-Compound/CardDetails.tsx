import { Text } from '@/components';

export type CardDetailsProps = {
  cardDetails: string;
};
export const CardDetails = ({ cardDetails }: CardDetailsProps) => {
  return (
    <div>
      <Text as="p" className="text-gray-400">
        {cardDetails}
      </Text>
    </div>
  );
};
