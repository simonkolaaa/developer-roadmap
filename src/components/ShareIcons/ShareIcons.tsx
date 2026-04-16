import { useEffect, useRef } from 'react';
import { cn } from '../../lib/classname';
import { GitHubIcon } from '../ReactIcons/GitHubIcon';

type ShareIconsProps = {
  resourceId: string;
  resourceType: string;
  pageUrl: string;
  description: string;
};

export function ShareIcons(props: ShareIconsProps) {
  const { pageUrl, description, resourceType, resourceId } = props;

  const shareIconsRef = useRef<HTMLDivElement>(null);

  const icons = [
    {
      url: 'https://github.com/simonkolaaa',
      icon: (
        <GitHubIcon
          className="size-[24px] [&>path]:fill-[#E5E5E5]"
        />
      ),
    },
  ];

  useEffect(() => {
    const shareIcons = shareIconsRef.current;
    if (!shareIcons) {
      return;
    }

    const onScroll = () => {
      if (window.scrollY < 100 || window.innerWidth < 1050) {
        shareIcons.classList.add('hidden');
        return null;
      }

      shareIcons.classList.remove('hidden');
    };

    onScroll();

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      className="absolute left-[-18px] top-[110px] hidden h-full"
      ref={shareIconsRef}
    >
      <div className="sticky top-[100px] flex flex-col items-center gap-1.5">
        {icons.map((icon, index) => {
          const host = new URL(icon.url).host;

          return (
            <a
              key={index}
              href={icon.url}
              target="_blank"
              className={cn(
                'text-gray-500 hover:text-gray-700',
                index === 0 && 'mt-0.5',
              )}
              onClick={() => {
                window.fireEvent({
                  category: 'RoadmapShareLink',
                  action: `Share Roadmap / ${resourceType} / ${resourceId} / ${host}`,
                  label: icon.url,
                });
              }}
            >
              {icon.icon}
            </a>
          );
        })}
      </div>
    </div>
  );
}
