export type CardTitleProps = {
  cardTitle: string;
};
export const CardTitle = ({ cardTitle }: CardTitleProps) => {
  return (
    <div>
      <h1>{cardTitle}</h1>
    </div>
  );
};
