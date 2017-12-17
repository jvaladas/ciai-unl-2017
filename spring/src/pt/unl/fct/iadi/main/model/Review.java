package pt.unl.fct.iadi.main.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Review {

	@Id
    @GeneratedValue
    int id;
	int articleId;
	int userId;
	long date;
	int rating;
	String content;
	String description;
	
	public Review() {}
	
	public Review(int id, int articleId, int userId, long date, int rating, String content) {
		this.id = id;
		this.articleId = articleId;
		this.userId = userId;
		this.date = date;
		this.rating = rating; 
		this.content = content;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public int getId() {
		return id;
	}
	
	public void setDate(long date) {
		this.date = date;
	}
	
	public long getDate() {
		return date;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getDescription() {
		return description;
	}

	public static void valid(Review r) {
		// TODO Auto-generated method stub
		
	}
	
	
}
