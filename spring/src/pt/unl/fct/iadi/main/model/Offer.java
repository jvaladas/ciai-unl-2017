package pt.unl.fct.iadi.main.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import pt.unl.fct.iadi.main.exceptions.BrokenPrecondition;

@Entity
public class Offer {

 	@Id
    @GeneratedValue
    int id;
 	int articleId;
 	int authorId;
 	int requesterId;
 	int value;
 	long date;
 	
 	public Offer() {
 		
 	}
 	
 	public Offer( int id, int articleId, int authorId, int requesterId, int value, long date) {
 		this.id = id;
 		this.articleId = articleId;
 		this.authorId = authorId;
 		this.requesterId = requesterId;
 		this.value =value;
 		this.date = date;
 	}
 	
 	public int getId() {
 		return id;
 	}
 	
 	public void setId(int id) {
 		this.id = id;
 	}
 	
 	public int getArticleId() {
 		return articleId;
 	}
 	
 	public void setArticleId(int articleId) {
 		this.articleId = articleId;
 	}
 	
 	public int getAuthorId() {
 		return authorId;
 	}
 	
 	public void setAuthorId(int authorId) {
 		this.authorId = authorId;
 	}
 	
 	public int getRequesterId() {
 		return requesterId;
 	}
 	
 	public void setRequesterId(int requesterId) {
 		this.requesterId = requesterId;
 	}
 	
 	public int getValue() {
 		return value;
 	}
 	
 	public void setValue(int value) {
 		this.value = value;
 	}
 	
 	public long getDate() {
 		return date;
 	}
 	
 	public void setDate(long date) {
 		this.date = date;
 	}
 	
    public static void valid(Offer a) {

    }

    public String toString() {
    	String creationDateString = Long.toString(date);
        return id + ":" + value + ", " + creationDateString;
    }
}
