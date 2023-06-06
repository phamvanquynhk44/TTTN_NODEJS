$(document).ready(function() {
   
    // Cấu hình các nhãn phân trang
    $('#example').dataTable( {
        "language": {
        "sProcessing":   "Đang xử lý...",
        "sLengthMenu":   "Xem _MENU_ mục",
        "sZeroRecords":  "Không tìm thấy dòng nào phù hợp",
        "sInfo":         "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục",
        "sInfoEmpty":    "Đang xem 0 đến 0 trong tổng số 0 mục",
        "sInfoFiltered": "(được lọc từ _MAX_ mục)",
        "sInfoPostFix":  "",
        "sSearch":       "Tìm:",
        "sUrl":          "",
        "oPaginate": {
            "sFirst":    "Đầu",
            "sPrevious": "Trước",
            "sNext":     "Tiếp",
            "sLast":     "Cuối"
            }
        }
    } );
         
    } );




function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }



  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }



  function myEditImage() {
    document.getElementById("avatar").style.display="block";
    document.getElementById("sua1").style.display="none";
    document.getElementById("aht").value = "null";
  }

  function myRemoveImage() {
    document.getElementById("sua").style.display="none";
    document.getElementById("sua1").style.display="none";
    document.getElementById("dc").style.display="block"; 
  }





  var table = document.getElementById("table"), sumVal = 0;
  
  for(var i = 1; i < table.rows.length; i++)
  {
      sumVal = sumVal + parseInt(table.rows[i].cells[0].innerHTML);
  }
  const VND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});
  
  document.getElementById("val").innerHTML = "" + VND.format(sumVal);
  console.log(sumVal);

 



