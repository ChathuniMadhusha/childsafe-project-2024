package lk.childsafe.Controller;

import jakarta.transaction.Transactional;
import lk.childsafe.Dao.RoleRepository;
import lk.childsafe.Dao.StudentRepositiry;
import lk.childsafe.Dao.StudentstatusRepositiry;
import lk.childsafe.Dao.UserRepository;
import lk.childsafe.Entity.LogUser;
import lk.childsafe.Entity.ParentStatus;
import lk.childsafe.Entity.Student;
import lk.childsafe.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;


@RestController //awashya services denna
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentRepositiry studentDao;

    @Autowired
    private  StudentstatusRepositiry studentstatusDao;

    @Autowired
    UserRepository userDao;

    @Autowired
    RoleRepository roleDao;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;


    //Load UI
    @GetMapping(value = "")
    public ModelAndView studentUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("Student.html");
        return modelandview;
    }

    //get student list by class registration
    @GetMapping(value = "/byclregistration", params={"cid"}, produces="application/json")
    public List<Student> studentListByRegistration(@RequestParam ("cid") Integer cid){

        return studentDao.getBySession(cid);
    }

    //dashboard count
    @GetMapping(value = "/activestudent", produces = "application/json")
    public Student activeList() {
        return studentDao.findActiveStudent();
    }




    //Get all date from table
    @GetMapping(value = "/findall", produces = "application/json")
    public List<Student> student() {
        return studentDao.findAll();
    }

    @PostMapping

    public String addStudent(@RequestBody Student student){

        try{
                //set auto value
            
                student.setStudentid(studentDao.nextStCode());
                student.setSt_password(bCryptPasswordEncoder.encode(student.getSt_password()));

                //save
                studentDao.save(student);

                //create user
                User user = new User();
                user.setUsername(student.getEmail());
                user.setPassword(student.getSt_password());
                user.setStudent_id(student);
                user.setRole_id(roleDao.getReferenceById(1));
                user.setPhotopath("/assets/img/");
                user.setPhotoname("user1.png");
                userDao.save(user);



                return "0";

            }catch(Exception e){
                return "Student Add not complete :" + e.getMessage();
            }

    }

    //get mapping service for get student by given quary variable id[/student/getbyid?id=1]
    @GetMapping(value = "/getbyid" , produces = "application/json")
    public Student getStudentByQPId(@RequestParam("id") Integer id){
        return studentDao.getReferenceById(id);
    }

    //get student id for parent
    @GetMapping (value = "/getbystudentno",produces = "application/json")
    public Student getByStudentno(@RequestParam("studentno") String studentno){
        return studentDao.findStudentByStudentno(studentno);}


    //get student id for class reg
    @GetMapping (value = "/getbystudentnoforclass",produces = "application/json")
    public Student getByStudentnoforclass(@RequestParam("studentno") String studentno){
        return studentDao.getByStudentnoforclass(studentno);}

    //Update section
    @PutMapping
    @Transactional
    public String putStudent(@RequestBody Student student){
        //check privilage

            //save operate
        try {
                studentDao.save(student);
                return "0";
            }catch(Exception e){
                return "Student Update not complete :" + e.getMessage();
            }
    }

    //create delete mapping
    @DeleteMapping
    public String deleteStudent(@RequestBody Student student){
            Student extstudent = studentDao.getReferenceById(student.getId());
            if(extstudent != null){
                try {

                    extstudent.setStudent_status_id(studentstatusDao.getReferenceById(3));
                    studentDao.save(extstudent);

                    return "0";

                }catch (Exception e){
                    return "Delete not complete :"+e.getMessage();
                }
            }else {
                return "Delete not complete : Student not exist";
            }


    }


    ////////////////loguser profile change////////////////
    @PutMapping("/log")
    public String userupdate(@RequestBody LogUser logUser) {

        try {
            //password eka change krla submit klham eka saved password ekamda kiyla blna oni
            //isselama existing userwa ganna oni
            Student extStu = studentDao.getReferenceById(logUser.getStudent().getId()); // id eka deela object eka gennagnwa

            extStu.setFirst_name(logUser.getStudent().getFirst_name());
            extStu.setLast_name(logUser.getStudent().getLast_name());
            extStu.setEmail(logUser.getStudent().getEmail());
            extStu.setAddress(logUser.getStudent().getAddress());
            extStu.setMobile_number(logUser.getStudent().getMobile_number());


            //dena password eka encode krla eyatama set krla save krnwa
            //user.setPassword(passwordEncoder.encode(user.getPassword()));
            studentDao.save(extStu);
            return "Ok";
        } catch (Exception e) {
            return "User profile change not completed :" + e.getMessage();
        }


    }

}
