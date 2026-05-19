import { cn } from '../../lib/classname.ts';

type CategoryFilterButtonProps = {
  category: string;
  selected: boolean;
  onClick: () => void;
};

export function CategoryFilterButton(props: CategoryFilterButtonProps) {
  const { category, selected, onClick } = props;

  return (
    <button
      className={cn(
        'w-full mb-1 text-left sm:text-right px-4 py-2 rounded-xl text-sm transition-all duration-300 font-medium',
        {
          'bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]': selected,
          'text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent': !selected,
        },
      )}
      type="button"
      onClick={onClick}
    >
      {category}
    </button>
  );
}
