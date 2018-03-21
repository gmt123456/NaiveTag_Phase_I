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

    public boolean validDataSet(String fileName) {
        for (String suffix: ServiceConfig.SUPPORTED_DATASET_FORM)
            if (fileName.endsWith(suffix)) return true;
        return false;
    }

    public void unZipRawImages(String filePath) throws WrongTaskFileException, WrongDataSetFormatException, FailToUnzipException {
        dataSetDao.unZipRawImages(filePath);
    }
}
