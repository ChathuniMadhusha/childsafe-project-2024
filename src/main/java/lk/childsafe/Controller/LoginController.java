package lk.childsafe.Controller;

import lk.childsafe.Dao.RoleRepository;
import lk.childsafe.Dao.UserRepository;
import lk.childsafe.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class LoginController {

    @Autowired
    private UserRepository userDao;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private RoleRepository roleDao;

    @GetMapping(value = "/createadmin")
    public String createAdmin(){
        User extadminuser = userDao.findUserByUsername("Admin");
        if(extadminuser == null){
            User newAdminUser = new User();

            newAdminUser.setUsername("Admin");
            newAdminUser.setPassword(bCryptPasswordEncoder.encode("12345"));
            //newAdminUser.setPassword("12345");
            newAdminUser.setRole_id(roleDao.getReferenceById(4));

            userDao.save(newAdminUser);

        }
        return "<script>window.location.replace('/login');</script>";
    }

    @RequestMapping(value = "/dashboard",method = RequestMethod.GET)
    public ModelAndView welcome(){
        ModelAndView dashboardUI = new ModelAndView();
        dashboardUI.setViewName("index.html");
        return dashboardUI;
    }

    @GetMapping(value = "/login")
    public ModelAndView LoginUi(){
        ModelAndView loginUi = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth != null || auth instanceof AnonymousAuthenticationToken){
            SecurityContextHolder.clearContext();
        }
        System.out.println(auth);
        loginUi.setViewName("login.html");
        return loginUi;
    }

    @GetMapping(value = "/login",params = "error")
    public ModelAndView LoginErrorUi(@RequestParam("error") String error){
        ModelAndView loginUi = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth != null || auth instanceof AnonymousAuthenticationToken){
            SecurityContextHolder.clearContext();
        }
        loginUi.setViewName("login.html");
        return loginUi;
    }

    @GetMapping(value = "/accessdenied")
    public ModelAndView accessDenied(){
        ModelAndView accessdenied = new ModelAndView();
        accessdenied.setViewName("404.html");
        return accessdenied;
    }

}
