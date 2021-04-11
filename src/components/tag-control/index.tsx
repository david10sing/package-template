/* eslint-disable @typescript-eslint/no-unused-vars */

import TagSelect from '../tag-select';
import React, { FC, useState } from 'react';
import { Actions, useShadowContext, useShadowContextDispatch } from '../../shadow-context';

/* eslint-enable @typescript-eslint/no-unused-vars */

type TagControlProps = {
  data: ReactTemplateCreatorOptionType['children'];
};

const TagControl: FC<TagControlProps> = (props: TagControlProps) => {
  const { data } = props;

  const shadowContext = useShadowContext();
  const shadowContextDispatch = useShadowContextDispatch();

  const [value, setValue] = useState(null);

  const handleChange = (value: ReactTemplateCreatorOptionType): void => {
    const currentWrapperEl = shadowContext.wrapperEl;
    if (currentWrapperEl.scrollWidth > currentWrapperEl.clientWidth) {
      shadowContextDispatch({
        type: Actions.setShadowRight,
      });
    } else {
      shadowContextDispatch({
        type: Actions.removeShadowRight,
      });
    }
    setValue(value);
  };

  return (
    <>
      {data.length &&
        data.map((control, index) => {
          switch (control.type) {
            case 'select':
              return (
                <TagSelect
                  key={`${control.type}-${index}`}
                  placeholder={control.placeholder}
                  options={control.options}
                  onChange={handleChange}
                />
              );
            case 'input':
              return <input key={`${control.type}-${index}`} />;
          }
        })}
      {value?.children && <TagControl data={value.children} />}
    </>
  );
};

export default TagControl;
