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

    /**
     * Unzip the data set uploaded
     * @param rawImages path and format of the data set
     * @throws WrongTaskFileException task.json is not correct
     * @throws FailToUnzipException failed to unzip the data set
     * @throws WrongDataSetFormatException the file structure in the zip is incorrect
     */
    public void unZipRawImages(String rawImages) throws WrongTaskFileException, FailToUnzipException, WrongDataSetFormatException {
        // Get path and format of target
        String target = getTargetPath(rawImages);
        String format = getZipFileFormat(rawImages);

        // Construct the zipper
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
