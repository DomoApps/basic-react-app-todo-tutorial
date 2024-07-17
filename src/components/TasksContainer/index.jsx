import React, { useEffect, useState, useRef } from 'react';
import { TaskService } from '../../taskService';
import styles from './index.module.scss';
import { TaskListITem } from './TaskListItem'
import { TaskForm } from './TaskForm';

const TasksEmptyState = () => (
  <div className={styles.List__empty}>
    You have no tasks
  </div>
);
const TaskList = ({ tasks = [], onCheck, onClick }) => (
  tasks.map((task) => (
    <TaskListITem key={task.id} task={task} onCheck={onCheck} onTaskClick={onClick} />
  ))
);

const Content = () => {
  const [tasks, setTasks] = useState([])
  const [selectedTasks, setSelectedTasks] = useState([])
  const [editingTask, setEditingTask] = useState({})
  const [loading, setLoading] = useState(false)
  const dialogRef = useRef(null);

  useEffect(() => {
    setLoading(true)
    TaskService.fetchTasks('active').then(response => {
      setTasks(response)
      setLoading(false)
    })
  }, [])

  const handleSave = async (task) => {
    try {
      let request;
      const newTasks = [...tasks]
      if (task.id !== undefined) {
        const updatedTask = newTasks.find(newTask => newTask.id === task.id);
        Object.assign(updatedTask, task);
        const { id, isSelected, ...content } = task;
        request = TaskService.updateTask(id, content)
      } else {
        request = TaskService.createTask(task)
        newTasks.push(task);
      }
      const savedTask = await request;
      setTasks(newTasks);
      return savedTask;
    } catch (error) {
      return null
    }
  }

  const completeTasks = async () => {
    try {
      const newTasks = [...tasks]
      const requests = tasks.filter(task => selectedTasks.includes(task.id)).map(task => {
        const newTask = { ...task, status: 'completed' }
        const completedTask = newTasks.find(newTask => newTask.id === task.id);
        Object.assign(completedTask, newTask);
        const { id, isSelected, ...content } = newTask;
        return TaskService.updateTask(id, content)
      })
      await Promise.all[requests];
      setTasks(newTasks);
    } catch (error) {
      return null
    }
  }

  const deleteTasks = async () => {
    try {
      const newTasks = tasks.filter(task => !selectedTasks.includes(task.id))
      TaskService.deleteTasks(selectedTasks)
      setTasks(newTasks);
    } catch (error) {
      return null
    }
  }

  const onTaskCheck = (taskId) => {
    const isSelected = selectedTasks.includes(taskId);
    if (isSelected) {
      const newSelected = selectedTasks.filter(task => task !== taskId);
      setSelectedTasks(newSelected);
    } else {
      setSelectedTasks([...selectedTasks, taskId])
    }
    const newTasks = tasks.map(task => task.id === taskId ? { ...task, isSelected: !isSelected } : task)
    setTasks(newTasks);
  };

  const onTaskClick = (task) => {
    setEditingTask(task);
    dialogRef.current.showModal()
  }

  const onClose = () => {
    dialogRef.current.close()
    setEditingTask({})
  }

  if (loading ?? false)
    return <div>Loading...</div>;

  return (
    <>
      <div className={styles.List__container}>
        {tasks.length === 0 ? <TasksEmptyState /> : <TaskList tasks={tasks} onCheck={onTaskCheck} onClick={onTaskClick} />}
      </div>
      <button className={styles.List__addButton} onClick={() => dialogRef.current.showModal()}> Add Task</button>
      {selectedTasks.length > 0 && <>
        <button className={styles.List__addButton} onClick={completeTasks}> Complete Tasks</button>
        <button className={styles.List__addButton} onClick={deleteTasks}> Delete Tasks</button>
      </>}
      <dialog ref={dialogRef}><TaskForm onClose={onClose} onSave={handleSave} task={editingTask} /> </dialog>
    </>
  );
};

export const TasksContainer = () => <div className={styles.List__container}>
  <Content />
</div>
