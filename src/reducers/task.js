export const taskReducer = (lists, action) => {
  switch (action.type) {
    case "CREATE_TASK": {
      const task = {
        id: action.payload.id,
        title: action.payload.title,
        listId: action.payload.listId,
        boardId: action.payload.boardId,
      };
      return [...lists, task];
    }
    case "REMOVE_TASK": {
      return lists.filter((item) => item.id !== action.payload);
    }
    case "UPDATE_TASK": {
      return lists.map((item) => {
        if (item.id !== action.payload.id) {
          item.title = action.payload.title;
        }
        return item;
      });
    }
    case "CHANGE_LIST_ID_OF_A_TASK": {
      return lists.map((item) => {
        if (item.id === item.payload.id) {
          item.listId = item.payload.listId;
        }
        return item;
      });
    }
    case "CHANGE_BOARD_ID_OF_A_TASK": {
      return lists.map((item) => {
        if (item.id === item.payload.id) {
          item.boardId = item.payload.boardId;
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
 * tasks =[
 * {
 *
 * id:'1',
 * title:'task-1',
 * listId: 'list-1',
 * boardId: 'board-1',
 *
 *
 * }
 *
 *
 * ]
 *
 *
 */
