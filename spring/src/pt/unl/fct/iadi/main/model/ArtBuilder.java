package pt.unl.fct.iadi.main.model;

public class ArtBuilder {

    private ArtPiece art;

    public ArtBuilder() {
        art = new ArtPiece();
    }

    public ArtBuilder id(int id) {
        art.setId(id);
        return this;
    }

    public ArtBuilder description(String desc) {
        art.setDescription(desc);
        return this;
    }

    public ArtBuilder creationDate(long date) {
        art.setCreationDate(date);
        return this;
    }


    public ArtPiece build() {
        return art;
    }
}
