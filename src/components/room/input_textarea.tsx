import { useFormContext } from 'react-hook-form';

export const InputTextArea = () => {
  const { register } = useFormContext();

  return (
    <textarea
      className="form-control"
      id="textarea"
      placeholder="メッセージ 150文字以内"
      rows={2}
      name="message"
      maxLength={150}
      required
      ref={register({
        required: true,
        maxLength: 150,
      })}
    ></textarea>
  );
};
