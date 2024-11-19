package lk.childsafe.Controller;

import lk.childsafe.Dao.GradeRepository;
import lk.childsafe.Dao.InstitutestatusRepository;
import lk.childsafe.Entity.Grade;
import lk.childsafe.Entity.InstituteStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController //awashya services denna
@RequestMapping("/grade")
public class GradeController {


    @Autowired
    GradeRepository gradeDao;

    @GetMapping(value = "/findall", produces = "application/json")
    public List<Grade> grades() {return gradeDao.findAll();}

}
