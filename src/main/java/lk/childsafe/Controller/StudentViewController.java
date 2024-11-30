package lk.childsafe.Controller;

import jakarta.transaction.Transactional;
import lk.childsafe.Dao.RoleRepository;
import lk.childsafe.Dao.StudentRepositiry;
import lk.childsafe.Dao.StudentstatusRepositiry;
import lk.childsafe.Dao.UserRepository;
import lk.childsafe.Entity.LogUser;
import lk.childsafe.Entity.Student;
import lk.childsafe.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;


@RestController //awashya services denna
@RequestMapping("/studentview")
public class StudentViewController {

    //Load UI
    @GetMapping(value = "")
    public ModelAndView studentviewUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("Studentview.html");
        return modelandview;
    }



}
