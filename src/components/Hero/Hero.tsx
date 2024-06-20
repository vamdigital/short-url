import Image from 'next/image';
import { Button } from '../ui/button';
export const Hero = () => {
  return (
    <div className="relative flex w-full bg-white pb-20 pt-10 lg:pt-20 max-mobile:flex-col">
      <div className="flex items-center max-mobile:flex-col">
        <div className="mt-5 flex flex-col lg:mt-20 lg:w-[80%] max-mobile:order-2 max-mobile:px-3">
          <div className="lg:max-w-[500px]">
            <h1 className="text-4xl font-bold text-v-d-blue lg:w-[500px] lg:text-6xl lg:leading-[80px] max-mobile:text-center">
              More than just shorter links
            </h1>
            <p className="my-4 max-w-[500px] text-lg text-l-gray lg:text-xl max-mobile:mx-auto max-mobile:text-center">
              Build your brand&apos; recognition and get detailed insights on
              how your links are performing.
            </p>
            <div className="mt-5 flex max-mobile:w-full max-mobile:justify-center">
              <Button className="rounded-3xl bg-cyan px-6 py-5">
                Get Started
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:min-w-[500px] max-mobile:order-1 max-mobile:px-5">
          <Image
            src="/illustration-working.svg"
            width={1000}
            height={1000}
            priority={true}
            alt="Boost your links"
          />
        </div>
      </div>
    </div>
  );
};
