package inspector;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Path ("/helloworld")

public class Resource {

	@GET
	@Produces ("text/plain")
	public String sayHello() {
	return "Hello World";
	}

}
