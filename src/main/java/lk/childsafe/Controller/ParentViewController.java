package lk.childsafe.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;


@RestController //awashya services denna
@RequestMapping("/parentview")
public class ParentViewController {

    //Load UI
    @GetMapping(value = "")
    public ModelAndView parentviewUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("Parentview.html");
        return modelandview;
    }



}
