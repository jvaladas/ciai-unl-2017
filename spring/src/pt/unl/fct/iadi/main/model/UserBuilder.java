package pt.unl.fct.iadi.main.model;

import java.util.Date;

public class UserBuilder {
	
	private User user;

    public UserBuilder() {
        user = new User();
    }

    public UserBuilder id(int id) {
        user.setId(id);
        return this;
    }

    public UserBuilder description(String desc) {
        user.setDescription(desc);
        return this;
    }



    public User build() {
        return user;
    }
}
