package com.keithwedinger.tasktracker.controller

import com.keithwedinger.tasktracker.data.Task
import com.keithwedinger.tasktracker.data.TaskRepository
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*
import javax.validation.Valid

/**
 * Task REST API controller
 *
 * @author Keith Wedinger <br>
 * Created On: 2/19/18
 */
@RestController
@RequestMapping("/api")
class TaskController(private val TaskRepository: TaskRepository) {
    val log = LoggerFactory.getLogger(TaskController::class.java)!!

    @GetMapping("/tasks")
    fun getAlltasks(): List<Task> = TaskRepository.findAll()

    @PostMapping("/tasks")
    fun createNewTask(@Valid @RequestBody Task: Task): Task = TaskRepository.save(Task)

    @GetMapping("/tasks/{id}")
    fun getTaskById(@PathVariable(value = "id") taskId: Long): ResponseEntity<Optional<Task>> {
        log.info("Getting task by ${taskId}")
        val task = TaskRepository.findById(taskId)
        return if (task.isPresent) {
            ResponseEntity.ok().body(task)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @PutMapping("/tasks/{id}")
    fun updateTask(@PathVariable(value = "id") taskId: Long,
                   @Valid @RequestBody newTask: Task): ResponseEntity<Task> {
        log.info("Updating task ${taskId}")
        val existingTask = TaskRepository.findById(taskId)
        return if (existingTask.isPresent) {
            val updatedTask: Task =
                existingTask.get().copy(name = newTask.name, dueDate = newTask.dueDate, assignedTo = newTask.assignedTo)
            ResponseEntity.ok().body(TaskRepository.save(updatedTask))
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @DeleteMapping("/tasks/{id}")
    fun deleteTask(@PathVariable(value = "id") taskId: Long): ResponseEntity<Void> {
        log.info("Deleting task ${taskId}")
        val existingTask = TaskRepository.findById(taskId)
        return if (existingTask.isPresent) {
            TaskRepository.delete(existingTask.get())
            ResponseEntity(HttpStatus.OK)
        } else {
            ResponseEntity.notFound().build()
        }
    }
}