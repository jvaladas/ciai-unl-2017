package pt.unl.fct.iadi.main.model;

import pt.unl.fct.iadi.main.exceptions.BrokenPrecondition;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

// Basic JPA configuration: https://spring.io/guides/gs/accessing-data-jpa/
// For mysql configuration: https://spring.io/guides/gs/accessing-data-mysql/

@Entity
public class Task {

	
    @Id
    @GeneratedValue
    int id;

    String description;

    Date creationDate;

    Date dueDate;

    public Task() {}

    public Task(int id, String description, Date creationDate, Date dueDate) {
        this.id = id;
        this.description = description;
        this.creationDate = creationDate;
        this.dueDate = dueDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public static void valid(Task t) {
        if( t.getDescription() == null ||
            t.getCreationDate() == null ) {
            // can also tests dueDate >= creationDate
            throw new BrokenPrecondition();
        }
    }

    public String toString() {
        return id + ":" + description + ", " + creationDate.toString() + ":" + dueDate.toString();
    }
}
