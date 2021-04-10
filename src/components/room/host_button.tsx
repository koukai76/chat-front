export const HostButton = (params: { id: string }) => {
  return (
    <button
      type="button"
      className="btn btn-success"
      data-bs-toggle="modal"
      data-bs-target={`#${params.id}`}
      style={{ marginLeft: 5 }}
    >
      ホスト権限
    </button>
  );
};
