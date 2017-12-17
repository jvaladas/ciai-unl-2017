package pt.unl.fct.iadi.main.model;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User,Integer> {
    User[] findByDescription(String desc);
}
