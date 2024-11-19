package lk.childsafe.Controller;

import lk.childsafe.Dao.StuClzStatusRepositiry;
import lk.childsafe.Dao.TeacherstatusRepository;
import lk.childsafe.Entity.StudentRegStatus;
import lk.childsafe.Entity.TeacherStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/sturegstatus")
public class StuClzStatusController {


    @Autowired
    StuClzStatusRepositiry stuClzStatusDao;

    @GetMapping(value = "/findall", produces = "application/json")
    public List<StudentRegStatus> stuClzRegStatus() {
        return stuClzStatusDao.findAll();
    }

}
