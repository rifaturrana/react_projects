export const listsReducer = (lists, action) => {
  switch (action.type) {
    case "CREATE_LIST": {
      const list = {
        id: action.payload.id,
        title: action.payload.title,
        tasks: action.payload.tasks || [],
        boardID: action.payload.boardId,
      };
      return [...lists, list];
    }
    case "REMOVE_LIST": {
      return lists.filter((item) => item.id !== action.payload);
    }
    case "UPDATE_LIST": {
      return lists.map((item) => {
        if (item.id === action.payload.id) {
          item.title = action.payload.title;
        }
        return item;
      });
    }

    case "CHANGE_BOARD_ID_OF_A_LIST": {
      return lists.map((item) => {
        if (item.id === item.payload.id) {
          item.boardId = item.payload.boardId;
        }
        return item;
      });
    }

    case "ADD_TASK_ID_TO_A_LIST": {
      return lists.map((item) => {
        if (item.id === item.payload.id) {
          item.tasks.push(item.payload.taskId);
        }
        return item;
      });
    }
    case "REMOVE_TASK_ID_OF_A_LIST": {
      return lists.map((item) => {
        if (item.id === action.payload.id) {
          item.tasks = item.tasks.filter(
            (task) => task !== action.payload.taskId
          );
        }
        return item;
      });
    }

    default: {
      return lists;
    }
  }
};

/**
 * lists=[
 * {
 * id:
 * title:
 * tasks:['task1', 'task2'],
 * boardId: 'board-1'
 * }
 *
 *
 * ]
 *
 */
