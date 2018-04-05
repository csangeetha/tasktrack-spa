import store from './store.js';

class SeverAPI {
  request_tasks(){
    $.ajax("api/v1/tasks" , {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success :(resp)=> {

        store.dispatch({
          type: 'ALL_TASKS',
          tasks: resp.data,
        });
      }
    });
  }

  request_users(){
    $.ajax("api/v1/users" , {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success :(resp)=> {
        store.dispatch({
          type: 'ALL_USERS',
          users: resp.data,
        });
      }
    });
  }

    create_task(data) {
      let dataNew = {
        assigned_to_id: data.assigned_to_id,
        assigned_by_id: data.assigned_by_id,
        title: data.title,
        description: data.description,
        time_taken: data.time_taken + ":00.000000",
        status: data.status
      }
      $.ajax("/api/v1/tasks", {
        method: "post",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify({ token: data.token, task: dataNew }),
        success: (resp) => {
          store.dispatch({
            type: 'CREATE_TASK',
            task: resp.data,
          });
        },
      });
    }

    submit_login(data) {
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });
      },
    });
  }

    create_task(data , id) {
      let dataNew = {
        assigned_to_id: data.assigned_to_id,
        assigned_by_id: data.assigned_by_id,
        title: data.title,
        description: data.description,
        time_taken: data.time_taken + ":00.000000",
        status: data.status
      }
      $.ajax("/api/v1/tasks/" + id, {
        method: "put",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify({ token: data.token, task: dataNew }),
        success: (resp) => {
          store.dispatch({
            type: 'CREATE_TASK',
            task: resp.data,
          });
        },
      });
    }
  }

    export default new SeverAPI();
