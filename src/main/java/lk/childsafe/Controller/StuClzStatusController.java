package lk.childsafe.Controller;

import lk.childsafe.Dao.TeacherstatusRepository;
import lk.childsafe.Entity.TeacherStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/teacherstatus")
public class StuClzStatusController {


    @Autowired
    TeacherstatusRepository teacherstatusDao;

    @GetMapping(value = "/findall", produces = "application/json")
    public List<TeacherStatus> teacherStatus() {
        return teacherstatusDao.findByIdNot(3);
    }

}
