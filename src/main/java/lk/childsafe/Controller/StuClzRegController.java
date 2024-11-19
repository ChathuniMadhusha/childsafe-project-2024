package lk.childsafe.Controller;

import lk.childsafe.Dao.StuClzRegRepositiry;
import lk.childsafe.Dao.TeacherstatusRepository;
import lk.childsafe.Entity.StudentClassRegistration;
import lk.childsafe.Entity.TeacherStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;


@RestController
@RequestMapping("/stureg")
public class StuClzRegController {


    @Autowired
    StuClzRegRepositiry stuClzRegDao;

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

}
