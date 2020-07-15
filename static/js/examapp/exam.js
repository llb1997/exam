$(function () {
    $("button[name='delete-examquestion']").click(function () {
        var mymessage = confirm("确认删除问题？");
        if (mymessage == true) {
            var delete_obj = $(this);
            $.ajax({
                url: "/exam/deletequestion/",
                type: "post",
                data: {
                    "exam-id": $("input[name='exam-id']").val(),
                    "question-id": $(this).val(),
                    "csrfmiddlewaretoken": $("input[name='csrfmiddlewaretoken']").val(),
                },
                success: function (data) {
                    if (data["status"] == "success") {
                        delete_obj.parent("li").remove();
                    } else if (data["status"] == "error") {
                        alert("删除失败")
                    }
                }
            })
        }
    });
    $(".delete-exam").click(function () {
        var mymessage = confirm("确认删除考试？");
        if (mymessage == true) {
            var delete_obj = $(this);
            $.ajax({
                url: "/exam/deleteexam/",
                type: "post",
                data: {
                    "exam-id": delete_obj.val(),
                    "csrfmiddlewaretoken": $("input[name='csrfmiddlewaretoken']").val(),
                },
                success: function (data) {
                    if (data["status"] == "success") {
                        delete_obj.parent("span").parent("div").parent("li").remove();
                    } else if (data["status"] == "error") {
                        alert("删除失败")
                    }
                }
            })
        }
    })
});