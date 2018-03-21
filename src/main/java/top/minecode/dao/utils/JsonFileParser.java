package top.minecode.dao.utils;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

/**
 * Created on 2018/3/17.
 * Description:
 *
 * @author iznauy
 */
public class JsonFileParser {

    private JsonObject json;

    public JsonFileParser(String path) throws Exception {
        JsonParser parser = new JsonParser();
        json = parser.parse(new FileReader(path)).getAsJsonObject();
    }

    public String getString(String key) {
        return json.get(key).getAsString();
    }

    public int getInteger(String key) {
        return json.get(key).getAsInt();
    }

    public List<String> getStringList(String key) {
        JsonArray array = json.getAsJsonArray(key);
        List<String> list = new ArrayList<String>();
        for (JsonElement element: array)
            list.add(element.getAsString());
        return list;
    }
}
