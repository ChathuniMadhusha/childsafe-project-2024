package lk.childsafe.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data//create setters and getters
@AllArgsConstructor
@NoArgsConstructor
public class ForgetUser {

    private String currunt_password;
    private String new_password;
    private String re_new_password;


}
