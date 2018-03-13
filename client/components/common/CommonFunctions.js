export function transformHeaderValue (headervalue) {
    headervalue = headervalue.startsWith("ui") ? headervalue.replace("ui","") : headervalue;
    headervalue = headervalue.split(/(?=[A-Z])/).join(" ");
    return headervalue.charAt(0).toUpperCase() + headervalue.slice(1);
}    

