package pt.unl.fct.iadi.main.services;


import pt.unl.fct.iadi.main.model.User;

public interface UserService {

	User[] findAll();

    User[] findWithDescription(String criteria);

    void create(User u);

    void update(User u);

    User findById(int id);

    void remove(int id);
	
	
	
}
