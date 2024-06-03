"use client"

import { TaskType, product_backlogs } from "@/common_mockups/todos"
import { List } from "@mui/material"
import React, { useState } from "react";
import ProductBacklogItem from "./ProductBacklogItem";
import ProductBacklogAddItem from "./ProductBacklogAddItem";

interface Props {
    tasks: TaskType[],
    onBacklogAdd: (newTask:TaskType) => void,
    onBacklog2Todo: (task:TaskType) => void
}

export default function AddFromProductBacklog({tasks, onBacklogAdd, onBacklog2Todo}:Props) {

    const handleTaskAdd = (newTask: TaskType) => {
        // 새로운 task 추가
        onBacklogAdd(newTask);
    }

    const handleTask2Todo = (updatedTask: TaskType) => {
        // backlog에서 todo로 이동
        // updatedTask: responsibleParites를 포함하는 task
        onBacklog2Todo(updatedTask);
    }

    /*
     * TODO: related schedule별로 그룹화해서 정렬
     */
    return (
        <List sx={{width: '100%'}}>
            {tasks.map((task, index) => (
                <ProductBacklogItem 
                    key={index} task={task}
                    onTaskChange={(updatedTask: TaskType) => handleTask2Todo(updatedTask)}
                />
            ))}
            <ProductBacklogAddItem onTaskAdd={(newTask: TaskType) => handleTaskAdd(newTask)} />
        </List>
        
    )
}