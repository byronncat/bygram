import clsx from 'clsx';

export default function Divider() {
  return (
    <div
      className={clsx(
        'py-3 my-3 flex items-center text-xs text-gray-500 uppercase',
        'before:flex-1 before:border-t before:me-6 after:flex-1 after:border-t after:ms-6',
        'before:border-gray-600 after:border-gray-600',
      )}
    >
      Or
    </div>
  );
}
