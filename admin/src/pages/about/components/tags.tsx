import React, { useState, useEffect } from 'react';
import { Tag, Input, Message } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';

const Tags = (props) => {
  const [tags, setTags] = useState(props.value || []);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setTags(props.value);
  }, [props.value])

  function addTag() {
    if (inputValue) {
      tags.push(inputValue);
      setTags(tags);
      setInputValue('');
      props.onChange && props.onChange(tags);
    }
    setShowInput(false);

  }

  function removeTag(removeTag) {
    const newTags = tags.filter((tag) => tag !== removeTag);
    setTags(newTags);
    props.onChange && props.onChange(newTags);
  }

  const handleAdd = () => {
    if (tags && tags.length !== 0) {
      if (props.max && tags.length < props.max) {
        setShowInput(true)
      } else {
        Message.info(`标签个数不能超过${props.max}个`)
      }
    } else {
      setShowInput(true)
    }


  }

  return (
    <div>
      {tags?.map((tag, index) => {
        return (
          <Tag
            key={index}
            closable={true}
            onClose={() => removeTag(tag)}
            style={{ marginRight: 24 }}
          >
            {tag}
          </Tag>
        );
      })}
      {showInput ? (
        <Input
          autoFocus
          size='mini'
          value={inputValue}
          style={{ width: 84 }}
          onPressEnter={addTag}
          onBlur={addTag}
          onChange={setInputValue}
        />
      ) : (
        <Tag
          icon={<IconPlus />}
          style={{
            backgroundColor: 'var(--color-fill-2)',
            border: '1px dashed var(--color-fill-3)',
            cursor: 'pointer',
          }}
          onClick={handleAdd}
        >
          添加
        </Tag>
      )}
    </div>
  );
}

export default Tags;

