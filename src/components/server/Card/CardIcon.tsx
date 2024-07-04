import Image from 'next/image';

export type CardIconProps = {
  imageSrc: string;
  imageAlt: string;
};

export const CardIcon = ({ imageSrc, imageAlt }: CardIconProps) => {
  return (
    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-d-violet">
      <div className="h-10 w-10">
        <Image src={imageSrc} width={120} height={50} alt={imageAlt} />
      </div>
    </div>
  );
};
