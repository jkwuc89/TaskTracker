package com.keithwedinger.tasktracker

import java.util.Optional

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Bean
import org.springframework.data.jpa.repository.config.EnableJpaAuditing
import org.springframework.data.domain.AuditorAware
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer

/**
 * Spring Boot app startup for Task Tracker web app
 *
 * @author kwedinger <br>
 *         Created On: 2/18/2018
 */
@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
class TaskTrackerApplication : SpringBootServletInitializer() {
    
    companion object {
        @Throws(Exception::class)
        @JvmStatic
        fun main(args: Array<String>) {
            SpringApplication.run(TaskTrackerApplication::class.java, *args)
        }
    }

    @Bean
    fun auditorAware(): AuditorAware<String> {
        return AuditorAwareImpl()
    }
}

/**
 * Auditing support
 */
class AuditorAwareImpl : AuditorAware<String> {
    /**
     * Return currently authenticated user for auditing purposes
     */
    override fun getCurrentAuditor(): Optional<String> {
        return Optional.of("TaskTracker")
    }
}
