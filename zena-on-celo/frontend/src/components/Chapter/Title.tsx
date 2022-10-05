export default function Title({ title }: any) {
  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-font sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h2>
      </div>
    </div>
  );
}
