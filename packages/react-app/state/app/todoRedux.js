import {createSlice} from '@reduxjs/toolkit';

export const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: uuid(),
                text: action.payload,
            };

            state.push(todo);
        }
    }
});


export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;


