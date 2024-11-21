package lk.childsafe.Controller;

import jakarta.transaction.Transactional;
import lk.childsafe.Dao.*;
import lk.childsafe.Entity.ParentStatus;
import lk.childsafe.Entity.Student;
import lk.childsafe.Entity.Teacher;
import lk.childsafe.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
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

    //Load UI
    @GetMapping(value = "")
    public ModelAndView teacherUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("Teacher.html");
        return modelandview;
    }

    //get all
    @GetMapping(value = "/findall", produces = "application/json")
    public List<Teacher> teacher() {return teacherDao.findAll();}

    //get mapping service for get teacher by given quary variable id[/teacher/getbyid?id=1]
    @GetMapping(value = "/getbyid" , produces = "application/json")
    public Teacher getTeacherByQPId(@RequestParam("id") Integer id){
        return teacherDao.getReferenceById(id);
    }


    //Add section
    @PostMapping
    @Transactional
    public String addTeacher(@RequestBody Teacher teacher){

        try{
            //set auto value
            teacher.setTeacherid(teacherDao.nexTeCode());

            //create user
            User user = new User();
            user.setUsername(teacher.getTeacherid());
            user.setPassword(teacher.getTe_password());
            user.setTeacher_id(teacher);
            user.setRole_id(roleDao.getReferenceById(2));
            userDao.save(user);


            //save
            teacherDao.save(teacher);
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

}
