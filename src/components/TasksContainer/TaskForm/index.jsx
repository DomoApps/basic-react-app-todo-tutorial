import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';

export const TaskForm = ({ onSave, onClose, task = {} }) => {
  const [stagedTask, setStagedTask] = useState(task);
  const [alert, setAlert] = useState('');

  useEffect(() => {
    setStagedTask(task)
  }, [task])

  const handleStagedTaskUpdate = (key, value) => {
    const newStagedData = { ...stagedTask, [key]: value };
    setStagedTask(newStagedData);
  };

  const handleSave = async () => {
    const task = {
      id: stagedTask.id,
      title: stagedTask.title,
      description: stagedTask.description,
      priority: stagedTask.priority || 'Low',
      dueDate: stagedTask?.dueDate,
      status: 'active',
    };
    const response = await onSave(task)
    if (response?.id !== undefined) setStagedTask({});
    setAlert(`Task ${task.id !== undefined ? 'updated' : 'created'} Successfully!`);
    setTimeout(() => {
      onClose();
      setAlert('');
    }, 1000);
  };

  return (
    <div className={styles.TaskForm}>
      <div className={styles.TaskForm__titleBox}>
        {task.id !== undefined ? 'Update Task' : 'Add your new To-Do'}
      </div>
      <div className={styles.TaskForm__formBox}>
        <div className={styles.TaskForm__formBoxContent}>
          <input
            id="title-input"
            className={styles.TaskForm__formInput}
            placeholder="Task Title"
            onChange={(event) =>
              handleStagedTaskUpdate('title', event.target.value)
            }
            value={stagedTask?.title || ''}
          />
          <textarea
            multiline
            maxRows={3}
            id="description-input"
            className={styles.TaskForm__formNotes}
            placeholder="Notes"
            value={stagedTask?.description || ''}
            onChange={(event) =>
              handleStagedTaskUpdate('description', event.target.value)
            }
          />
          <div
            className={styles.TaskForm__formSubTitle}
          >
            Completion Due Date
          </div>
          <div>
            <input
              className={styles.TaskForm__formInput}
              type="date"
              value={stagedTask?.dueDate}
              onChange={(event) =>
                handleStagedTaskUpdate('dueDate', new Date(event.target.value).toISOString().split('T')[0])
              }
            />
          </div>
          <div className={styles.TaskForm__formSubTitle}>Set Priority</div>
          <select className={styles.TaskForm__formInput} value={stagedTask.priority} onChange={(event) =>
            handleStagedTaskUpdate('priority', event.target.value)
          }>
            <option value="Low">Low</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
          <div className={styles.TaskForm__ButtonsWrapper}>
            <button
              className={styles.TaskForm__createButton}
              disabled={!stagedTask.title}
              onClick={handleSave}
            >
              SAVE
            </button>
            <button
              onClick={onClose}
            >
              CANCEL
            </button>
          </div>
        </div>
        {alert !== '' && (
          <div className={styles.TaskForm__alert}>
            {alert}
          </div>
        )}
      </div>
    </div>
  );
};
