package lk.childsafe.Controller;

import jakarta.transaction.Transactional;
import lk.childsafe.Dao.AttendanceRepository;
import lk.childsafe.Dao.ClassImpleStatusRepository;
import lk.childsafe.Dao.ClassImplementationsRepository;
import lk.childsafe.Entity.Attendance;
import lk.childsafe.Entity.Attendance_Has_Student;
import lk.childsafe.Entity.ClassImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@RestController //awashya services denna
@RequestMapping("/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceRepository attendanceDao;


    //Load UI
    @GetMapping(value = "")
    public ModelAndView attendanceUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("StudentAttendance.html");
        return modelandview;
    }

    //Get all date from table
    @GetMapping(value = "/findall", produces = "application/json")
    public List<Attendance> attendance() {
        return attendanceDao.findAll();
    }



    @PostMapping
    public String addAttendance(@RequestBody Attendance attendance){



        try{

            for(Attendance_Has_Student ahs :attendance.getAttendance_has_students()){
                ahs.setAttendance_id(attendance);
            }
            System.out.println(attendance);
            attendanceDao.save(attendance);

            return "0";

        }catch(Exception e){
            return "Attendance Add not complete :" + e.getMessage();
        }

    }



}
