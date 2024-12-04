package lk.childsafe.Controller;

import lk.childsafe.Dao.AttendanceRepository;
import lk.childsafe.Entity.Attendance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;


@RestController //awashya services denna
@RequestMapping("/teacherview")
public class TeacherViewController {

    @Autowired
    private AttendanceRepository attendanceDao;

    //Load UI
    @GetMapping(value = "")
    public ModelAndView teacherviewUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("Teacherview.html");
        return modelandview;
    }


    //get attendance details by class id
    @GetMapping(value = "/getclassdetailsbyid/{cid}",produces = "application/json")
    public List<Attendance>  attendanceDetailsByCid(@PathVariable("cid") Integer cid){
        return attendanceDao.geAttByCid(cid);
    }




}
