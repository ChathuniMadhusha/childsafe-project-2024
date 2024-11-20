package lk.childsafe.Controller;

import jakarta.transaction.Transactional;
import lk.childsafe.Dao.ClassImpleStatusRepository;
import lk.childsafe.Dao.ClassImplementationsRepository;
import lk.childsafe.Dao.TeacherRegStatusRepository;
import lk.childsafe.Dao.TeacherRegistrationRepository;
import lk.childsafe.Entity.ClassImplementation;
import lk.childsafe.Entity.Institute;
import lk.childsafe.Entity.TeacherRegistration;
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


    @PostMapping
    @Transactional
    public String addTeacherregistration(@RequestBody TeacherRegistration teacherRegistration){

        try{

            //set auto value
            teacherRegistration.setTeacher_reg_code(teacherregistrationDao.nexTeRegCode());

            //save
            teacherregistrationDao.save(teacherRegistration);
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
