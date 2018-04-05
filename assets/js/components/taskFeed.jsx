import React from 'react';

function Task(params) {
  let task=params.task;
  function updateTask(ev){
    let tgt = $(ev.target);

  }
  return   <div className="cardbody">
    <div className="row">
      <div className="col">
        <div className="card">
          <div className="card-header"> { task.title }
            <span className="col-4 offset-9">
              <button onClick={updateTask} > Edit</button>
            </span></div>
            <div className="card-body">
              <h6 className="card-title">{ task.assigned_to.name }</h6>
              <p>{ task.description }</p>
              <p>
                <span>Status:  {(() => {
                    switch (task.status) {
                      case true:   return "Completed";
                      case false: return "Pending";
                      default:      return "Pending" ;
                    }
                  })()}
                </span>
                <span className="col-3 offset-3">Time taken: { task.time_taken}</span>
                <span className="col-3 offset-3">Created by: { task.assigned_by.name}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
  export default function TaskFeed(params){
    let tasks = _.map(params.tasks , (taskVar) => <Task key={taskVar.id} task={taskVar} />);
    console.log(tasks);
    return <div>
      <p>&nbsp;</p>
      <h1>Your Feed</h1>
      { tasks }
    </div>;
  }
