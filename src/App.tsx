/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoad, setIsLoad] = useState(false);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [selectFilter, setSelectFilter] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    getTodos().then(allTodos => {
      setTodos(allTodos);
      setIsLoad(true);
    });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectFilter={selectFilter}
                onSelectFilter={setSelectFilter}
                searchFilter={searchFilter}
                onSearchFilter={setSearchFilter}
              />
            </div>

            <div className="block">
              {!isLoad && <Loader />}
              {todos.length > 0
                && (
                  <TodoList
                    todos={todos}
                    onSetTodo={setTodo}
                    selectFilter={selectFilter}
                    searchFilter={searchFilter}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {todo && <TodoModal todo={todo} onSetTodo={setTodo} />}
    </>
  );
};
