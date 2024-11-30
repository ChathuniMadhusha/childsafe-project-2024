package lk.childsafe.Controller;

import jakarta.transaction.Transactional;
import lk.childsafe.Dao.*;
import lk.childsafe.Entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;


@RestController
@RequestMapping("/teacher")
public class TeacherController {


    @Autowired
    private TeacherRepository teacherDao;

    @Autowired
    private TeacherstatusRepository teacherstatusDao;

    @Autowired
    UserRepository userDao;

    @Autowired
    RoleRepository roleDao;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    //Load UI
    @GetMapping(value = "")
    public ModelAndView teacherUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("Teacher.html");
        return modelandview;
    }

    //dashboard count
    @GetMapping(value = "/activeTeachers", produces = "application/json")
    public Teacher activeList() {
        return teacherDao.findActiveTeacher();
    }



    //get all
    @GetMapping(value = "/findall", produces = "application/json")
    public List<Teacher> teacher() {return teacherDao.findAll();}

    //get mapping service for get teacher by given quary variable id[/teacher/getbyid?id=1]
    @GetMapping(value = "/getbyid" , produces = "application/json")
    public Teacher getTeacherByQPId(@RequestParam("id") Integer id){
        return teacherDao.getReferenceById(id);
    }


    //get tecaher's first name
    @GetMapping (value = "/getbyteacherid",produces = "application/json")
    public Teacher getByTeacherId(@RequestParam("teacherid") String teacherid){
        return teacherDao.findTeacherByTeacherID(teacherid);}


    //Add section
    @PostMapping
    @Transactional
    public String addTeacher(@RequestBody Teacher teacher){

        try{

            //set auto value
            teacher.setTeacherid(teacherDao.nexTeCode());
            teacher.setTe_password(bCryptPasswordEncoder.encode(teacher.getTe_password()));
            //save
            teacherDao.save(teacher);

            //create user
            User user = new User();
            user.setUsername(teacher.getEmail());
            user.setPassword(bCryptPasswordEncoder.encode(teacher.getTe_password()));
            user.setTeacher_id(teacher);
            user.setRole_id(roleDao.getReferenceById(2));
            user.setPhotopath("/assets/img");
            user.setPhotoname("user1.png");
            userDao.save(user);



            return "0";

        }catch(Exception e){
            return "Teacher Add not complete :" + e.getMessage();
        }

    }

    //Update section
    @PutMapping
    @Transactional
    public String putTeacher(@RequestBody Teacher teacher){
        //check privilage

        //save operate
        try {
            teacherDao.save(teacher);
            return "0";
        }catch(Exception e){
            return "Teacher Update not complete :" + e.getMessage();
        }
    }

    //create delete mapping
    @DeleteMapping
    public String deleteTeacher(@RequestBody Teacher teacher){
        Teacher extteacher = teacherDao.getReferenceById(teacher.getId());
        if(extteacher != null){
            try {

                extteacher.setTeacher_status_id(teacherstatusDao.getReferenceById(3));
                teacherDao.save(extteacher);

                return "0";

            }catch (Exception e){
                return "Delete not complete :"+e.getMessage();
            }
        }else {
            return "Delete not complete : Teacher not exist";
        }
    }

    ////////////////loguser profile change////////////////
    @PutMapping("/log")
    public String userupdate(@RequestBody LogUser logUser) {

        try {
            //password eka change krla submit klham eka saved password ekamda kiyla blna oni
            //isselama existing userwa ganna oni
            Teacher exttchr = teacherDao.getReferenceById(logUser.getTeacher().getId()); // id eka deela object eka gennagnwa

            exttchr.setFirst_name(logUser.getTeacher().getFirst_name());
            exttchr.setLast_name(logUser.getTeacher().getLast_name());
            exttchr.setEmail(logUser.getTeacher().getEmail());
            exttchr.setAddress(logUser.getTeacher().getAddress());
            exttchr.setMobile_number(logUser.getTeacher().getMobile_number());


            //dena password eka encode krla eyatama set krla save krnwa
            //user.setPassword(passwordEncoder.encode(user.getPassword()));
            teacherDao.save(exttchr);
            return "Ok";
        } catch (Exception e) {
            return "User profile change not completed :" + e.getMessage();
        }


    }

}
