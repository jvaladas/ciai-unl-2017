package pt.unl.fct.iadi.main.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import pt.unl.fct.iadi.main.model.User;
import pt.unl.fct.iadi.main.model.UserRepository;

@Service
public class UserServiceImpl implements UserService{

		@Autowired
	    UserRepository repository;

	    @Override
	    public User[] findAll() {
	        List<User> l = new ArrayList<User>();
	        for(User t: repository.findAll()) {
	        		l.add(t);
	        }
	        return l.toArray(new User[l.size()]);
	    }

	    @Override
	    public User[] findWithDescription(String criteria) {
	        return repository.findByDescription(criteria);
	    }

	    @Override
	    public void create(User t) {
	        repository.save(t); // generates automatically the id (see model class)
	    }

	    @Override
	    public void update(User t) {
	        User tx = repository.findOne(t.getId());
	        tx.setDescription(t.getDescription());
	        repository.save(tx);
	    }

	    @Override
	    public User findById(int id) {
	        return repository.findOne(id);
	    }

	    @Override
	    public void remove(int id) {
	        User tx = repository.findOne(id);
	        repository.delete(tx);
	    }

		

}
