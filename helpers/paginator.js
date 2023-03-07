const paginator = function(baseUrl = '', perpage = 10,totalRows = 0, curpage = 1  ){

    end = Math.ceil(totalRows/perpage);
    start =1;
    html= "<div class= 'pagination'>";
    html += "<ul>";
    cssClass = curpage ==1 ? "disabled" : "";
    html += "<li><a class='" + cssClass + "' href= '" + baseUrl +(curpage-1) + "'><span>&laquo;</span></a></li>";


    for(i =start;i<=end;i++){
        cssClass = (curpage == i) ? "active": "";
        html += "<li><a class='"+cssClass+ "' href='"+baseUrl+i+"'>"+i+"</a></li>";
    }

    cssClass = (curpage == end) ? "disabled" : "";
    html += "<li><a class='" + cssClass + "' href= '" + (curpage) + "'><span>First page</span></a></li>";
    html += "</ul>";
    html += "</div>";
    return html;

}

module.exports = {
    paginator:paginator
}