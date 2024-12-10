package lk.childsafe.Controller;

import jakarta.transaction.Transactional;
import lk.childsafe.Dao.*;
import lk.childsafe.Entity.*;
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
    StuClzRegRepositiry stuClzRegDao;

    @Autowired
    StuClzStatusRepositiry stuClzStatusDao;

    @Autowired
    ParentRepository parentDao;

    @Autowired
    ParentstatusRepository parentstatusDao;

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

        Student extStudent = studentDao.getStudentsByEmail(student.getEmail());
        if (extStudent != null){
            return "Student already exists : Please use different email address";
        }

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

        Student extStudent = studentDao.getStudentsByEmail(student.getEmail());
        if (extStudent != null){

            if (extStudent.getId() != student.getId()){
                return "Student already exists : Please use different email address";
            }


        }
        //save operate
        try {

            Student extstu = studentDao.getReferenceById(student.getId());

            //Check weather password is change or not--> iF changed set new password
            if (bCryptPasswordEncoder.matches(extstu.getSt_password(), student.getSt_password())) {
                System.out.println("password not changed");


            }else{
               //student.setSt_password(extstu.getSt_password());
                student.setSt_password(bCryptPasswordEncoder.encode(student.getSt_password()));
                studentDao.save(student);

                User logExtUser = userDao.findUserByUsername(student.getEmail());
                logExtUser.setPassword(student.getSt_password());
                userDao.save(logExtUser);
                System.out.println("password changed");
            }

            //class registration In-active when student In-active
            List<StudentClassRegistration> extStClzRegList= stuClzRegDao.getStudentClassRegistrationsByStID(student.getId());
            if (extStClzRegList != null && student.getStudent_status_id().getId() == 2) {
                for (StudentClassRegistration scr : extStClzRegList) {
                        scr.setStu_registration_status_id(stuClzStatusDao.getReferenceById(3));
                        stuClzRegDao.save(scr);
                }
            }

            //class registration Active when student Active
            if (extStClzRegList != null && student.getStudent_status_id().getId() == 1) {
                for (StudentClassRegistration scr : extStClzRegList) {
                    scr.setStu_registration_status_id(stuClzStatusDao.getReferenceById(1));
                    stuClzRegDao.save(scr);
                }
            }

            //Parent registration In-active when student In-active
            Parent extParent = parentDao.getByStudent_id(student.getId());
            if (extParent != null && student.getStudent_status_id().getId() == 2) {
                extParent.setParent_status_id(parentstatusDao.getReferenceById(3));
                parentDao.save(extParent);
            }

            //Parent registration Active when student Active
            if (extParent != null && student.getStudent_status_id().getId() == 1) {
                extParent.setParent_status_id(parentstatusDao.getReferenceById(1));
                parentDao.save(extParent);
            }
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
                    //class registration delete when student delete
                    List<StudentClassRegistration> extStClzRegList= stuClzRegDao.getStudentClassRegistrationsByStID(student.getId());
                    if (extStClzRegList != null) {
                        for (StudentClassRegistration scr : extStClzRegList) {
                            scr.setStu_registration_status_id(stuClzStatusDao.getReferenceById(2));
                            stuClzRegDao.save(scr);
                        }
                    }

                    //Parent delete when student Delete
                    Parent extParent = parentDao.getByStudent_id(student.getId());
                    if (extParent != null) {
                        extParent.setParent_status_id(parentstatusDao.getReferenceById(2));
                        parentDao.save(extParent);
                    }

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
            Student extStu = studentDao.getReferenceById(logUser.getStudent().getId());

            extStu.setFirst_name(logUser.getStudent().getFirst_name());
            extStu.setLast_name(logUser.getStudent().getLast_name());
            extStu.setEmail(logUser.getStudent().getEmail());
            extStu.setAddress(logUser.getStudent().getAddress());
            extStu.setMobile_number(logUser.getStudent().getMobile_number());

            studentDao.save(extStu);
            return "Ok";
        } catch (Exception e) {
            return "User profile change not completed :" + e.getMessage();
        }


    }


    //get mapping service for get student list by parent NIC]
    @GetMapping(value = "/getStByParenetNIC" , produces = "application/json")
    public List<Student> getStudentByNIC(@RequestParam("nic") String nic){
        return studentDao.getStByNic(nic);
    }

}
