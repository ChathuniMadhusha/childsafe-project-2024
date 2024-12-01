package lk.childsafe.Controller;

import jakarta.transaction.Transactional;
import lk.childsafe.Dao.ClassImpleStatusRepository;
import lk.childsafe.Dao.ClassImplementationsRepository;
import lk.childsafe.Dao.InstituteRepository;
import lk.childsafe.Dao.InstitutestatusRepository;
import lk.childsafe.Entity.ClassImplementation;
import lk.childsafe.Entity.Institute;
import lk.childsafe.Entity.Student;
import lk.childsafe.Entity.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDate;
import java.util.List;


@RestController //awashya services denna
@RequestMapping("/classImplementation")
public class ClassImplementationsController {

    @Autowired
    private ClassImplementationsRepository classimplementationDao;

    @Autowired
    private ClassImpleStatusRepository classimplementationstatusDao;

    //Load UI
    @GetMapping(value = "")
    public ModelAndView classimpleUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("ClassImplementation.html");
        return modelandview;
    }

    //dashboard count
    @GetMapping(value = "/activeClasses", produces = "application/json")
    public ClassImplementation activeList() {
        return classimplementationDao.findActiveClasses();
    }



    //Get all date from table
    @GetMapping(value = "/findall", produces = "application/json")
    public List<ClassImplementation> classImplementations() {
        return classimplementationDao.findAll();
    }


    //active-class
    @GetMapping(value = "/activeclass", produces = "application/json")
    public List<ClassImplementation> activeclass() {
        return classimplementationDao.getActiveClass();
    }

    //get class name according to class code
    @GetMapping (value = "/getbyclassname",produces = "application/json")
    public ClassImplementation getByClassname(@RequestParam("class_name") String class_name){
        return classimplementationDao.findClassByClassCode(class_name);}


    //get mapping service for get storage by given quary variable id[/classImplementation/getbyid?id=1]
    @GetMapping(value = "/getbyid" , produces = "application/json")
    public ClassImplementation getClassById(@RequestParam("id") Integer id){
        return classimplementationDao.getReferenceById(id);
    }



    @PostMapping
    @Transactional
    public String addClass(@RequestBody ClassImplementation classImplementation){


        ClassImplementation extclassimplementation = classimplementationDao.getClassByCourse_code(classImplementation.getClass_name());
        if(extclassimplementation != null){
            return "Cannot add this Class : Class name already exist";
        }
        try{
            //tyena last code number eka gannwa
            String lastCode = classimplementationDao.getNextNumber();
            String nextCode = "";

            //ada date eka gannawa
            LocalDate nowDate = LocalDate.now();

            //eeka enne int agayak nisa eka string wlata harawa gannwa
            String nowYearLastTwo = String.valueOf(nowDate.getYear()).substring(2,4);

            System.out.println(lastCode);
            System.out.println(lastCode.substring(0,2));

            //awasana number ekak tynwda nadda kiyla check krnwa
            //tynwnm......
            if(lastCode != null ||  !lastCode.equals("")){
                //24001
                String lastCodeLastTwo = lastCode.substring(0,2);
                if(nowYearLastTwo.equals(lastCodeLastTwo)){
                    nextCode = lastCodeLastTwo + String.format("%03d", Integer.valueOf(lastCode.substring(3))+1);
                }else {
                    nextCode =  nowYearLastTwo + "001";
                }

            }else {
                nextCode =  nowYearLastTwo + "001";
            }

            System.out.println(nextCode);


            classImplementation.setClass_code(nextCode);
            //save
            classimplementationDao.save(classImplementation);
            return "0";

        }catch(Exception e){
            return "Class Add not complete :" + e.getMessage();
        }

    }


    //Update section
    @PutMapping
    @Transactional
    public String putClass(@RequestBody ClassImplementation classImplementation){


        ClassImplementation extclassimplementation = classimplementationDao.getClassByCourse_code(classImplementation.getClass_name());
        if(extclassimplementation != null){
            return "Cannot add this Class : Class name already exist";
        }
        //save operate
        try {
            classimplementationDao.save(classImplementation);
            return "0";
        }catch(Exception e){
            return "Class Details Update not complete :" + e.getMessage();
        }
    }


    //create delete mapping
    @DeleteMapping
    public String deleteClass(@RequestBody ClassImplementation classImplementation){
        ClassImplementation extclassimplement = classimplementationDao.getReferenceById(classImplementation.getId());
        if(extclassimplement != null){
            try {

                extclassimplement.setClass_status_id(classimplementationstatusDao.getReferenceById(3));
                classimplementationDao.save(extclassimplement);

                return "0";

            }catch (Exception e){
                return "Delete not complete :"+e.getMessage();
            }
        }else {
            return "Delete not complete : Class is not exist";
        }


    }
















}
