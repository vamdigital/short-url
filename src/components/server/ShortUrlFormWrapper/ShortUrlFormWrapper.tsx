export const ShortUrlFormWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`container relative top-3 z-10 mb-[-75px] flex w-full items-center justify-center rounded-xl bg-v-d-blue p-5 md:py-10 lg:px-10 max-mobile:mx-auto ${className}`}
    >
      {children}
    </div>
  );
};
