const TodoError = ({
  error,
  refetch,
}: {
  error: Error;
  refetch: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-primary-dark">
      <button
        onClick={() => refetch()}
        className="mt-4 px-4 py-2 bg-primary text-card rounded"
      >
        reload
      </button>
      <p>{String(error)}</p>
    </div>
  );
};

export default TodoError;
