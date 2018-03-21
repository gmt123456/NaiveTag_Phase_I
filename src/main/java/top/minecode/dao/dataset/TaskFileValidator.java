package top.minecode.dao.dataset;

import top.minecode.dao.utils.JsonFileParser;

/**
 * Created on 2018/3/21.
 * Description:
 *
 * @author iznauy
 */
public class TaskFileValidator {

    private JsonFileParser parser;

    public TaskFileValidator(String fileName) {
        try {
            parser = new JsonFileParser(fileName);
        } catch (Exception e) {
            e.printStackTrace();
            parser = null;
        }
    }

    public boolean validTask() {

        if (parser == null || parser.getString(DataSetConfig.FORMAT) == null || parser.getString(DataSetConfig.DESCRIPTION) == null)
            return false;

        int taskCode = parser.getInteger(DataSetConfig.TASK_TYPE);

        if (DataSetConfig.WITHOUT_CLASS_PROBLEMS.contains(taskCode))
            return true;
        else if (DataSetConfig.WITH_CLASS_PROBLEMS.contains(taskCode))
            return !(parser.getStringList(DataSetConfig.CLASSES) == null);
        else
            return false;


    }

}
