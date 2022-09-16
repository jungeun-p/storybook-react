import TaskList from "./TaskList";
import * as TaskStories from './Task.stories';
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import store from "../lib/store";

export const MockedState = {
  tasks: [
    { ...TaskStories.Default.args.task, id: '1', title: 'Task 1' },
    { ...TaskStories.Default.args.task, id: '2', title: 'Task 2' },
    { ...TaskStories.Default.args.task, id: '3', title: 'Task 3' },
    { ...TaskStories.Default.args.task, id: '4', title: 'Task 4' },
    { ...TaskStories.Default.args.task, id: '5', title: 'Task 5' },
    { ...TaskStories.Default.args.task, id: '6', title: 'Task 6' },
  ],
}

// store 데이터 
const Mockstore = ({ taskboxState, children }) => (
  <Provider
  store={configureStore({
    reducer: {
      taskbox: createSlice({
        name: 'taskbox',
        initialState: taskboxState,
        reducers: {
          updateTaskState: (state, action) => {
            const { id, newTaskState } = action.payload;
            const task = state.tasks.findIndex((task) => task.id === id);
            if( task >= 0){
              state.tasks[task].state = newTaskState;
            }
          }
        }
      }).reducer,
    },
  })}
  >
    {children}
  </Provider>
)

export default {
  component: TaskList,
  title: 'TaskList',
  decorators: [story => <div style={{ padding: '6rem' }}>{story()}</div>],
  excludeStories: /.*MockedState$/,
};

const Template = args => <TaskList {...args} />;

export const Default = Template.bind({});
Default.decorators = [
  (story) => <Mockstore taskboxState={MockedState}>{story()}</Mockstore>
]
// Default.args = {
//   status: 'idle',
//   error: null,
// };


export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.decorators = [
  (story) => {
    const pinnedtasks = [
      ...MockedState.tasks.slice(0, 5),
      { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
    ];

    return (
      <Mockstore
        taskboxState={{
          ...MockedState,
          tasks: pinnedtasks,
        }}
      >
        {story()}
      </Mockstore>
    );
  },
];
// WithPinnedTasks.args = {
//   tasks: [
//     ...Default.args.tasks.slice(0, 5),
//     { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
//   ],
// };


export const Loading = Template.bind({});
Loading.decorators = [
  (story) => (
    <Mockstore
      taskboxState={{
        ...MockedState,
        status: 'loading',
      }}
    >
      {story()}
    </Mockstore>
  ),
];

// Loading.args = {
//   tasks: [],
//   loading: true,
// };


export const Empty = Template.bind({});
Empty.decorators = [
  (story) => (
    <Mockstore
      taskboxState={{
        ...MockedState,
        tasks: [],
      }}
    >
      {story()}
    </Mockstore>
  ),
];
// Empty.args = {
//   ...Loading.args,
//   loading: false,
// };