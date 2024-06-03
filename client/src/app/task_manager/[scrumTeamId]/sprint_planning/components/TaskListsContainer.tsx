"use client"

import { Container, Typography } from "@mui/material";
import AddFromProductBacklog from "./AddFromProduct/AddFromProductBacklog";
import BordredContainer from "./BorderedContainer";
import { useState } from "react";
import { TaskType, product_backlogs } from "@/common_mockups/todos";
import NewTodos from "./NewTodo/NewTodos";

export default function TaskListsContainer() {
    const [productBacklogList, setProductBacklogList] = useState<TaskType[]>(product_backlogs);
    const [newTodoList, setNewTodoList] = useState<TaskType[]>([]);

    const handleBacklogAdd = (newTask: TaskType) => {

    }

    const handleBacklog2Todo = (task: TaskType) => {
        // productBacklogList에서 삭제
        setProductBacklogList(list => list.filter((item) => item.id !== task.id));
        // newTodoList에 추가
        setNewTodoList(list => list.concat([task]));
    }

    const handleTodoEdit = (updatedTask: TaskType) => {
        // TodoList 내에서 수정
        const taskIdx = newTodoList.findIndex(task => task.id === updatedTask.id);
        setNewTodoList(list => {
            const newList = [...list.slice(0, taskIdx), updatedTask, ...list.slice(taskIdx)];
            return newList;
        });
    }

    const handleTodo2Backlog = (task: TaskType) => {
        // newTodoList에서 삭제
        setNewTodoList(list => list.filter((item) => item.id !== task.id));

        // (추가된 정보 초기화하고) productBacklogList에서 추가
        task.responsibleParties = []
        setProductBacklogList(list => list.concat([task]));
    }

    // TODO: delete 기능 안만듦

    return (
        <Container>
            <Typography sx={{width: '100%', textAlign: 'left', paddingLeft: '10px', paddingTop: '30px'}}>Product Backlogs</Typography>
            <BordredContainer>
                <AddFromProductBacklog
                    tasks={productBacklogList}
                    onBacklogAdd={(newTask:TaskType) => handleBacklogAdd(newTask)}
                    onBacklog2Todo={(task:TaskType) => handleBacklog2Todo(task)}
                />
            </BordredContainer>
            <Typography sx={{width: '100%', textAlign: 'left', paddingLeft: '10px', paddingTop: '10px'}}>New Todos</Typography>
            <BordredContainer>
                <NewTodos
                    tasks={newTodoList}
                    onTodoEdit={(updatedTask:TaskType) => handleTodoEdit(updatedTask)}
                    onTodo2Backlog={(task:TaskType) => handleTodo2Backlog(task)}
                />
            </BordredContainer>
        </Container>
    )
}