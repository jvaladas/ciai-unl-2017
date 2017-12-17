package pt.unl.fct.iadi.main.services;

import pt.unl.fct.iadi.main.model.Task;

public interface TaskService {

    Task[] findAll();

    Task[] findWithDescription(String criteria);

    void create(Task t);

    void update(Task t);

    Task findById(int id);

    void remove(int id);
}
