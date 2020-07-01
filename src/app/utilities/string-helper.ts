export class StringHelper {
    public static serializeObjToUrlParam(obj: any) {
        if (obj == {}) {
            return '';
        }

        var rs = "";
        for (var key in obj) {
            if (rs != "") {
                rs += "&";
            }
            rs += key + "=" + encodeURIComponent(obj[key]);
        }
        return rs;
    }
}