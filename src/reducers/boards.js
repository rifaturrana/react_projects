export const boardReducers = (boards, action) => {
  switch (action.type) {
    case "CREATE_NEW_BOARD": {
      const board = {
        id: action.payload.id,
        title: action.payload.title,
        lists: [],
        tasks: [],
      };
      return [...boards, board];
    }
    case "REMOVE_BOARD": {
      return boards.filter((item) => item.id !== action.payload.id);
    }
    case "ADD_LIST_TO_A_BOARD": {
      return boards.map((item) => {
        if (item.id === action.payload.id) {
          item.lists.push(action.payload.listId);
        }
        return item;
      });
    }
    case "ADD_TASK_TO_A_BOARD": {
      return boards.map((item) => {
        if (item.id === action.payload.id) {
          item.lists.push(action.payload.taskId);
        }
        return item;
      });
    }
    case "UPDATE_BOARD": {
      return boards.map((item) => {
        if (item.id === action.payload.id) {
          item.title = action.payload.title;
        }
        return item;
      });
    }
    case "REMOVE_LIST_ID_FROM_A_BOARD": {
      return boards.map((item) => {
        if (item.id === action.payload.id) {
          item.lists = item.lists.filter(
            (list) => list !== action.payload.listId
          );
        }
        return item;
      });
    }
    case "REMOVE_TASK_ID_FROM_A_BOARD": {
      return boards.map((item) => {
        if (item.id === action.payload.id) {
          item.tasks = item.tasks.filter(
            (task) => task !== action.payload.taskId
          );
        }
        return item;
      });
    }

    default: {
      return boards;
    }
  }
};

/**
 * boards=[
 * {
 * id:'1',
 * title,
 * lists
 * tasks
 * }
 *
 *
 * ]
 *
 */
