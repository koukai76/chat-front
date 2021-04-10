export const CreateRoomButton = (params: { id: string }) => {
  return (
    <button
      type="button"
      className="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target={`#${params.id}`}
    >
      部屋作成
    </button>
  );
};
