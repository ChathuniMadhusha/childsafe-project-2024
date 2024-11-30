package lk.childsafe.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;


@RestController //awashya services denna
@RequestMapping("/teacherview")
public class TeacherViewController {

    //Load UI
    @GetMapping(value = "")
    public ModelAndView teacherviewUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("Teacherview.html");
        return modelandview;
    }



}
