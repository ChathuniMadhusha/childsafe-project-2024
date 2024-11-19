package lk.childsafe.Controller;

import jakarta.transaction.Transactional;
import lk.childsafe.Dao.StudentRepositiry;
import lk.childsafe.Dao.StudentstatusRepositiry;
import lk.childsafe.Entity.ParentStatus;
import lk.childsafe.Entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
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

    //Load UI
    @GetMapping(value = "")
    public ModelAndView studentUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("Student.html");
        return modelandview;
    }

    //Get all date from table
    @GetMapping(value = "/findall", produces = "application/json")
    public List<Student> student() {
        return studentDao.findAll();
    }

    @PostMapping
    @Transactional
    public String addStudent(@RequestBody Student student){

        try{
                //set auto value
                student.setStudentid(studentDao.nextStCode());

                //save
                studentDao.save(student);
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

}
