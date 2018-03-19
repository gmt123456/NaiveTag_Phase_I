package top.minecode.service;

import java.util.HashSet;
import java.util.Set;

/**
 * Created on 2018/3/19.
 * Description:
 *
 * @author iznauy
 */
class ServiceConfig {

    static final Set<String> SUPPORTED_DATASET_FORM = new HashSet<String>();

    static {
        SUPPORTED_DATASET_FORM.add(".zip");
    }

}
