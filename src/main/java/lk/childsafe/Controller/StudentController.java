package lk.childsafe.Controller;

import lk.childsafe.Dao.StudentRepositiry;
import lk.childsafe.Dao.StudentstatusRepositiry;
import lk.childsafe.Entity.ParentStatus;
import lk.childsafe.Entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;


@RestController //awashya services denna
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentRepositiry studentDao;

    @GetMapping(value = "")
    public ModelAndView studentUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("Student.html");
        return modelandview;
    }

    @GetMapping(value = "/findall", produces = "application/json")
    public List<Student> student() {return studentDao.findAll();}



}