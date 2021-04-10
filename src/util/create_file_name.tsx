export const create_file_name = () => {
  const _s = 'abcdefghijklmnopqrstuvwxyz0123456789';

  return (
    [...Array(10)]
      .map(() => _s[Math.floor(Math.random() * _s.length)])
      .join('') + new Date().getTime()
  );
};
