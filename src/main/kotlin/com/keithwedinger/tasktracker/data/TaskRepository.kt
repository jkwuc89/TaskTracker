package com.keithwedinger.tasktracker.data

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

/**
 * JPARepository for Task
 * Since we’ve extended ArticleRepository from JPARepository interface,
 * all the CRUD methods on Task entity are readily available to us.
 *
 * @author Keith Wedinger <br>
 * Created On: 2/19/18
 */
@Repository
interface TaskRepository : JpaRepository<Task, Long>

