import React from 'react';
import ReactSelect from 'react-select';
import cx from 'classnames';

import styles from './Select.module.css';

const Select = ({
  placeholder,
  value,
  onChange,
  options,
  isSearchable,
  size,
  width,
  height,
  backgroundColor,
  id,
}) => {
  return (
    <div className={cx(styles.box, { [styles[`box__${size}`]]: size })}>
      <ReactSelect
        className={styles['box--select']}
        id={id}
        placeholder={placeholder}
        options={options}
        value={value}
        onChange={onChange}
        isSearchable={isSearchable}
        noOptionsMessage={() => 'Brak wyników'}
        classNamePrefix={'box--select'}
        styles={{
          control: (base, state) => {
            return {
              ...base,
              transition: 'all .1s ease-in',
              borderWidth: '1px',
              borderRadius: '10px',
              width: width ?? 'auto',
              height: height ?? 'auto',
              paddingLeft: '1em',
            };
          },
          option: (base, state) => {
            return {
              ...base,
              fontWeight: '500',
              color: state.isSelected ? '#222131' : '#fff',
            };
          },
          noOptionsMessage: (base, state) => {
            return {
              ...base,
              color: '#fff',
            };
          },
        }}
        theme={(theme) => ({
          ...theme,

          colors: {
            ...theme.colors,
            primary: '#8176ff', //active-option and active-border
            primary75: 'red',
            primary50: '#302aff', //option--pressed
            primary25: '#4742fd', //current-select
            danger: 'orange',
            // dangerLight: 'orange',
            neutral0: `${backgroundColor ?? '#39394b'}`, //background-color
            neutral5: 'blue',
            neutral10: 'yellow',
            neutral20: 'transparent', //inactive-border
            neutral30: '#4742fd', //border-hover-color
            neutral40: '#4742fd', //icon-inactive-hover-color
            neutral50: '#fff', //placeholder
            neutral60: '#605cff',
            // neutral70: 'orange',
            neutral80: '#fff', //selected option text in main and icon-active-hover-color
            // neutral90: 'yellow',
          },
          // #33315f
          // #605cff
        })}
      />
    </div>
  );
};

export default Select;
