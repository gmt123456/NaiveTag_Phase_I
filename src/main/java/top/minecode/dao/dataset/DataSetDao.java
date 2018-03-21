package top.minecode.dao.dataset;

import org.springframework.stereotype.Repository;
import top.minecode.Config;
import top.minecode.dao.utils.unzip.ZipperFactory;
import top.minecode.dao.utils.unzip.ZipperHelper;
import top.minecode.exception.FailToUnzipException;
import top.minecode.exception.WrongDataSetFormatException;
import top.minecode.exception.WrongTaskFileException;

import java.io.File;

/**
 * Created on 2018/3/19.
 * Description:
 *
 * @author iznauy
 */

@Repository
public class DataSetDao {

    private String getTargetPath(String rawPath) {
        String parentPath = new File(rawPath).getParentFile().getParent();
        return parentPath + File.separator + Config.UNZIPPED_FILE_PATH + File.separator;
    }

    private String getZipFileFormat(String rawPath) {
        String format = null;
        for (String suffix: Config.SUPPORTED_DATASET_FORM)
            if (rawPath.endsWith(suffix)) format = suffix;
        return format;
    }

    private boolean validFileStructure(String fileName) {
        File jsonFile = new File(fileName + "task.json");
        File dataFile = new File(fileName + "data");
        return jsonFile.exists() && dataFile.exists() && dataFile.isDirectory();
    }

    private boolean validJsonFileStructure(String fileName) {
        return new TaskFileValidator(fileName).validTask();
    }

    public void unZipRawImages(String rawImages) throws WrongTaskFileException, FailToUnzipException, WrongDataSetFormatException {
        // 获取目标路径和格式
        String target = getTargetPath(rawImages);
        String format = getZipFileFormat(rawImages);

        //构造解压器
        ZipperFactory factory = new ZipperFactory(format);
        ZipperHelper helper = factory.getZipperHelper();

        boolean unzipResult = helper.unZip(rawImages, target);
        if (!unzipResult)
            throw new FailToUnzipException();

        String fileName = new File(rawImages).getName();
        fileName = fileName.substring(0, fileName.length() - format.length());

        String dataSetFilePath = target + fileName + File.separator;

        if (!validFileStructure(dataSetFilePath))
            throw new WrongDataSetFormatException();

        if (!validJsonFileStructure(dataSetFilePath + "task.json"))
            throw new WrongTaskFileException();
    }


}
