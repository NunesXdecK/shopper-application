export const LoadingScale = () => {
  return (
    <div className="relative">
      <span className="flex absolute h-6 w-6 top-0 right-0 -mt-1 -mr-1">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-6 w-6 bg-sky-500"></span>
      </span>
    </div>
  );
};
