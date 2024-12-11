package lk.childsafe.Controller;

import jakarta.transaction.Transactional;
import lk.childsafe.Dao.InstituteRepository;
import lk.childsafe.Dao.InstitutestatusRepository;
import lk.childsafe.Dao.ReportRepository;
import lk.childsafe.Entity.AttendanceReport;
import lk.childsafe.Entity.Institute;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;


@RestController //awashya services denna

public class ReposrtDataController {

    @Autowired
    private ReportRepository reportDao;



    //Load UI
    @GetMapping(value = "")
    public ModelAndView instituteUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("InstituteImplementation.html");
        return modelandview;
    }



    //get student attendance report for student view
    @GetMapping(value = "/attendancereport/byclassandstu", params = {"class_implementation_id","student_id"} ,produces = "application/json")
    public List<AttendanceReport> attendancereport(@RequestParam("class_implementation_id") String class_implementation_id,
                                                       @RequestParam("student_id") String student_id){
        List<AttendanceReport> attendancereportlist = new ArrayList<>();
        String[][] attendancereportstring = reportDao.getAttendance(class_implementation_id,student_id);
        for (String[] attendancers : attendancereportstring){
            AttendanceReport newAttendancereport = new AttendanceReport();
            newAttendancereport.setDate(attendancers[1]);
            newAttendancereport.setFirst_name(attendancers[2]);
            newAttendancereport.setClass_name(attendancers[3]);
            if (attendancers[0].equals("1")){
                newAttendancereport.setPresent_or_absent("Present");
            }
            else {
                newAttendancereport.setPresent_or_absent("Absent");
            }

            attendancereportlist.add(newAttendancereport);
        }
        return attendancereportlist;
    }














}
