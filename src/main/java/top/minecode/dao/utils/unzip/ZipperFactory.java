package top.minecode.dao.utils.unzip;

/**
 * Created on 2018/3/19.
 * Description:
 *
 * @author iznauy
 */
public class ZipperFactory {

    private String suffix = null;

    public ZipperFactory(String suffix) {
        this.suffix = suffix;
    }

    public ZipperHelper getZipperHelper() {
        if (suffix.equals(".zip")) {
            return new ZipHelper();
        } else {
            return null;
        }
    }

}
