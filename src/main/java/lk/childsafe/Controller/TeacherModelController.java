package lk.childsafe.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;


@RestController
@RequestMapping("/teachermodel")
public class TeacherModelController {


    //Load UI
    @GetMapping(value = "")
    public ModelAndView studentModelUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("TeacherModel.html");
        return modelandview;
    }

}
