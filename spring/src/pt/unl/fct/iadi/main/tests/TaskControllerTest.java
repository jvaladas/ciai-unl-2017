package pt.unl.fct.iadi.main.tests;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import pt.unl.fct.iadi.main.model.Task;
import pt.unl.fct.iadi.main.model.TaskBuilder;
import pt.unl.fct.iadi.main.services.TaskService;

import java.text.SimpleDateFormat;
import java.util.Date;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// inspired on: https://www.petrikainulainen.net/programming/spring-framework/unit-testing-of-spring-mvc-controllers-rest-api/

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class TaskControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private TaskService mockTaskService;

    @Test
    public void getTasks() throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-dd");
        Task t1 = new TaskBuilder()
                        .id(1)
                        .description("First")
                        .creationDate(sdf.parse("2017-10-20"))
                        .dueDate(sdf.parse("2017-10-22"))
                        .build();
        Task t2 = new TaskBuilder()
                .id(2)
                .description("Second")
                .creationDate(sdf.parse("2017-10-21"))
                .dueDate(sdf.parse("2017-10-23"))
                .build();

        when(mockTaskService.findAll()).thenReturn(new Task[]{t1,t2});
        // TODO not yet complete, mock not working for some reason

        mvc.perform(MockMvcRequestBuilders.get("/tasks")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    public void createTasks() throws Exception {
        Task t1 = new TaskBuilder()
                    .id(1)
                    .description("Bla")
                    .creationDate(new Date())
                    .dueDate(null)
                    .build();

        mvc.perform(MockMvcRequestBuilders.post("/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(t1))
                .accept(MediaType.APPLICATION_JSON));

        mvc.perform(MockMvcRequestBuilders.get("/tasks")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id",is(1)))
                .andExpect(jsonPath("$.description",is("Bla")))
                .andExpect(jsonPath("$.creationDate",isA(Date.class)));
    }

    // all other tests

    public static String asJsonString(final Object obj) {
        try {
            final ObjectMapper mapper = new ObjectMapper();
            final String jsonContent = mapper.writeValueAsString(obj);
            return jsonContent;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}