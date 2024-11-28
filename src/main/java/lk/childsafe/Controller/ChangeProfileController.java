package lk.childsafe.Controller;

import lk.childsafe.Dao.*;
import lk.childsafe.Entity.Parent;
import lk.childsafe.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;


@RestController
@RequestMapping("/changeprofile")
public class ChangeProfileController {


    @Autowired
    UserRepository userDao;

    @Autowired
    RoleRepository roleDao;

    //Load UI
    @GetMapping(value = "")
    public ModelAndView changeUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("change-profile.html");
        return modelandview;
    }


}
