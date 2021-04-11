/* eslint-disable @typescript-eslint/no-unused-vars */

import clsx from 'clsx';
import React, { FC } from 'react';
import { X } from 'react-bootstrap-icons';
import styles from './tag.module.scss';
import TagControl from '../tag-control';

/* eslint-enable @typescript-eslint/no-unused-vars */

export type TagProps = {
  classes?: {
    tagRoot?: string;
    tagLabel?: string;
    tagRemoveBtn?: string;
  };
  data?: ReactTemplateCreatorOptionType;
  onClick?: (data: ReactTemplateCreatorOptionType) => void;
};

const Tag: FC<TagProps> = (props: TagProps) => {
  const { classes, data, onClick } = props;

  const handleClick = (): void => {
    try {
      onClick(data);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <div className={clsx(styles.tagRoot, classes?.tagRoot)}>
      <div className={styles.tagLabel}>{data.label}</div>
      {data.children && <TagControl data={data.children} />}
      <div className={styles.tagRemoveBtn} onClick={handleClick}>
        <X />
      </div>
    </div>
  );
};

export default React.memo(Tag);
