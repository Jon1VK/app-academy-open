import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  receiveErrors,
  selectAllErrors,
} from '../../slices/errorsSlice';

import todosSlice, { createTodo } from '../../slices/todosSlice';

export const TodoForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tagName, setTagName] = useState('');
  const [tagNames, setTagNames] = useState([]);

  const onTitleChange = (e) => setTitle(e.target.value);
  const onBodyChange = (e) => setBody(e.target.value);
  const onTagNameChange = (e) => setTagName(e.target.value);

  const onAddTagClick = (e) => {
    setTagNames((tagNames) => {
      if (tagNames.includes(tagName)) {
        return tagNames;
      } else {
        return [...tagNames, tagName];
      }
    });
    setTagName('');
  };

  const onRemoveTagClick = (e) => {
    const tagNameToRemove = e.target.dataset.tagName;
    setTagNames((tagNames) =>
      tagNames.filter((tagName) => tagName !== tagNameToRemove)
    );
  };

  const dispatch = useDispatch();

  const onCreateTodoClick = async (e) => {
    try {
      e.preventDefault();
      await dispatch(createTodo({ title, body, tag_names: tagNames })).unwrap();
      dispatch(clearErrors());
      setTitle('');
      setBody('');
      setTagName('');
      setTagNames([]);
    } catch (errors) {
      dispatch(receiveErrors(errors));
    }
  };

  const errors = useSelector(selectAllErrors);
  const renderedErrors = errors.map((error) => <li key={error}>{error}</li>);

  return (
    <section>
      <h2>New Todo</h2>
      {errors.length > 0 && <ul>{renderedErrors}</ul>}
      <form>
        <label htmlFor="todoTitle">Todo Title:</label>
        <input
          type="text"
          id="todoTitle"
          name="todoTitle"
          placeholder="What needs to be done?"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="todoBody">Body:</label>
        <textarea
          id="todoBody"
          name="todoBody"
          value={body}
          onChange={onBodyChange}
        />
        <label htmlFor="todoTags">Tags:</label>
        <input
          type="text"
          id="todoTags"
          name="todoTags"
          placeholder="Input a tag"
          value={tagName}
          onChange={onTagNameChange}
        />
        <button type="button" onClick={onAddTagClick}>
          Add a tag
        </button>
        <ul>
          {tagNames.map((tagName) => (
            <li key={tagName}>
              {tagName}
              <button
                onClick={onRemoveTagClick}
                data-tag-name={tagName}
                type="button"
              >
                Remove tag
              </button>
            </li>
          ))}
        </ul>
        <button onClick={onCreateTodoClick}>Create Todo</button>
      </form>
    </section>
  );
};
