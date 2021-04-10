import { useRoomHooks } from 'src/hooks/room';

export const UploadImageButton = () => {
  const { upload_image } = useRoomHooks();

  return (
    <label>
      <span className="btn btn-info">
        画像アップロード
        <input
          type="file"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={e => upload_image(e)}
        />
      </span>
    </label>
  );
};
