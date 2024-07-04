import { Text } from '@/components';

export type CardTitleProps = {
  cardTitle: string;
};
export const CardTitle = ({ cardTitle }: CardTitleProps) => {
  return (
    <div className="flex">
      <Text as="h1" className="my-5 flex text-xl font-bold">
        {cardTitle}
      </Text>
    </div>
  );
};
