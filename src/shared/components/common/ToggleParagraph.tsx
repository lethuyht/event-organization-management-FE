import { useState } from 'react';

interface Props {
  description?: string;
  row: number;
  rowSize?: number;
  className?: string;
}

export default function ToggleParagraph({
  description,
  row,
  rowSize = 60,
  className,
}: Props) {
  const [ellipsis, setEllipsis] = useState(true);
  const totalCharacters = row * rowSize;

  return (
    <div className={className}>
      {description && description?.length > totalCharacters ? (
        <p>
          {ellipsis ? description?.substring(0, totalCharacters) : description}
          <a className="primary" onClick={() => setEllipsis(!ellipsis)}>
            {ellipsis ? 'Xem thêm' : 'Ẩn bớt'}
          </a>
        </p>
      ) : (
        <p>{description}</p>
      )}
    </div>
  );
}
