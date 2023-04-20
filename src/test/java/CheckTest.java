import org.junit.jupiter.api.*;

import static org.assertj.core.api.Assertions.assertThat;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class CheckTest {

    @Test
    @Order(1)
    public void runCheckTest1() {
        int a = 1;
        int b = 2;
        assertThat(a + b).isEqualTo(3);
    }

    @Test
    @Order(2)
    public void runCheckTest2() {
        int a = 2;
        int b = 1;
        assertThat(a + b).isEqualTo(3);
    }
}
