export const InfotButton = (params: { id: string }) => {
  return (
    <button
      type="button"
      className="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target={`#${params.id}`}
    >
      詳細
    </button>
  );
};
