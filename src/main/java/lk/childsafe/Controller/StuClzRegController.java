package lk.childsafe.Controller;

import lk.childsafe.Dao.*;
import lk.childsafe.Entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;


@RestController
@RequestMapping("/stureg")
public class StuClzRegController {


    @Autowired
    StuClzRegRepositiry stuClzRegDao;

    @Autowired
    StuClzStatusRepositiry stuClzStatusDao;

    @Autowired
    StudentRepositiry studentDao;

    @Autowired
    StudentstatusRepositiry studentstatusDao;


    //Load UI
    @GetMapping(value = "")
    public ModelAndView stuClzRegUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("StudentRegistration.html");
        return modelandview;
    }

    @GetMapping(value = "/findall", produces = "application/json")
    public List<StudentClassRegistration> stuClassReg() {
        return stuClzRegDao.findAll();
    }

    //get mapping service for get student by given quary variable id[/student/getbyid?id=1]
    @GetMapping(value = "/getbyid" , produces = "application/json")
    public StudentClassRegistration getRegByQPId(@RequestParam("id") Integer id){
        return stuClzRegDao.getReferenceById(id);
    }


    //register wela inna student ta adalawa eya reg wela inna classes count eka
    @GetMapping(value = "/getclassaccorstu",params = "studentid",produces = "application/json")
    public StudentClassRegistration getclassaccorstu(@RequestParam("studentid")Integer studentid){
        return stuClzRegDao.getClassbyStudent(studentid);
    }

    //get register class list according to student
    @GetMapping(value = "/getclasslistaccorstu",params = "studentid",produces = "application/json")
    public List<StudentClassRegistration> getclassliststu(@RequestParam("studentid")Integer studentid){
        return stuClzRegDao.getClass(studentid);
    }


    @PostMapping
    public String addReg(@RequestBody StudentClassRegistration studentClassRegistration){

        StudentClassRegistration activereg = stuClzRegDao.findduplicateregByStID(studentClassRegistration.getStudent_id().getStudentid(),studentClassRegistration.getClass_implementation_id().getClass_code());

        if (activereg != null) {
            // Parent with student ID exists and is active
            return "Registration insert not complete: Student ID is already linked to Selected Class";
        }

        // Proceed with saving if no active parent is found
        try {
            //set auto value
            studentClassRegistration.setStu_class_code(stuClzRegDao.nexTeCode());

            stuClzRegDao.save(studentClassRegistration);

            //change studenat status
            Student student = studentDao.getReferenceById(studentClassRegistration.getStudent_id().getId());

            student.setStudent_status_id(studentstatusDao.getReferenceById(1));
            studentDao.save(student);


            return "0";

        } catch (Exception e) {
            return "Details Add not complete: " + e.getMessage();
        }


    }

    //Update section
    @PutMapping
    public String putReg(@RequestBody StudentClassRegistration studentClassRegistration){
        StudentClassRegistration activereg = stuClzRegDao.findduplicateregByStID(studentClassRegistration.getStudent_id().getStudentid(),studentClassRegistration.getClass_implementation_id().getClass_code());

        if (activereg != null) {
            // Parent with student ID exists and is active
            return "Registration insert not complete: Student ID is already linked to Selected Class";
        }
        //save operate
        try {
            stuClzRegDao.save(studentClassRegistration);
            return "0";
        }catch(Exception e){
            return "Parent Update not complete :" + e.getMessage();
        }
    }

    //create delete mapping
    @DeleteMapping
    public String deleteReg(@RequestBody StudentClassRegistration studentClassRegistration){
        StudentClassRegistration extreg = stuClzRegDao.getReferenceById(studentClassRegistration.getId());
        if(extreg != null){
            try {

                extreg.setStu_registration_status_id(stuClzStatusDao.getReferenceById(2));
                stuClzRegDao.save(extreg);

                return "0";

            }catch (Exception e){
                return "Delete not complete :"+e.getMessage();
            }
        }else {
            return "Delete not complete : Teacher not exist";
        }


    }

}
