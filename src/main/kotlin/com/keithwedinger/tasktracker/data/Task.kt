package com.keithwedinger.tasktracker.data

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import org.springframework.data.annotation.CreatedBy
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedBy
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.util.*
import javax.persistence.*
import javax.validation.constraints.NotEmpty

/**
 * Task entity data class
 * Kotlin data class takes care of getters and setters
 * It also automatically generates equals(), hashcode(), toString() and copy() methods
 *
 * @author Keith Wedinger <br>
 * Created On: 2/19/18
 */
@Entity
@EntityListeners(AuditingEntityListener::class)
@JsonIgnoreProperties("createdAt", "updatedAt", "createdBy", "lastModifiedBy")
data class Task (
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long = 0,

    @get: NotEmpty
    val name: String = "",

    @get: NotEmpty
    val dueDate: String = "",

    @get: NotEmpty
    val assignedTo: String = "",

    // @Temporal annotation is used with java.util.Date and java.util.Calendar classes.
    // It converts the date and time values from Java Object to compatible database type and vice versa.
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    val createdAt: Date? = null,

    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    val updatedAt: Date? = null,

    @CreatedBy
    val createdBy: String? = null,

    @LastModifiedBy
    var lastModifiedBy: String? = null
)