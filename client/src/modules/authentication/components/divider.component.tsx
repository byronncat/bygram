import clsx from 'clsx';

const Divider = () => {
  return (
    <div
      className={clsx(
        'mt-5 mb-3',
        'flex items-center',
        'text-xs uppercase',
        'text-on-background/[0.87] dark:text-dark-on-background/[0.4]',
        'before:flex-1 before:border-t before:me-6 after:flex-1 after:border-t after:ms-6',
        'before:text-on-background after:text-on-background',
        'dark:before:border-dark-on-background/[0.12] dark:after:border-dark-on-background/[0.12]',
      )}
    >
      Or
    </div>
  );
};

export default Divider;
