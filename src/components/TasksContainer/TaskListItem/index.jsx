import React from "react";
import styles from "./index.module.scss";

const COLOR_MAP = {
  High: "#fbad56",
  Urgent: "#fd9a93",
  Low: "#fdecad",
};

export const TaskListITem = ({ task, onCheck, onTaskClick }) => 
    <div>
      <div className={styles.Main__wrapper}>
        <div className={styles.Row_content_wrapper}>
          <input
            type="checkbox"
            disabled={task.status === "completed" }
            className={styles.Row__checkbox}
            checked={task.isSelected}
            onChange={(event) => onCheck(task.id)}
          />
          <div className={styles.Row__content}>
            {task.status === "completed" ? (
              <div className={styles.Row__completedTask__subtitle}>
                {task.title}
              </div>
            ) : (
              <div className={styles.Row__tasktitle} onClick={() => onTaskClick(task)}>{task.title}</div>
            )}
            <div className={styles.Row__subtitle}>{task?.description}</div>
          </div>
          <div label={task.priority} className={styles.Row__priority} style={{ background: COLOR_MAP[task.priority] }} />
        </div>
      </div>
    </div>
