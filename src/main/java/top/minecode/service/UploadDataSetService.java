package top.minecode.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import top.minecode.dao.dataset.DataSetDao;
import top.minecode.exception.FailToUnzipException;
import top.minecode.exception.WrongDataSetFormatException;
import top.minecode.exception.WrongTaskFileException;

/**
 * Created on 2018/3/19.
 * Description:
 *
 * @author iznauy
 */

@Service
public class UploadDataSetService {

    private DataSetDao dataSetDao;

    @Autowired
    public void setDataSetDao(DataSetDao dataSetDao) {
        this.dataSetDao = dataSetDao;
    }

    /**
     * Check the file's format
     * @param fileName name of the file
     * @return <tt>true</tt> if it's valid
     */
    public boolean validDataSet(String fileName) {
        for (String suffix: ServiceConfig.SUPPORTED_DATASET_FORM)
            if (fileName.endsWith(suffix)) return true;
        return false;
    }

    /**
     * Unzip the data set uploaded
     * @param filePath path of the data set
     * @throws WrongTaskFileException task.json is not correct
     * @throws FailToUnzipException failed to unzip the data set
     * @throws WrongDataSetFormatException the file structure in the zip is incorrect
     */
    public void unZipRawImages(String filePath) throws WrongTaskFileException, WrongDataSetFormatException, FailToUnzipException {
        dataSetDao.unZipRawImages(filePath);
    }
}
