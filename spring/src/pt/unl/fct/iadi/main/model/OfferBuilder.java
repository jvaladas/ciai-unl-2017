package pt.unl.fct.iadi.main.model;

public class OfferBuilder {

	private Offer offer;
	
	public OfferBuilder() {
		offer = new Offer();
	}
	
	public OfferBuilder id (int id) {
		offer.setId(id);
		return this;
	}
	
	public OfferBuilder value(int value) {
		offer.setValue(value);
		return this;
	}
	
	public OfferBuilder Date(long date) {
		offer.setDate(date);
		return this;
	}
	
	public Offer build() {
		return offer;
	}
}
