
	package pt.unl.fct.iadi.main.model;

	import java.text.SimpleDateFormat;
	import java.util.Date;
	import java.util.List;

	import javax.persistence.Entity;
 	import javax.persistence.GeneratedValue;
	import javax.persistence.Id;

import net.minidev.json.annotate.JsonIgnore;
import pt.unl.fct.iadi.main.exceptions.BrokenPrecondition;

	@Entity 
	public class User {

		 	@Id
		    @GeneratedValue
		    int id;

			private String firstName;
			
			private String lastName;

			private String email;
			
			private String description;
			
			private boolean isArtist;
			
			private long memberSince;
			
			@JsonIgnore
			private String password;

		    public User() {}

		    public User(int id, String name,String lName,String email,String password, boolean isArtist) {
		        this.id = id;
		        this.firstName = name;
		        this.lastName = lName;
		        this.email = email;
		        this.password = password;
		        this.isArtist = isArtist;
		        Date memberSince= new Date();
		    }

		    public int getId() {
		        return id;
		    }

		    public void setId(int id) {
		        this.id = id;
		    }

		    public String getEmail() {
		        return email;
		    }
		    
		    public void setEmail(String email){
		    	this.email = email;
		    }
		    
		    public String getFirstName(){
		    	return firstName;
		    }
		    
		    public String getLastName(){
		    	return lastName;
		    }
		    
		    
		    
		    public void setFirstName(String name){
		    	this.firstName = name;
		    }

		    public String getDescription() {
		    	return description;
		    }
		    
		    public void setDescription(String description) {
		        this.description = description;
		    }
		   
		    public String getPassword(){
		    	return password;
		    }
		    
		    public void setPassword(String passoword){
		    	this.password = passoword;
		    }

		    public long getCreationDate() {
		    	return memberSince;
		    }

		    
		    public static void valid(User u) {
		    	
		    	
		        if( u.getFirstName()== null || u.getLastName() == null ||
		        		u.getEmail() == null ) {
		            // can also tests dueDate >= creationDate
		            throw new BrokenPrecondition();
		        }
		    }

		    public String toString() {
		        return id + ":" + firstName + ", " + email.toString();
		    }

}
