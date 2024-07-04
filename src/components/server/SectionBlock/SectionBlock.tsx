type Props = {
  title: string;
  subTitle: string;
  className?: string;
};
export const SectionBlock = ({ title, subTitle, className }: Props) => {
  return (
    <div className={`flex w-full items-center justify-center ${className}`}>
      <div className="container flex flex-col items-center justify-center gap-4">
        <h1 className="text-center text-4xl font-bold text-v-d-blue">
          {title}
        </h1>
        <h3 className="max-w-lg text-center text-xl text-gray-400">
          {subTitle}
        </h3>
      </div>
    </div>
  );
};
