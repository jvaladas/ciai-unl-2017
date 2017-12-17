package pt.unl.fct.iadi.main.model;

import java.util.Date;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import pt.unl.fct.iadi.main.exceptions.BrokenPrecondition;

	@Entity
	public class ArtPiece {
		
	 	@Id
	    @GeneratedValue
	    int id;
	 	
	 	String Name;
	 	
	    String description;

	    long creationDate;

	    String owner;
	    
	    int AuthorId;
	    
	    String ImageUrl;
	    
	    @ElementCollection
	    List<String> tags;
	    
	    boolean forsale;

	    public ArtPiece() {}

	    public ArtPiece(int id,String name, String description, String ImageUrl, String owner, List<String> tags, int AuthorId) {
	        this.id = id;
	        this.description = description;
	        this.creationDate = System.currentTimeMillis();
	        this.AuthorId = AuthorId;
	        this.owner = owner;
	        this.tags = tags;
	        this.forsale = false;
	        this.ImageUrl = ImageUrl;
	        this.Name = name;
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

	    public long getCreationDate() {
	        return creationDate;
	    }

	    public void setCreationDate(long creationDate) {
	        this.creationDate = creationDate;
	    }
	    
	    public String getOwner() {
	        return owner;
	    }

	    public void setOwner(String owner) {
	        this.owner = owner;
	    }
	    
	    public List<String> getTags() {
	        return tags;
	    }

	    public void setTag(String tag) {
	        tags.add(tag);
	    }
	    
	    public void setForsale(){
	    	this.forsale = !forsale;
	    }
	    
	    public void setImageUrl(String url) {
	    	this.ImageUrl = url;
	    }
	   
	    public String getImageUrl() {
	    	return this.ImageUrl;
	    }
	    
	    public int getAuthorId() {
	    	return this.AuthorId;
	    }
	    
	    public void AuthorId(int id) {
	    	this.AuthorId = id;
	    }
	    
	    public String getName() {
	    	return this.Name;
	    }
	    
	    public void setName(String name)
	    {
	    	this.Name = name;
	    }
	    
	    public static void valid(ArtPiece a) {
	        if( a.getDescription() == null ||
	            a.getCreationDate() == -1 ) {
	            // can also tests dueDate >= creationDate
	            throw new BrokenPrecondition();
	        }
	    }

	    public String toString() {
	    	String creationDateString = Long.toString(creationDate);
	        return id + ":" + description + ", " + creationDateString;
	    }
}
