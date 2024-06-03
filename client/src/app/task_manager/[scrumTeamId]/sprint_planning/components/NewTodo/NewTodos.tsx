"use client"

import { TaskType } from "@/common_mockups/todos"
import { List } from "@mui/material"
import React, { useState } from "react";
import ProductBacklogItem from "../AddFromProduct/ProductBacklogItem";
import NewTodoItem from "./NewTodoItem";

interface Props {
    tasks: TaskType[],
    onTodoEdit: (updatedTask:TaskType) => void,
    onTodo2Backlog: (task:TaskType) => void
}

export default function NewTodos({tasks, onTodoEdit, onTodo2Backlog}:Props) {

    const handleTaskEdit = (updatedTask: TaskType, originTask: TaskType) => {
        // 기존 task 수정
        onTodoEdit(updatedTask);
    }

    const handleTodo2Backlog = (task: TaskType) => {
        onTodo2Backlog(task);
    }

    return (
        <List sx={{width: '100%'}}>
            {tasks.map((task, index) => (
                <NewTodoItem 
                    key={index} task={task}
                    onTaskChange={(updatedTask: TaskType) => handleTaskEdit(updatedTask, task)}
                    onMove2Backlog={(data: TaskType) => handleTodo2Backlog(data)}
                />
            ))}
        </List>
        
    )
}