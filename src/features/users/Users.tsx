import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectUsers, fetchUsersData, fetchUsersDataFromGrqphQL } from './usersSlice';
import { selectTodos, fetchTodos } from './todosSlice';
import { todosUrl, usersUrl } from '../../consts/index';

const Users: FC<{}> = () => {
  const usersData = useSelector(selectUsers);
  const todosData = useSelector(selectTodos);
  const dispatch = useDispatch();

  const GET_USERS = `
    {
      users {
        name
        email
        address {
          suite
        }
        company {
          name
          description
        }
      }
    }
  `;

  useEffect(() => {
    // dispatch(fetchUsersData(usersUrl));
    dispatch(fetchUsersDataFromGrqphQL('http://localhost:4000/', GET_USERS));
  }, [dispatch]);

  const onGetTodos = (): void => {
    dispatch(fetchTodos(todosUrl));
  };

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {usersData && usersData.map((user: any) => (<li key={user.id}>{user.name}</li>))}
      </ul>
      <button onClick={onGetTodos}>Get todos</button>
      <ul>
        {todosData && todosData.map((todo: any) => (<li key={todo.id}>{todo.title}</li>))}
      </ul>
    </div>
  );
};

export default Users;
