/* eslint-disable @typescript-eslint/no-unused-vars */

import { options } from '../mock/data';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { ActionMeta, ValueType } from 'react-select';
import Tag, { TagProps } from './tag';
import styles from './react-template-creator.module.scss';
import uniqid from 'uniqid';
import { OrderedMap } from 'immutable';
import clsx from 'clsx';
import { Actions, useShadowContext, useShadowContextDispatch } from '../shadow-context';
import { debounce } from 'lodash';

/* eslint-enable @typescript-eslint/no-unused-vars */

export type ReactTemplateCreatorProps = {
  classes?: any;
};

const tagClasses = {
  tagRoot: styles.tagRoot,
};

const ReactTemplateCreator: FC<ReactTemplateCreatorProps> = (props: ReactTemplateCreatorProps) => {
  const valueWrapperEl = useRef(null);

  const shadowState = useShadowContext();
  const dispatch = useShadowContextDispatch();

  const [state, setState] = useState({
    options: options,
    values: OrderedMap(),
    hasShadowRight: false,
    shadowRightPosition: 0,
  });

  useEffect(() => {
    dispatch({
      type: Actions.setWrapperEl,
      payload: { el: valueWrapperEl.current },
    });
  }, [valueWrapperEl.current]);

  useEffect(() => {
    const currentWrapperEl = valueWrapperEl.current;

    if (currentWrapperEl.scrollWidth > currentWrapperEl.clientWidth) {
      dispatch({
        type: Actions.setShadowRight,
      });
    } else {
      dispatch({
        type: Actions.removeShadowRight,
      });
    }
  }, [state.values]);

  const handleChange = (
    values: ValueType<ReactTemplateCreatorOptionType, true>,
    action: ActionMeta<ReactTemplateCreatorOptionType> & {
      option: ReactTemplateCreatorOptionType;
    },
  ): void => {
    if (action.action === 'create-option') {
      action.option.value = 'text';
    }
    const uniqId = uniqid('', action.option.value);
    const value = {
      ...action.option,
      meta: {
        uniqId,
      },
    };
    if (['select-option', 'deselect-option'].includes(action.action)) {
      setState({
        ...state,
        values: state.values.set(uniqId, value),
      });
    }

    if (action.action === 'create-option') {
      setState({
        ...state,
        options: [...state.options, value],
        values: state.values.set(uniqId, value),
      });
    }
  };

  const removeValue: TagProps['onClick'] = useMemo(
    () => data => {
      setState({
        ...state,
        values: state.values.delete(data.meta.uniqId),
      });
    },
    [state.values],
  );

  const handleScroll = (e: React.MouseEvent<HTMLDivElement>): void => {
    dispatch({
      type: Actions.setShadowRightPosition,
      payload: {
        shadowRightPosition: -e.currentTarget.scrollLeft,
      },
    });
  };

  return (
    <div className={styles.root}>
      <CreatableSelect
        className='react-template-creator'
        classNamePrefix='rtc'
        controlShouldRenderValue={false}
        hideSelectedOptions={false}
        menuPortalTarget={document.body}
        onChange={handleChange}
        options={state.options}
        isMulti
        value={[]}
      />
      <div ref={valueWrapperEl} className={styles.valueWrapper} onScroll={handleScroll}>
        {shadowState.hasShadowRight && <div className={styles.shadow} style={{ right: shadowState.shadowRightPosition }}></div>}
        <div className={clsx(styles.valueContainer, state.values.size && styles.valueContainerHasValue)}>
          {Array.from(state.values, ([name, value]: [string, ReactTemplateCreatorOptionType]) => (
            <Tag classes={tagClasses} key={value.meta.uniqId} data={value} onClick={removeValue} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReactTemplateCreator;
