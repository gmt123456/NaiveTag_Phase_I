package top.minecode;

import java.util.HashSet;
import java.util.Set;

/**
 * Created on 2018/3/19.
 * Description:
 *
 * @author iznauy
 */
public class Config {

    public static final String RAW_FILE_PATH = "RawImages";

    public static final String UNZIPPED_FILE_PATH = "Images";

    public static final Set<String> SUPPORTED_DATASET_FORM = new HashSet<String>();

    static {
        SUPPORTED_DATASET_FORM.add(".zip");
    }


}
