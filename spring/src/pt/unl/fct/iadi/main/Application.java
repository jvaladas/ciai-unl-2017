package pt.unl.fct.iadi.main;

import java.awt.List;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

import pt.unl.fct.iadi.main.model.Review;
import pt.unl.fct.iadi.main.model.ArtPiece;
import pt.unl.fct.iadi.main.model.ArtRepository;
import pt.unl.fct.iadi.main.model.Task;
import pt.unl.fct.iadi.main.model.TaskRepository;
import pt.unl.fct.iadi.main.model.User;
import pt.unl.fct.iadi.main.model.UserRepository;



// Inspired in: https://spring.io/guides/gs/spring-boot/
// also in: https://spring.io/guides/gs/accessing-data-jpa/

@SpringBootApplication
public class Application {

    public static void main(String[] args) {

        SpringApplication.run(Application.class, args);
    }

    private static final Logger log = LoggerFactory.getLogger(Application.class);

    @Bean
    public CommandLineRunner commandLineRunner(ApplicationContext ctx, UserRepository users, ArtRepository arts){//TaskRepository tasks) {
        return args -> {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-dd");

            users.save(new User(1, "Andre","Maria","andre@aol.com.br","123", true));
            
            users.save(new User(2, "Joao","Carlos","j@aol.com","123", true));
            
            ArrayList<Review> reviews = new ArrayList<Review>();
            reviews.add(new Review(1, 1, 1, new Date().getTime(), 4, "I like it."));
            
            arts.save(new ArtPiece(1, "Higher Motion","Painting, 35.4 H x 23.6 W x 0.8 in"
            		, "https://i.pinimg.com/originals/26/2d/a4/262da433a20602c80382fea94a8c1c26.jpg",
            		"", new ArrayList<String>(), 1, reviews));
            
            arts.save(new ArtPiece(2, "Portrait","Painting, 23.6 H x 19.7 W x 0.8 in"
            		, "http://www.goddessofegypt.com/wp-content/uploads/2017/06/Abstract-Painting.jpg",
            		"", new ArrayList<String>(), 1, new ArrayList<Review>()));
            
            arts.save(new ArtPiece(3, "Impeccability of white","Painting, 35.4 H x 23.6 W x 0.8 in"
            		, "https://twistedsifter.files.wordpress.com/2014/06/fine-art-finger-paintings-by-iris-scott-3.jpg",
            		"", new ArrayList<String>(), 2, new ArrayList<Review>()));
            
            arts.save(new ArtPiece(4, "Afterglow","Painting, 35.4 H x 23.6 W x 0.8 in"
            		, "https://images.fineartamerica.com/images-medium-large-5/blue-venice-dmitry-spiros.jpg",
            		"", new ArrayList<String>(), 2, new ArrayList<Review>()));
            
            arts.save(new ArtPiece(5, "Three Blue Vases","Painting, 35.4 H x 23.6 W x 0.8 in"
            		, "https://images-na.ssl-images-amazon.com/images/I/91MzV6V79DL._SL1500_.jpg",
            		"", new ArrayList<String>(), 2, new ArrayList<Review>()));
            
            arts.save(new ArtPiece(6, "The One With Sprinkes","Painting, 35.4 H x 23.6 W x 0.8 in"
            		, "https://st.hzcdn.com/simgs/9821d30108fa3f90_4-3488/contemporary-paintings.jpg",
            		"", new ArrayList<String>(), 1, new ArrayList<Review>()));
            
            arts.save(new ArtPiece(7, "Boating blues 2","Painting, 35.4 H x 23.6 W x 0.8 in"
            		, "https://afremov.com/image.php?type=P&id=19255",
            		"", new ArrayList<String>(), 2, new ArrayList<Review>()));
            
            arts.save(new ArtPiece(8, "Woodland Creature III","Painting, 35.4 H x 23.6 W x 0.8 in"
            		, "https://affordableartfair.com/media/cache/1/marketplace/17f82f742ffe127f42dca9de82fb58b1/fair/2/58d3eac4e5b4c.jpg",
            		"", new ArrayList<String>(), 1, new ArrayList<Review>()));
            
        };
    }

}