package pt.unl.fct.iadi.main.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pt.unl.fct.iadi.main.model.Task;
import pt.unl.fct.iadi.main.model.TaskRepository;

@Service
public class TaskServiceImpl implements TaskService {

	@Autowired
    TaskRepository repository;

    @Override
    public Task[] findAll() {
        List<Task> l = new ArrayList<Task>();
        for(Task t: repository.findAll()) {
        		l.add(t);
        }
        return l.toArray(new Task[l.size()]);
    }

    @Override
    public Task[] findWithDescription(String criteria) {
        return repository.findByDescription(criteria);
    }

    @Override
    public void create(Task t) {
        repository.save(t); // generates automatically the id (see model class)
    }

    @Override
    public void update(Task t) {
        Task tx = repository.findOne(t.getId());
        tx.setDueDate(t.getDueDate());
        tx.setDescription(t.getDescription());
        tx.setCreationDate(t.getCreationDate());
        repository.save(tx);
    }

    @Override
    public Task findById(int id) {
        return repository.findOne(id);
    }

    @Override
    public void remove(int id) {
        Task tx = repository.findOne(id);
        repository.delete(tx);
    }
}
