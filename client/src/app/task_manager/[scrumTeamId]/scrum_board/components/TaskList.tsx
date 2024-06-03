import { Status, TaskType, done_list, inprogress_list, onreview_list, todo_list } from "@/common_mockups/todos"
import { List } from "@mui/material"
import React, { useEffect, useState } from "react";
import ExpandableListItem from "./ExpandableListItem";

interface Props {
    selectedTab: number
}

export default function TaskList({ selectedTab }:Props) {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [todoList, setTodoList] = useState<TaskType[]>(todo_list);
    const [inprogressList, setInprogressList] = useState<TaskType[]>(inprogress_list);
    const [onreviewList, setOnreviewList] = useState<TaskType[]>(onreview_list);
    const [doneList, setDoneList] = useState<TaskType[]>(done_list);

    useEffect(() => {
        setExpandedIndex(null);
        switch (selectedTab) {
            case 1:
                setTasks(inprogressList);
                break;
            case 2:
                setTasks(onreviewList);
                break;
            case 3:
                setTasks(doneList);
                break;
            default:
                setTasks(todoList);
                break;
        }
    }, [selectedTab, inprogressList, onreviewList, doneList, todoList]);

    const handleToggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const handleTaskChange = (updatedTask: TaskType, originTask: TaskType) => {
        // 기존 리스트에서 originTask의 id에 해당하는 요소 삭제
        let taskIdx: number = -1;
        switch (originTask.status) {
            case Status.TODO:
                taskIdx = todoList.findIndex(task => task.id === originTask.id);
                setTodoList(list => list.filter(task => task.id !== originTask.id));
                break;
            case Status.INPROGRESS:
                taskIdx = inprogressList.findIndex(task => task.id === originTask.id);
                setInprogressList(list => list.filter(task => task.id !== originTask.id));
                break;
            case Status.ONREVIEW:
                taskIdx = onreviewList.findIndex(task => task.id === originTask.id);
                setOnreviewList(list => list.filter(task => task.id !== originTask.id));
                break;
            case Status.DONE:
                taskIdx = doneList.findIndex(task => task.id === originTask.id);
                setDoneList(list => list.filter(task => task.id !== originTask.id));
                break;
            default:
                console.log("Wrong task edit: ", originTask, " to ", updatedTask);
        }
        // 새로운 리스트에 추가
        switch (updatedTask.status) {
            case Status.TODO:
                if (originTask.status === updatedTask.status && taskIdx >= 0) {
                    setTodoList(list => {
                        const newList = [...list.slice(0, taskIdx), updatedTask, ...list.slice(taskIdx)];
                        return newList;
                    });
                } else {
                    setTodoList(list => [...list, updatedTask]);
                }
                break;
            case Status.INPROGRESS:
                if (originTask.status === updatedTask.status && taskIdx >= 0) {
                    setInprogressList(list => {
                        const newList = [...list.slice(0, taskIdx), updatedTask, ...list.slice(taskIdx)];
                        return newList;
                    });
                } else {
                    setInprogressList(list => [...list, updatedTask]);
                }
                break;
            case Status.ONREVIEW:
                if (originTask.status === updatedTask.status && taskIdx >= 0) {
                    setOnreviewList(list => {
                        const newList = [...list.slice(0, taskIdx), updatedTask, ...list.slice(taskIdx)];
                        return newList;
                    });
                } else {
                    setOnreviewList(list => [...list, updatedTask]);
                }
                break;
            case Status.DONE:
                if (originTask.status === updatedTask.status && taskIdx >= 0) {
                    setDoneList(list => {
                        const newList = [...list.slice(0, taskIdx), updatedTask, ...list.slice(taskIdx)];
                        return newList;
                    });
                } else {
                    setDoneList(list => [...list, updatedTask]);
                }
                break;
            default:
                console.log("Wrong task edit: ", originTask, " to ", updatedTask);
        }

    }

    return (
        <List sx={{width: '100%'}}>
            {tasks.map((task, index) => (
                <ExpandableListItem 
                    key={index} task={task}
                    isExpanded={expandedIndex === index}
                    onToggleExpand={() => handleToggleExpand(index)} 
                    onTaskChange={(updatedTask: TaskType) => handleTaskChange(updatedTask, task)}
                />
            ))}
        </List>
        
    )
}