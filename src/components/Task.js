import React, { useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import { images } from '../images';
import Input from './Input';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.itemBackground};
  border-radius: 10px;
  padding: 5px;
  margin: 3px 0px;
`;

const Contents = styled.Text`
  flex: 1;
  font-size: 24px;
  color: ${({ theme, checked }) => (checked ? theme.done : theme.text)};
  text-decoration-line: ${({ checked }) => (checked ? 'line-through' : 'none')};
`;

const Task = ({ item, deleteTask, toggleTask, updateTask }) => {
  const [isEditing, setIsEdting] = useState(false);
  const [text, setText] = useState(item.text);

  //수정버튼 
  const _handleUpdateButtonPress = () => {
    setIsEdting(true);
  };

  const _onSubmitEdting = () => {
    if (isEditing) {
      const editedTask = Object.assign({}, item, { text }); //text:수정된 텍스트
      // const editedTask = Object.assign(...item, text)); //text:수정된 텍스트
      
      setIsEdting(false);
      updateTask(editedTask);
    }
  };
  const _onBlur = () => {
    if (isEditing) {
      setIsEdting(false);
      setText(item.text);
    }
  };

  return isEditing ? (
    <Input
      value={text}
      placeholder={'항목을 작성바랍니다.'}
      onChangeText={(text) => setText(text)} //입력필드가 수정될때마다
      onSubmitEditing={_onSubmitEdting} //입력완료시
      onBlur={_onBlur}
    />
  ) : (
    <Container>
      {/* 완료버튼 */}
      <IconButton
        type={item.checked ? images.checked : images.unchecked}
        id={item.id}
        onPressOut={toggleTask}
        checked={item.checked}
      />
      {/* 할일 */}
      <Contents checked={item.checked}>{item.text}</Contents>
      {/* 수정버튼 */}
      {/* 완료시 수정버튼 */}
      {item.checked || (
        <IconButton type={images.update}
                    onPressOut={_handleUpdateButtonPress}
        />
      )}
      {/* 삭제버튼 */}
      <IconButton type={images.delete}
                  id={item.id}
                  onPressOut={deleteTask}
                  checked={item.checked}
      />
    </Container>
  );
};

Task.protoTypes = {
  item: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
};

export default Task;
