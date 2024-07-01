'use client';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';

type Props = {
  originalUrl: string;
  shortenedUrl: string;
};
export const UrlListItem = ({ shortenedUrl, originalUrl }: Props) => {
  const [copyBtnText, setCopyText] = useState(false);
  const copyToClipBoardHandler = useCallback(() => {
    navigator.clipboard.writeText(shortenedUrl).then(() => {
      setCopyText(true);
      console.log({ shortenedUrl });
    });
  }, [shortenedUrl]);

  const buttonColorCn = copyBtnText ? 'bg-d-violet' : 'bg-cyan';
  return (
    <div className="my-3 flex w-full">
      <div className="container mx-auto items-center justify-between rounded-md bg-white p-3 md:flex max-mobile:flex-col">
        <div className="flex md:flex-col max-mobile:border-b-2 max-mobile:border-gray-200 max-mobile:py-3">
          <p className="text-gray-600">{originalUrl}</p>
        </div>
        <div className="items-center justify-center gap-4 md:flex max-mobile:w-full max-mobile:flex-col">
          <p className="flex text-cyan md:flex-col max-mobile:py-3">
            {shortenedUrl}
          </p>
          <Button
            className={`flex-col items-center justify-center max-mobile:w-full ${buttonColorCn}`}
            onClick={copyToClipBoardHandler}
            type="button"
          >
            {copyBtnText ? 'copied' : 'copy'}
          </Button>
        </div>
      </div>
    </div>
  );
};
