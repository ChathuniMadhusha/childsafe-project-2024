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

    //Load UI
    @GetMapping(value = "")
    public ModelAndView studentUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("Student.html");
        return modelandview;
    }

    //Get all date from table
    @GetMapping(value = "/findall", produces = "application/json")
    public List<Student> student() {return studentDao.findAll();}

    @PostMapping
    @Transactional
    public String addStudent(@RequestBody Student student){

        try{
                //set auto value
                //student.setStudentid(studentDao.nextSupCode());

                //save
                studentDao.save(student);
                return "0";

            }catch(Exception e){
                return "Student Add not complete :" + e.getMessage();
            }

    }




}
