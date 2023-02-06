window.addEventListener('DOMContentLoaded', (event) => {
    $("#Email").blur(()=>{
        let findEmail={
            data:{},
            url: "http://localhost:1080/getEmail?Email="+$("#Email").val(),
            type: "get",
            dataType: "json",
            sucess:(datagivenbyserver)=>{
                alert(datagivenbyserver);
            },
            error:(errorgivenbyserver)=>{
                alert(errorgivenbyserver);
            }
        };
           $.ajax(findEmail);
    });
});