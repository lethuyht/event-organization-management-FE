interface Props {
  content?: string | number | null;
  className?: string;
  isPrimary?: boolean;
}

function Text({ content, className, isPrimary }: Props) {
  return (
    <span
      className={`font-bold ${
        isPrimary ? 'text-primary-color' : 'text-slate-normal'
      } ${className}`}
    >
      {content}
    </span>
  );
}

export default Text;
