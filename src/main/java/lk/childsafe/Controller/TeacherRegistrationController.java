package lk.childsafe.Controller;

import jakarta.transaction.Transactional;
import lk.childsafe.Dao.*;
import lk.childsafe.Entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;


@RestController //awashya services denna
@RequestMapping("/teacherregistration")
public class TeacherRegistrationController {

    @Autowired
    private TeacherRegistrationRepository teacherregistrationDao;

    @Autowired
    private TeacherRegStatusRepository teacherregstatusDao;

    @Autowired
    private TeacherRepository teacherDao;

    @Autowired
    private TeacherstatusRepository teacherstatusDao;

    //Load UI
    @GetMapping(value = "")
    public ModelAndView teacherregistrationleUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("TeacherRegistration.html");
        return modelandview;
    }

    //Get all date from table
    @GetMapping(value = "/findall", produces = "application/json")
    public List<TeacherRegistration> teacherRegistrations() {
        return teacherregistrationDao.findAll();
    }


    @GetMapping(value = "/getbyid" , produces = "application/json")
    public TeacherRegistration getRegistrationById(@RequestParam("id") Integer id){
        return teacherregistrationDao.getReferenceById(id);
    }

    //register wela inna teacherta ta adalawa eya reg wela inna classes count eka
    @GetMapping(value = "/getclassaccorteacher",params = "teacherid",produces = "application/json")
    public TeacherRegistration getclassaccorteac(@RequestParam("teacherid")Integer teacherid){
        return teacherregistrationDao.getClassbyTeacher(teacherid);
    }


    //get register class list according to teacher
    @GetMapping(value = "/getclasslistaccorteac",params = "teacherid",produces = "application/json")
    public List<TeacherRegistration> getclasslisttea(@RequestParam("teacherid")Integer teacherid){
        return teacherregistrationDao.getClassListByTeacher(teacherid);
    }


    @PostMapping
    @Transactional
    public String addTeacherregistration(@RequestBody TeacherRegistration teacherRegistration){

        try{

            //set auto value
            //teacherRegistration.setTeacher_reg_code(teacherregistrationDao.nexTeRegCode());
            teacherRegistration.setTeacher_reg_code("TEC0001");

            //save
            teacherregistrationDao.save(teacherRegistration);
            //change teacher status
            Teacher teacher = teacherDao.getReferenceById(teacherRegistration.getTeacher_id().getId());

            teacher.setTeacher_status_id(teacherstatusDao.getReferenceById(1));
            teacherDao.save(teacher);


            return "0";

        }catch(Exception e){
            return "Registration Add not complete :" + e.getMessage();
        }

    }



    @DeleteMapping
    public String deleteTeacherRegistration(@RequestBody TeacherRegistration teacherRegistration) {
        TeacherRegistration extTeacherReg = teacherregistrationDao.getReferenceById(teacherRegistration.getId());
        if (extTeacherReg != null) {
            try {

                extTeacherReg.setTeacher_reg_status_id(teacherregstatusDao.getReferenceById(3));
                teacherregistrationDao.save(extTeacherReg);

                return "0";

            } catch (Exception e) {
                return "Delete not complete :" + e.getMessage();
            }
        } else {
            return "Delete not complete : Teacher Regsitration is not exist";
        }


    }




    //Update section
    @PutMapping
    @Transactional
    public String putTeacherReg(@RequestBody TeacherRegistration teacherRegistration){
        //check privilage

        //save operate
        try {
            teacherregistrationDao.save(teacherRegistration);
            return "0";
        }catch(Exception e){
            return "Teacher Registration Update not complete :" + e.getMessage();
        }
    }



}
