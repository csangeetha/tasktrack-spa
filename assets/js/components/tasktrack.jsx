import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import Nav from './nav';
import TaskFeed from './taskFeed';
import UserFeed from './userFeed';
import CreateTask from './create-task';
import UpdateTask from './update-task';

export default function tasktrack_init(store){
  ReactDOM.render(
    <Provider store={store}>
      <Tasktrack />
    </Provider>,
    document.getElementById('root')
  );
}

let Tasktrack= connect((state) => state)((props) =>{
  return <Router>
    <div>
      <Nav />
      <Route path="/" exact={true} render={() =>
          <div className="col">
            <CreateTask  users={props.users} />
            <TaskFeed tasks={props.tasks} />
          </div>
        }/>
        <Route path="/users" exact={true} render={() =>
            <div className="col">
              <UserFeed users={props.users} />
            </div>
          }/>
          <Route path="/users/:user_id" render={({match}) =>
            <TaskFeed tasks={_.filter(props.tasks, (taskVar) =>{
                if(taskVar.assigned_to){
                  return match.params.user_id == taskVar.assigned_to.id
                }
                else {
                  return false;
                }})} />
              } />
              <Route path="/update/:task_id" render={({match}) =>
                <UpdateTask users={props.users} taskId={match.params.task_id} task={_.filter(props.tasks, (taskVar) =>{
                    if(taskVar.id){
                      return match.params.task_id == taskVar.id
                    }
                    else {
                      return false;
                    }})} />
                }/>
              </div>
            </Router>;
          })
