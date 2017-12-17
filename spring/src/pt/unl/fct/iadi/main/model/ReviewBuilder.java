package pt.unl.fct.iadi.main.model;

public class ReviewBuilder {
	
	private Review review;
	
	public ReviewBuilder() {
		review = new Review();
	}
	
	public ReviewBuilder date(long date) {
		review.setDate(date);
		return this;
	}
	
	public Review build() {
		return review;
	}
	
    public ReviewBuilder description(String desc) {
        review.setDescription(desc);
        return this;
    }

}
