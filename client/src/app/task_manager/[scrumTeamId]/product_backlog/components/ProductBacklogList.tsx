"use client"

import { TaskType, product_backlogs } from "@/common_mockups/todos"
import { List } from "@mui/material"
import React, { useState } from "react";
import ProductBacklogItem from "./ProductBacklogItem";
import ProductBacklogAddItem from "./ProductBacklogAddItem";

interface Props {}

export default function TaskList({}:Props) {
    const [tasks, setTasks] = useState<TaskType[]>(product_backlogs);

    const handleTaskChange = (updatedTask: TaskType, originTask: TaskType) => {
        // 기존 task 수정
        const taskIdx = tasks.findIndex(task => task.id === originTask.id);
        setTasks(list => {
            const newList = [...list.slice(0, taskIdx), updatedTask, ...list.slice(taskIdx)];
            return newList;
        });
    }
    const handleTaskAdd = (newTask: TaskType) => {
        // 새로운 task 추가
        setTasks(list => list.concat([newTask]))
    }

    /*
     * TODO: related schedule별로 그룹화해서 정렬
     */
    return (
        <List sx={{width: '100%'}}>
            {tasks.map((task, index) => (
                <ProductBacklogItem 
                    key={index} task={task}
                    onTaskChange={(updatedTask: TaskType) => handleTaskChange(updatedTask, task)}
                />
            ))}
            <ProductBacklogAddItem onTaskAdd={(newTask: TaskType) => handleTaskAdd(newTask)} />
        </List>
        
    )
}