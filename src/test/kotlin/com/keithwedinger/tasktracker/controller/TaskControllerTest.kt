package com.keithwedinger.tasktracker.controller

import com.keithwedinger.tasktracker.data.Task
import com.keithwedinger.tasktracker.data.TaskRepository
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.HttpStatus
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit.jupiter.SpringExtension

/**
 * TaskController tests
 * @author Keith Wedinger <br></br>
 * Created On: 2/19/18
 */
@ActiveProfiles("test")
@ExtendWith(SpringExtension::class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
internal class TaskControllerTest {
    @Autowired
    lateinit var taskController: TaskController

    @Autowired
    lateinit var taskRepository: TaskRepository

    @AfterEach
    fun resetDb() {
        taskRepository.deleteAll()
    }

    val testTask1 = Task(name = "Task 1", dueDate = "2018-01-01", assignedTo = "Assigned To 1")
    val testTask2 = Task(name = "Task 2", dueDate = "2018-02-02", assignedTo = "Assigned To 2")
    val testTask3 = Task(name = "Task 3", dueDate = "2018-03-03", assignedTo = "Assigned To 3")

    @Test
    fun `getAllTasks with no tasks in DB returns empty array`() {
        Assertions.assertEquals(0, taskController.getAlltasks().size)
    }

    @Test
    fun `getAlltasks returns all tasks in DB`() {
        taskRepository.save(testTask1)
        taskRepository.save(testTask2)
        val tasks = taskController.getAlltasks()
        Assertions.assertEquals(2, tasks.size)
        Assertions.assertEquals("Task 1", tasks[0].name)
        Assertions.assertEquals("Task 2", tasks[1].name)
    }

    @Test
    fun `createNewTask() inserts a task into the DB`() {
        taskController.createNewTask(testTask1)
        Assertions.assertEquals(1, taskRepository.count())
        val createdTask = taskRepository.findAll()[0]
        Assertions.assertEquals(testTask1.name, createdTask.name)
        Assertions.assertEquals(testTask1.dueDate, createdTask.dueDate)
        Assertions.assertEquals(testTask1.assignedTo, createdTask.assignedTo)
    }

    @Test
    fun `getTaskByID returns not found when task does not exist in DB`() {
        val result = taskController.getTaskById(0)
        Assertions.assertEquals(HttpStatus.NOT_FOUND, result.statusCode)
    }

    @Test
    fun `getTaskByID returns task when task does exist in DB`() {
        taskRepository.save(testTask1)
        val taskId = taskRepository.findAll()[0].id
        val result = taskController.getTaskById(taskId)
        Assertions.assertEquals(HttpStatus.OK, result.statusCode)
        val retrievedTask = result.body!!.get()
        Assertions.assertEquals(testTask1.name, retrievedTask.name)
        Assertions.assertEquals(testTask1.dueDate, retrievedTask.dueDate)
        Assertions.assertEquals(testTask1.assignedTo, retrievedTask.assignedTo)
    }

    @Test
    fun `updateTask returns not found when task does not exist in DB`() {
        val result = taskController.updateTask(0, testTask2)
        Assertions.assertEquals(HttpStatus.NOT_FOUND, result.statusCode)
    }

    @Test
    fun `updateTask updates the properties of the existing task`() {
        taskRepository.save(testTask1)
        val taskId = taskRepository.findAll()[0].id
        val result = taskController.updateTask(taskId, testTask3)
        Assertions.assertEquals(HttpStatus.OK, result.statusCode)
        val retrievedTask = taskRepository.findById(taskId).get()
        Assertions.assertEquals(testTask3.name, retrievedTask.name)
        Assertions.assertEquals(testTask3.dueDate, retrievedTask.dueDate)
        Assertions.assertEquals(testTask3.assignedTo, retrievedTask.assignedTo)
    }

    @Test
    fun `deleteTask returns not found when task does not exist in DB`() {
        val result = taskController.deleteTask(0)
        Assertions.assertEquals(HttpStatus.NOT_FOUND, result.statusCode)
    }

    @Test
    fun `deleteTask deletes the existing task`() {
        taskRepository.save(testTask1)
        val taskId = taskRepository.findAll()[0].id
        val result = taskController.deleteTask(taskId)
        Assertions.assertEquals(HttpStatus.OK, result.statusCode)
        Assertions.assertFalse(taskRepository.findById(taskId).isPresent)
    }
}