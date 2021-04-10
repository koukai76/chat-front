import { useFormContext } from 'react-hook-form';

const RoomName = () => {
  const { register } = useFormContext();

  return (
    <div className="form-group">
      <label>部屋名</label>
      <input
        type="text"
        name="rname"
        className="form-control"
        placeholder="部屋名"
        required
        maxLength={15}
        ref={register({
          required: true,
          maxLength: 15,
        })}
      />
    </div>
  );
};

const RoomNum = () => {
  const { register } = useFormContext();

  return (
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">上限人数</label>
      <select
        className="form-select"
        name="limit"
        ref={register({
          valueAsNumber: true,
          required: '必須項目です',
        })}
      >
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
      </select>
    </div>
  );
};

const body = () => {
  return (
    <>
      <RoomName />
      <RoomNum />
    </>
  );
};

export default body;
