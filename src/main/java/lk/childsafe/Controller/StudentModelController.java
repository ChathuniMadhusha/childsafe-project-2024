package lk.childsafe.Controller;

import lk.childsafe.Dao.GradeRepository;
import lk.childsafe.Entity.Grade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;


@RestController
@RequestMapping("/studentmodel")
public class StudentModelController {


    //Load UI
    @GetMapping(value = "")
    public ModelAndView studentModelUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("StudentModel.html");
        return modelandview;
    }

}
