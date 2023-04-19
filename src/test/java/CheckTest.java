import org.junit.jupiter.api.*;

import static org.assertj.core.api.Assertions.assertThat;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class CheckTest {

        @Test
        @Order(1)
        public void runCheckTest() {
            int a = 1;
            int b = 2;
            assertThat(a + b).isEqualTo(3);
        }
}
