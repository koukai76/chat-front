import React from 'react';
import { useFormContext } from 'react-hook-form';

import Box from '@material-ui/core/Box';

import { Constant } from 'src/constant';

export const Icons = () => {
  const { register, setValue } = useFormContext();
  const [icon, setIcon] = React.useState(0);

  return (
    <>
      <input type="hidden" name="icon" ref={register({ required: true })} />
      <Box display="flex" flexWrap="wrap" p={1} m={1} css={{ maxWidth: 300 }}>
        {[...Array(Constant.icon_number)].map((_, i) => {
          return (
            <Box key={i}>
              <img
                src={`/img/icon_${Constant.icons[i]}.png`}
                alt=""
                width="52"
                style={{
                  opacity: icon === i ? 1.0 : 0.3,
                }}
                onClick={() => {
                  setIcon(i);
                  setValue('icon', i);
                }}
              />
            </Box>
          );
        })}
      </Box>
    </>
  );
};
