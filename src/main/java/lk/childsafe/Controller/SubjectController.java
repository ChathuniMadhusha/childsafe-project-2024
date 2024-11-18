package lk.childsafe.Controller;

import lk.childsafe.Dao.GradeRepository;
import lk.childsafe.Dao.SubjectRepository;
import lk.childsafe.Entity.Grade;
import lk.childsafe.Entity.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController //awashya services denna
@RequestMapping("/subject")
public class SubjectController {


    @Autowired
    SubjectRepository subjectDao;

    @GetMapping(value = "/findall", produces = "application/json")
    public List<Subject> subjects() {return subjectDao.findAll();}

}
