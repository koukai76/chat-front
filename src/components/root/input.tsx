import { useFormContext } from 'react-hook-form';

export const InputText = () => {
  const { register } = useFormContext();

  return (
    <div className="form-group">
      <input
        type="text"
        className="form-control"
        placeholder="ニックネーム"
        name="name"
        maxLength={15}
        required
        ref={register({
          required: true,
          maxLength: 15,
        })}
      />
    </div>
  );
};
