package pt.unl.fct.iadi.main.model;

import java.util.Date;

public class TaskBuilder {

    private Task task;

    public TaskBuilder() {
        task = new Task();
    }

    public TaskBuilder id(int id) {
        task.setId(id);
        return this;
    }

    public TaskBuilder description(String desc) {
        task.setDescription(desc);
        return this;
    }

    public TaskBuilder creationDate(Date date) {
        task.setCreationDate(date);
        return this;
    }

    public TaskBuilder dueDate(Date date) {
        task.setDueDate(date);
        return this;
    }

    public Task build() {
        return task;
    }
}
