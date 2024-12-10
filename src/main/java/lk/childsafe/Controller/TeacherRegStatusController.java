package lk.childsafe.Controller;

import lk.childsafe.Dao.TeacherRegStatusRepository;
import lk.childsafe.Entity.TeacherRegStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;


@RestController //awashya services denna
@RequestMapping("/teacherregstatus")
public class TeacherRegStatusController {


    @Autowired
    TeacherRegStatusRepository teacherregstatusDao;

    //refill without delete
    @GetMapping(value = "/findall", produces = "application/json")
    public List<TeacherRegStatus> teacherRegStatuses() {
        return teacherregstatusDao.findByIdNot(3);
    }

    //only active for refreshform
    @GetMapping(value = "/findactive", produces = "application/json")
    public List<TeacherRegStatus> teacherRegActive() {
        return teacherregstatusDao.findByStatuss(3,2);
    }


}
