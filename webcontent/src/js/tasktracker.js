/**
 * JavaScript implementation for the TaskTracker
 * The Revealing Module Pattern is being used to prevent
 * pollution of / collisions with the global namespace
 */

"use strict";

import $ from "jquery";
import _ from "underscore";

export default () => {
    const BASE_API_URL = `${window.location.href}api`;

    // Task item properties
    let TASK_NAME_PROPERTY = "name";
    let TASK_DATE_PROPERTY = "dueDate";
    let TASK_ASSIGNEDTO_PROPERTY = "assignedTo";

    // Style constants
    let TEXT_INPUT_ERROR_COLOR = "#FF0000";
    let TEXT_INPUT_NORMAL_COLOR = "#DEDEDE";

    // Saved DOM objects
    let existingTaskList;
    let taskNameInput;
    let taskDateInput;
    let taskAssignedToInput;

    /**
     * On document ready, read the task data and populate
     * the task list
     */
    $(document).ready(function() {
        // Perform jQuery DOM lookups up front for reused DOM elements
        existingTaskList = $("#existingTaskList");
        taskNameInput = $("#taskNameInput");
        taskDateInput = $("#dateInput");
        taskAssignedToInput = $("#assignedToInput");

        // Get existing tasks
        $.ajax({
            url: `${BASE_API_URL}/tasks`,
            type: "GET",
            dataType: "json"
        })
        .done(function(tasks) {
            // Put the tasks into the task list
            _.each(tasks, function(task) {
                addTaskToList(task, false);
            });
        })
        .fail(function() {
            console.error("GET all tasks failed"); // eslint-disable-line no-console
        });
    });

    /**
     * Add a new task to the task list. The HTML snippet
     * for doing this is included in this function
     * @param task Task to add
     * @param prependToList Prepend to list? Defaults to true
     * @return boolean, true if task was added, false if not
     */
    function addTaskToList(task, prependToList) {
        let added = false;
        let $taskElement;
        // Default to prepend if not specified
        prependToList = typeof prependToList !== "undefined" ? prependToList : true;

        // Make sure task is valid
        if (task !== null &&
            task.hasOwnProperty(TASK_NAME_PROPERTY) && task[TASK_NAME_PROPERTY] &&
            task.hasOwnProperty(TASK_DATE_PROPERTY) && task[TASK_DATE_PROPERTY] &&
            task.hasOwnProperty(TASK_ASSIGNEDTO_PROPERTY) && task[TASK_ASSIGNEDTO_PROPERTY]) {
            $taskElement =
                $(`<li id="taskId${task.id}">` +
                  "    <div class=\"tasklistItemContainer\">" +
                  `        <span class="taskListItemTaskName">${task[TASK_NAME_PROPERTY]}</span>` +
                  `        <span class="taskListItemDate">${task[TASK_DATE_PROPERTY]}</span>` +
                  `        <span class="taskListItemAssignedTo">${task[TASK_ASSIGNEDTO_PROPERTY]}</span>` +
                  `        <button type="button" class="delete" data-taskid="${task.id}">Delete</button>` +
                  "   </div>" +
                  "</li>");
            if (prependToList) {
                existingTaskList.prepend($taskElement);
            } else {
                existingTaskList.append($taskElement);
            }
            $taskElement.click(deleteTask);
            added = true;
        } else {
            // Ignore the task...it's not valid
            console.warn("addTaskToList: Task not added due to missing required properties"); // eslint-disable-line no-console
        }
        return added;
    }

    /**
     * Clear the add task form
     */
    function clearAddTaskForm() {
        taskNameInput.val("");
        taskDateInput.val("");
        taskAssignedToInput.val("");
    }

    /**
     * Clear the error border colors
     */
    function clearErrors() {
        taskNameInput.css("border-color", TEXT_INPUT_NORMAL_COLOR);
        taskDateInput.css("border-color", TEXT_INPUT_NORMAL_COLOR);
        taskAssignedToInput.css("border-color", TEXT_INPUT_NORMAL_COLOR);
    }

    /**
     * Format a date passed in as YYYY-MM-DD as MM/DD/YYYY
     * YYYY-MM-DD is returned by input type="date"
     */
    function formatDate(date) {
        let dateParts = date.split("-");
        return dateParts[1] + "/" + dateParts[2] + "/" + dateParts[0];
    }

    /**
     * Submit handler for the add task form
     */
    $("#addTaskForm").submit(function(event) {
        let inputMissing = false;
        let newTask = {};
        let taskDate;

        clearErrors();

        // Get and validate the form input
        newTask[TASK_NAME_PROPERTY] = taskNameInput.val();
        if (!newTask[TASK_NAME_PROPERTY]) {
            taskNameInput.css("border-color", TEXT_INPUT_ERROR_COLOR);
            inputMissing = true;
        }
        taskDate = taskDateInput.val();
        if (taskDate) {
            newTask[TASK_DATE_PROPERTY] = formatDate(taskDate);
        } else {
            taskDateInput.css("border-color", TEXT_INPUT_ERROR_COLOR);
            inputMissing = true;
        }
        newTask[TASK_ASSIGNEDTO_PROPERTY] = taskAssignedToInput.val();
        if (!newTask[TASK_ASSIGNEDTO_PROPERTY]) {
            taskAssignedToInput.css("border-color", TEXT_INPUT_ERROR_COLOR);
            inputMissing = true;
        }

        if (!inputMissing) {
            // Save the new task
            $.ajax({
                url: `${BASE_API_URL}/tasks`,
                contentType:"application/json; charset=utf-8",
                data: JSON.stringify(newTask),
                dataType: "json",
                type: "POST",
            })
            .done(function(addedTask) {
                // Put the new task on the existing task list
                addTaskToList(addedTask, false);
                clearAddTaskForm()
            })
            .fail(function() {
                console.error("POST new task failed"); // eslint-disable-line no-console
            });
        }

        // Prevent event propagation outside this handler
        event.preventDefault();
    });

    /**
     * Delete handler
     */
    function deleteTask(event) {
        const taskIdToDelete = event.target.getAttribute("data-taskid");

        // Delete the task
        $.ajax({
            url: `${BASE_API_URL}/tasks/${taskIdToDelete}`,
            contentType:"application/json; charset=utf-8",
            type: "DELETE",
        })
        .done(function() {
            console.log(`Task ID ${taskIdToDelete} deleted`); // eslint-disable-line no-console
            $("#taskId" + taskIdToDelete).remove();
        })
        .fail(function() {
            console.error(`Delete task ID ${taskIdToDelete} failed`); // eslint-disable-line no-console
        });
    }
};
