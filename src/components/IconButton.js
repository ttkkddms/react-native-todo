import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { images } from '../images';

const Icon = styled.Image`
  tint-color: ${({ theme, checked }) =>checked ?theme.done : theme.text};
  width: 30px;
  height: 30px;
  margin: 10px;
`;

const IconButton = ({ type, onPressOut, id, checked }) => {
  const _onPressOut = ()=>{
    onPressOut(id);
  };

  return (
    <TouchableOpacity onPressOut={_onPressOut}>
      <Icon source={type} checked={checked}/>
    </TouchableOpacity>
  );
};

//핸들러가 넘어오지 않더라도 오류발생하지 않도록 디폴트 처리.
IconButton.defaultProps={
  onPressOut:()=>{},
};

IconButton.propTypes = {
  type: PropTypes.oneOf(Object.values(images)).isRequired,
  onPressOut: PropTypes.func,
  id:PropTypes.string,
  checked:PropTypes.bool,
};

export default IconButton;
