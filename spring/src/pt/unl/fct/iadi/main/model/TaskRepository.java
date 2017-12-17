package pt.unl.fct.iadi.main.model;

import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends CrudRepository<Task,Integer> {
    Task[] findByDescription(String desc);
}
