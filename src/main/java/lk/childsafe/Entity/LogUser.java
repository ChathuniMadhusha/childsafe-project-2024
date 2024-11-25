package lk.childsafe.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data//create setters and getters
@AllArgsConstructor
@NoArgsConstructor
public class LogUser {

    private String username;
    private String role;
    private String photopath;
    private String photoname;
}
