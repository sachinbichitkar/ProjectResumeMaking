window.addEventListener('DOMContentLoaded', (event) => {
    $("#Email").blur(()=>{
        let findEmail={
            data:{},
            url: "http://localhost:1080/getEmail?Email="+$("#Email").val(),
            type: "get",
            dataType: "json",
            sucess:(datagivenbyserver)=>{
            // $('.fittoscreen').append($('<p></p>').Text(datagivenbyserver));
                console.log("sucess to contact server -->>" + datagivenbyserver.result);},
            error:(errorgivenbyserver)=>{console.log("failed to contact server -->>" + errorgivenbyserver);}
           }
           $.ajax(findEmail);
    });
});