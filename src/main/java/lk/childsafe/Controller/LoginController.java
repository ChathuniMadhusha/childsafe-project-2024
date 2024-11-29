package lk.childsafe.Controller;

import lk.childsafe.Dao.RoleRepository;
import lk.childsafe.Dao.UserRepository;
import lk.childsafe.Entity.LogUser;
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

    @RequestMapping(value = "/createaccount",method = RequestMethod.GET)
    public ModelAndView createaccount(){
        ModelAndView createaccountUI = new ModelAndView();
        createaccountUI.setViewName("pages-register.html");
        return createaccountUI;
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

    @GetMapping(value = "/error")
    public ModelAndView accessDenied(){
        ModelAndView accessdenied = new ModelAndView();
        accessdenied.setViewName("404.html");
        return accessdenied;
    }



    //get logged user
    @GetMapping(value = "/loguser",produces = "application/json")
    public LogUser getLoggedUserDetails(){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User logExtUser = userDao.findUserByUsername(auth.getName());

        if(logExtUser != null && !(auth instanceof AnonymousAuthenticationToken)){
            LogUser loggeUser = new LogUser();

            String username = logExtUser.getUsername();
            loggeUser.setUsername(username);

            String role = logExtUser.getRole_id().getName();
            loggeUser.setRole(role);

            loggeUser.setPhotoname(logExtUser.getPhotoname());
            loggeUser.setPhotopath(logExtUser.getPhotopath());

            return loggeUser;
        }else {
            return null;
        }
    }

}
