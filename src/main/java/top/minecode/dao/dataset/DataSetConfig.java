package top.minecode.dao.dataset;


import java.util.HashSet;
import java.util.Set;

/**
 * Created on 2018/3/21.
 * Description:
 *
 * @author iznauy
 */
class DataSetConfig {

    static final String TASK_TYPE = "taskType";

    static final String FORMAT = "format";

    static final String DESCRIPTION = "description";

    static final String CLASSES = "classes";

    static final Set<Integer> WITH_CLASS_PROBLEMS = new HashSet<Integer>();

    static final Set<Integer> WITHOUT_CLASS_PROBLEMS = new HashSet<Integer>();

    static {
        WITH_CLASS_PROBLEMS.add(101);
        WITH_CLASS_PROBLEMS.add(201);
        WITH_CLASS_PROBLEMS.add(301);
        WITH_CLASS_PROBLEMS.add(401);

        WITHOUT_CLASS_PROBLEMS.add(100);
        WITHOUT_CLASS_PROBLEMS.add(200);
        WITHOUT_CLASS_PROBLEMS.add(300);
        WITHOUT_CLASS_PROBLEMS.add(400);
    }

}
