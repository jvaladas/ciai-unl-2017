package pt.unl.fct.iadi.main.model;

import javax.persistence.Embeddable;
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
	String description;
	
	public Review() {}
	
	public Review(int articleId, int userId, long date, int rating, String description) {
		this.articleId = articleId;
		this.userId = userId;
		this.date = date;
		this.rating = rating; 
		this.description = description;
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

	public Integer getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public Integer getArticleId() {
		return articleId;
	}
	
	public void setArticleId(int articleId) {
		this.articleId = articleId;
	}
	
	public Integer getRating() {
		return rating;
	}
	
	public void setRating(int rating) {
		this.rating = rating;
	}
	
	public Integer getUserId() {
		return userId;
	}
	
	public void setUserId(int userId) {
		this.userId = userId;
	}
	
	
}
