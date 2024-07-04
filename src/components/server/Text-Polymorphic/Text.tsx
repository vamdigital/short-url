export type TextOwnProps<E extends React.ElementType> = {
  children: React.ReactNode;
  as?: E;
  className?: string;
};

export type TextProps<E extends React.ElementType> = TextOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof TextOwnProps<E>>;
export const Text = <E extends React.ElementType = 'p'>({
  children,
  as,
  className,
}: TextProps<E>) => {
  const Component = as || 'p';
  return <Component className={className}>{children}</Component>;
};
