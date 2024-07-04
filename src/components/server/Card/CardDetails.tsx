export type CardDetailsProps = {
  cardDetails: string;
};
export const CardDetails = ({ cardDetails }: CardDetailsProps) => {
  return (
    <div>
      <h1>{cardDetails}</h1>
    </div>
  );
};
