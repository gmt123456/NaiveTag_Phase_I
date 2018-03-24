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

    private static final int TOTAL_MARK = 100;
    private static final int SINGLE_SQUARE_MARK = 200;
    private static final int MULTI_SQUARE_MARK = 300;
    private static final int AREA_MARK = 400;
    private static final int TOTAL_DESCRIBE = 101;
    private static final int SINGLE_SQUARE_DESCRIBE = 201;
    private static final int MULTI_SQUARE_DESCRIBE = 301;
    private static final int AREA_DESCRIBE = 401;

    static final String TASK_TYPE = "taskType";

    static final String FORMAT = "format";

    static final String DESCRIPTION = "description";

    static final String CLASSES = "classes";

    static final Set<Integer> WITH_CLASS_PROBLEMS = new HashSet<Integer>();

    static final Set<Integer> WITHOUT_CLASS_PROBLEMS = new HashSet<Integer>();

    static {
        WITH_CLASS_PROBLEMS.add(TOTAL_MARK);
        WITH_CLASS_PROBLEMS.add(SINGLE_SQUARE_MARK);
        WITH_CLASS_PROBLEMS.add(MULTI_SQUARE_MARK);

        WITHOUT_CLASS_PROBLEMS.add(AREA_MARK);
        WITHOUT_CLASS_PROBLEMS.add(TOTAL_DESCRIBE);
        WITHOUT_CLASS_PROBLEMS.add(SINGLE_SQUARE_DESCRIBE);
        WITHOUT_CLASS_PROBLEMS.add(MULTI_SQUARE_DESCRIBE);
        WITHOUT_CLASS_PROBLEMS.add(AREA_DESCRIBE);
    }

}
