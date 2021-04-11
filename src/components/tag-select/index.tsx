/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { FC, useState } from 'react';
import Select, { ValueType } from 'react-select';
import { Props } from 'react-select';
import styles from './tag-select.module.scss';

/* eslint-enable @typescript-eslint/no-unused-vars */

export type TagSelectProps = {
  classes?: any;
  placeholder?: ReactTemplateCreatorChildrenType['placeholder'];
  options: ValueType<ReactTemplateCreatorOptionType, false>[];
  onChange: Props['onChange'];
};

const TagSelect: FC<TagSelectProps> = (props: TagSelectProps) => {
  const { onChange, options, placeholder } = props;

  return (
    <div className={styles.tagSelectRoot}>
      <Select
        components={{
          IndicatorSeparator: null,
        }}
        classNamePrefix='tagSelect'
        className='tagSelect_container'
        menuPortalTarget={document.body}
        options={options}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TagSelect;
