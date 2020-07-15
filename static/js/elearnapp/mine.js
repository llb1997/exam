$(function () {
    $(".mine-item-title li").click(function () {
        if ($(this).children("a").html() == "上传视频") {
            $(".mine-item-title li").removeAttr("style");
            $(this).css("background-color", "#23b8ff");
            $(".mine-item-content").children("div").attr("hidden", "hidden");
            $(".mine-item-upload-video").removeAttr("hidden")
        } else if ($(this).children("a").html() == "上传公告") {
            $(".mine-item-title li").removeAttr("style");
            $(this).css("background-color", "#23b8ff");
            $(".mine-item-content").children("div").attr("hidden", "hidden");
            $(".mine-item-upload-courseware").removeAttr("hidden")
        } else if ($(this).children("a").html() == "添加作业") {
            $(".mine-item-title li").removeAttr("style");
            $(this).css("background-color", "#23b8ff");
            $(".mine-item-content").children("div").attr("hidden", "hidden");
            $(".mine-item-add-questions").removeAttr("hidden")
        } else if ($(this).children("a").html() == "我的作业") {
            $(".mine-item-title li").removeAttr("style");
            $(this).css("background-color", "#23b8ff");
            $(".mine-item-content").children("div").attr("hidden", "hidden");
            $(".mine-item-myhomework").removeAttr("hidden")
        } else if ($(this).children("a").html() == "批改作业") {
            $(".mine-item-title li").removeAttr("style");
            $(this).css("background-color", "#23b8ff");
            $(".mine-item-content").children("div").attr("hidden", "hidden");
            $(".mine-item-correct-homework").removeAttr("hidden")
        } else if ($(this).children("a").html() == "学习详情") {
            $(".mine-item-title li").removeAttr("style");
            $(this).css("background-color", "#23b8ff");
            $(".mine-item-content").children("div").attr("hidden", "hidden");
            $(".mine-item-student-details").removeAttr("hidden")
        } else if ($(this).children("a").html() == "学生作业分数") {
            $(".mine-item-title li").removeAttr("style");
            $(this).css("background-color", "#23b8ff");
            $(".mine-item-content").children("div").attr("hidden", "hidden");
            $(".mine-item-student-score").removeAttr("hidden")
        } else if ($(this).children("a").html() == "教授专业") {
            $(".mine-item-title li").removeAttr("style");
            $(this).css("background-color", "#23b8ff");
            $(".mine-item-content").children("div").attr("hidden", "hidden");
            $(".mine-item-add-specialty").removeAttr("hidden")

        } else if ($(this).children("a").html() == "添加考试") {
            $(".mine-item-title li").removeAttr("style");
            $(this).css("background-color", "#23b8ff");
            $(".mine-item-content").children("div").attr("hidden", "hidden");
            $(".mine-item-add-examquestions").removeAttr("hidden")
        } else if ($(this).children("a").html() == "我的考试") {
            $(".mine-item-title li").removeAttr("style");
            $(this).css("background-color", "#23b8ff");
            $(".mine-item-content").children("div").attr("hidden", "hidden");
            $(".mine-item-myexam").removeAttr("hidden")
        } else if ($(this).children("a").html() == "批改试卷") {
            $(".mine-item-title li").removeAttr("style");
            $(this).css("background-color", "#23b8ff");
            $(".mine-item-content").children("div").attr("hidden", "hidden");
            $(".mine-item-correct-exam").removeAttr("hidden")
            
        }  else if ($(this).children("a").html() == "学生考试分数") {
            $(".mine-item-title li").removeAttr("style");
            $(this).css("background-color", "#23b8ff");
            $(".mine-item-content").children("div").attr("hidden", "hidden");
            $(".mine-item-examstudent-score").removeAttr("hidden")

        }   else if ($(this).children("a").html() == "作业分数") {
            $(".mine-item-title li").removeAttr("style");
            $(this).css("background-color", "#23b8ff");
            $(".mine-item-content").children("div").attr("hidden", "hidden");
            $(".mine-item-homework-score").removeAttr("hidden")

        }  else if ($(this).children("a").html() == "考试分数") {
            $(".mine-item-title li").removeAttr("style");
            $(this).css("background-color", "#23b8ff");
            $(".mine-item-content").children("div").attr("hidden", "hidden");
            $(".mine-item-exam-score").removeAttr("hidden")
            
        }


        
    });

    $(".add-course").click(function () {
        $(".mine-item-upload-video").attr("hidden", "hidden");
        $(".mine-item-add-course").removeAttr("hidden");
    });



    $(".add-homework").click(function () {
        $(".mine-item-add-questions").attr("hidden", "hidden");
        $(".mine-item-add-homework").removeAttr("hidden");
    });
    $(".correct-homework").click(function () {
        var id = $(this).attr("name");
        $.ajax({
            url: "/homework/correct_student/",
            type: "get",
            data: {
                "homework-id": $(this).attr("name"),
            },
            success: function (data) {
                var data_obj = JSON.parse(data["data"]);
                for (i = 0; i < data_obj.length; i++) {
                    if ($(".mine-item-all-student-inner li").length < data_obj.length) {
                        $(".mine-item-all-student-inner").children("ul").append("<li><a href=" + "/homework/correct/?studentid=" + data_obj[i]['pk'] + "&homeworkid=" + id + " target='_blank'>" + data_obj[i]['fields']['name'] + "</a></li>")
                    }
                }
            }
        });
        $(".mine-item-correct-homework").attr("hidden", "hidden");
        $(".mine-item-all-student").removeAttr("hidden");
    });


    $(".add-exam").click(function () {
        $(".mine-item-add-examquestions").attr("hidden", "hidden");
        $(".mine-item-add-exam").removeAttr("hidden");
    });
    $(".correct-exam").click(function () {
        var id = $(this).attr("name");
        $.ajax({
            url: "/exam/correct_student/",
            type: "get",
            data: {
                "exam-id": $(this).attr("name"),
            },
            success: function (data) {
                var data_obj = JSON.parse(data["data"]);
                for (i = 0; i < data_obj.length; i++) {
                    if ($(".mine-item-all-exam-student-inner li").length < data_obj.length) {
                        $(".mine-item-all-exam-student-inner").children("ul").append("<li><a href=" + "/exam/correct/?studentid=" + data_obj[i]['pk'] + "&examid=" + id + " target='_blank'>" + data_obj[i]['fields']['name'] + "</a></li>")
                    }
                }
            }
        });
        $(".mine-item-correct-exam").attr("hidden", "hidden");
        $(".mine-item-all-exam-student").removeAttr("hidden");
    });


    //上传课程
    $(".upload-course").click(function () {
        if ($("input[name='course-name']").val() == "") {
            $(".course-name-tip").css("display", "inline-block");
            return false;
        } else if ($("input[name='course-file']").val() == "") {
            $(".course-file-tip").css("display", "inline-block");
            return false;
        } else {
            var formData = new FormData($('#upload-course')[0]);
            $.ajax({
                type: "POST",
                url: "/video/uploadcourse/",
                data: formData,
                cache: false,
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data["status"] == "success") {
                        $("input[name='course-name']").val("");
                        $("input[name='course-desc']").val("");
                        $("input[name='course-file']").val("");
                        $(".upload-course-error").css("display", "none");
                        $(".upload-course-success").css("display", "block");

                        setTimeout(function () {
                            $(".upload-course-success").css("display", "none");
                            window.location.href = "http://localhost:8000/mine";
                        }, 1000);
                    } else if (data["status"] == "error") {
                        $(".upload-course-success").css("display", "none");
                        $(".upload-course-error").css("display", "block");
                        setTimeout(function () {
                            $(".upload-course-error").css("display", "none");
                        }, 5000);
                    }
                }
            });
        }
    });

    //上传视频
    $(".upload-video").click(function () {
        if ($("select[name='course-select'] option:selected").val() == undefined) {
            $(".option-tip2").css("display", "none");
            $(".option-tip").css("display", "inline-block");
        } else if ($("input[name='video-name']").val() == "") {
            $(".video-name-tip").css("display", "inline-block");
        } else if ($("input[name='video-file']").val() == "") {
            $(".video-file-tip").css("display", "inline-block");
        } else {
            var formData = new FormData($('#upload-video')[0]);
            $.ajax({
                type: "POST",
                url: "/video/uploadvideo/",
                data: formData,
                cache: false,
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data["status"] == "success") {
                        $("input[name='video-title']").val("");
                        $("input[name='video-file']").val("");
                        $(".upload-video-error").css("display", "none");
                        $(".upload-video-success").css("display", "block");
                        setTimeout(function () {
                            $(".upload-video-success").css("display", "none");
                        }, 5000);
                    } else if (data["status"] == "error") {
                        $(".upload-video-success").css("display", "none");
                        $(".upload-video-error").css("display", "block");
                        setTimeout(function () {
                            $(".upload-video-error").css("display", "none");
                        }, 5000);
                    }
                }
            });
        }
    });

    //上传公告
    $(".upload").click(function () {
        if ($("select[name='courseware-specialty-select'] option:selected") == "") {
            $(".courseware-specialty-select-tip").css("display", "inline-block")
        } else if ($("input[name='courseware-name']").val() == "") {
            $(".courseware-name-tip").css("display", "inline-block")
        } else if ($("input[name='courseware-file']").val() == "") {
            $(".courseware-file-tip").css("display", "inline-block")
        } else {
            var formData = new FormData($('#upload-courseware')[0]);
            $.ajax({
                type: "POST",
                url: "/courseware/upload/",
                data: formData,
                cache: false,
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data["status"] == "success") {
                        $("input[name='courseware-name']").val("");
                        $("input[name='courseware-file']").val("");
                        $(".upload-error").css("display", "none");
                        $(".upload-success").css("display", "block");
                        setTimeout(function () {
                            $(".upload-success").css("display", "none");
                        }, 5000);
                    } else if (data["status"] == "error") {
                        $(".upload-success").css("display", "none");
                        $(".upload-error").css("display", "block");
                        setTimeout(function () {
                            $(".upload-error").css("display", "none");
                        }, 5000);
                    }
                }
            });
        }
    });

    //增加作业
    $(".upload-homework").click(function () {
        if ($("select[name='homework-specialty-select'] option:selected") == "") {
            $(".homework-specialty-select-tip").css("display", "inline-block")
        } else if ($("input[name='homework-name']").val() == "") {
            $(".homework-name-tip").css("display", "inline-block")
        } else {
            var formData = new FormData($('#upload-homework')[0]);
            $.ajax({
                type: "POST",
                url: "/homework/upload/",
                data: formData,
                cache: false,
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data["status"] == "success") {
                        $("input[name='homework-name']").val("");
                        $("input[name='homework-desc']").val("");
                        $(".upload-homework-error").css("display", "none");
                        $(".upload-homework-success").css("display", "block");
                        setTimeout(function () {
                            $(".upload-homework-success").css("display", "none");
                            window.location.href = "http://localhost:8000/mine";
                        }, 1000);
                    } else if (data["status"] == "error") {
                        $(".upload-homework-success").css("display", "none");
                        $(".upload-homework-error").css("display", "block");
                        setTimeout(function () {
                            $(".upload-homework-error").css("display", "none");
                        }, 5000);
                    }
                }
            });
        }
    });

    //增加判断题
    $(".add-pd-question").click(function () {
        if ($("select[name='homework-select'] option:selected").val() == undefined) {
            $(".homework-select-tip").css("display", "block")
        } else if ($("textarea[name='pd-question']").val() == "") {
            $(".pd-question-tip").css("display", "block")
        } else if ($("input[name='pd-answer']:checked").val() == undefined) {
            $(".pd-answer-tip").css("display", "block")
        } else {
            $.ajax({
                url: "/homework/addpd/",
                type: "post",
                data: {
                    "homework": $("select[name='homework-select'] option:selected").val(),
                    "pd-question": $("textarea[name='pd-question']").val(),
                    "pd-answer": $("input[name='pd-answer']:checked").val(),
                    "csrfmiddlewaretoken": $("input[name='csrfmiddlewaretoken']").val(),
                },
                success: function (data) {
                    if (data["status"] == "success") {
                        $("textarea[name='pd-question']").val("");
                        $("input[name='pd-answer']").removeAttr("checked");
                        $(".add-question-error").css("display", "none");
                        $(".add-question-success").css("display", "block");
                        setTimeout(function () {
                            $(".add-question-success").css("display", "none");
                        }, 5000);
                    } else if (data["status"] == "error") {
                        $(".add-question-success").css("display", "none");
                        $(".add-question-error").css("display", "block");
                        setTimeout(function () {
                            $(".add-question-error").css("display", "none");
                        }, 5000);
                    }
                }
            })
        }
    });
    $("select[name='homework-select']").change(function () {
        $(".homework-select-tip").css("display", "none")
    });
    $("textarea[name='pd-question']").change(function () {
        $(".pd-question-tip").css("display", "none")
    });
    $("input[name='pd-answer']").change(function () {
        $(".pd-answer-tip").css("display", "none")
    });

    //增加选择题
    $(".add-xz-question").click(function () {
        var xz_question = $("textarea[name='xz-question']").val();
        var xz_answer_A = $("input[name='xz-answer-A']").val();
        var xz_answer_B = $("input[name='xz-answer-B']").val();
        var xz_answer_C = $("input[name='xz-answer-C']").val();
        var xz_answer_D = $("input[name='xz-answer-D']").val();
        if ($("select[name='homework-select'] option:selected").val() == undefined) {
            $(".homework-select-tip").css("display", "block")
        } else if (xz_question == "") {
            $(".xz-question-tip").css("display", "block")
        } else if (xz_answer_A == "") {
            $(".xz-answer-A-tip").css("display", "block")
        } else if (xz_answer_B == "") {
            $(".xz-answer-B-tip").css("display", "block")
        } else if (xz_answer_C == "") {
            $(".xz-answer-C-tip").css("display", "block")
        } else if (xz_answer_D == "") {
            $(".xz-answer-D-tip").css("display", "block")
        } else if ($("input[name='xz-answer']:checked").val() == undefined) {
            $(".xz-answer-tip").css("display", "block")
        } else {
            $.ajax({
                url: "/homework/addxz/",
                type: "post",
                data: {
                    "homework": $("select[name='homework-select'] option:selected").val(),
                    "xz-question": xz_question,
                    "xz-answer-A": xz_answer_A,
                    "xz-answer-B": xz_answer_B,
                    "xz-answer-C": xz_answer_C,
                    "xz-answer-D": xz_answer_D,
                    "xz-answer": $("input[name='xz-answer']:checked").val(),
                    "csrfmiddlewaretoken": $("input[name='csrfmiddlewaretoken']").val(),
                },
                success: function (data) {
                    if (data["status"] == "success") {
                        $("textarea[name='xz-question']").val("");
                        $("input[name='xz-answer-A']").val("");
                        $("input[name='xz-answer-B']").val("");
                        $("input[name='xz-answer-C']").val("");
                        $("input[name='xz-answer-D']").val("");
                        $("input[name='xz-answer']").removeAttr("checked");
                        $(".add-question-error").css("display", "none");
                        $(".add-question-success").css("display", "block");
                        setTimeout(function () {
                            $(".add-question-success").css("display", "none");
                        }, 5000);
                    } else if (data["status"] == "error") {
                        $(".add-question-success").css("display", "none");
                        $(".add-question-error").css("display", "block");
                        setTimeout(function () {
                            $(".add-question-error").css("display", "none");
                        }, 5000);
                    }
                }
            })
        }
    });
    $("textarea[name='xz-question']").change(function () {
        $(".xz-question-tip").css("display", "none")
    });
    $("input[name='xz-answer-A']").change(function () {
        $(".xz-answer-A-tip").css("display", "none")
    });
    $("input[name='xz-answer-B']").change(function () {
        $(".xz-answer-B-tip").css("display", "none")
    });
    $("input[name='xz-answer-C']").change(function () {
        $(".xz-answer-C-tip").css("display", "none")
    });
    $("input[name='xz-answer-D']").change(function () {
        $(".xz-answer-D-tip").css("display", "none")
    });
    $("input[name='xz-answer']").change(function () {
        $(".xz-answer-tip").css("display", "none")
    });


    //简答题
    $(".add-jd-question").click(function () {
        if ($("select[name='homework-select'] option:selected").val() == undefined) {
            $(".homework-select-tip").css("display", "block")
        } else if ($("textarea[name='jd-question']").val() == "") {
            $(".jd-question-tip").css("display", "block")
        } else {
            $.ajax({
                url: "/homework/addjd/",
                type: "post",
                data: {
                    "homework": $("select[name='homework-select'] option:selected").val(),
                    "jd-question": $("textarea[name='jd-question']").val(),
                    "jd-answer": $("textarea[name='jd-answer']").val(),
                    "csrfmiddlewaretoken": $("input[name='csrfmiddlewaretoken']").val(),
                },
                success: function (data) {
                    if (data["status"] == "success") {
                        $("textarea[name='jd-question']").val("");
                        $("textarea[name='jd-answer']").val("");
                        $(".add-question-error").css("display", "none");
                        $(".add-question-success").css("display", "block");
                        setTimeout(function () {
                            $(".add-question-success").css("display", "none");
                        }, 5000);
                    } else if (data["status"] == "error") {
                        $(".add-question-success").css("display", "none");
                        $(".add-question-error").css("display", "block");
                        setTimeout(function () {
                            $(".add-question-error").css("display", "none");
                        }, 5000);
                    }
                }
            })
        }
    });
    $("textarea[name='jd-question']").change(function () {
        $(".jd-question-tip").css("display", "none")
    });

    $("select[name='course-select']").change(function () {
        $(".option-tip").css("display", "none");
        $(".option-tip2").css("display", "inline-block");
    });
    $("input[name='video-name']").change(function () {
        $(".video-name-tip").css("display", "none");
    });
    $("input[name='video-file']").change(function () {
        $(".video-file-tip").css("display", "none");
    });
    $("input[name='course-name']").change(function () {
        $(".course-name-tip").css("display", "none");
    });
    $("input[name='course-file']").change(function () {
        $(".course-file-tip").css("display", "none");
    });
    $("input[name='courseware-name']").change(function () {
        $(".courseware-name-tip").css("display", "none")
    });
    $("input[name='courseware-file']").change(function () {
        $(".courseware-file-tip").css("display", "none")
    });
    $("input[name='homework-name']").change(function () {
        $(".homework-name-tip").css("display", "none")
    });
// meiemiemeiemi

    //增加考试
    $(".upload-exam").click(function () {
        if ($("select[name='exam-specialty-select'] option:selected") == "") {
            $(".exam-specialty-select-tip").css("display", "inline-block")
        } else if ($("input[name='exam-name']").val() == "") {
            $(".exam-name-tip").css("display", "inline-block")
        } else {
            var formData = new FormData($('#upload-exam')[0]);
            $.ajax({
                type: "POST",
                url: "/exam/upload/",
                data: formData,
                cache: false,
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data["status"] == "success") {
                        $("input[name='exam-name']").val("");
                        $("input[name='exam-desc']").val("");
                        $(".upload-exam-error").css("display", "none");
                        $(".upload-exam-success").css("display", "block");
                        setTimeout(function () {
                            $(".upload-exam-success").css("display", "none");
                            window.location.href = "http://localhost:8000/mine";
                        }, 1000);
                    } else if (data["status"] == "error") {
                        $(".upload-exam-success").css("display", "none");
                        $(".upload-exam-error").css("display", "block");
                        setTimeout(function () {
                            $(".upload-exam-error").css("display", "none");
                        }, 5000);
                    }
                }
            });
        }
    });

    //增加判断题
    $(".add-pd-examquestion").click(function () {

        $.ajax({
            url: "/exam/addpd/",
            type: "post",
            data: {
                "exam": $("select[name='exam-select'] option:selected").val(),
                "pd-examquestion": $("textarea[name='pd-examquestion']").val(),
                "pd-examanswer": $("input[name='pd-examanswer']:checked").val(),
                "csrfmiddlewaretoken": $("input[name='csrfmiddlewaretoken']").val(),
            },
            success: function (data) {
                if (data["status"] == "success") {
                    $("textarea[name='pd-examquestion']").val("");
                    $("input[name='pd-examanswer']").removeAttr("checked");
                    $(".add-examquestion-error").css("display", "none");
                    $(".add-examquestion-success").css("display", "block");
                    setTimeout(function () {
                        $(".add-examquestion-success").css("display", "none");
                    }, 5000);
                } else if (data["status"] == "error") {
                    $(".add-examquestion-success").css("display", "none");
                    $(".add-examquestion-error").css("display", "block");
                    setTimeout(function () {
                        $(".add-examquestion-error").css("display", "none");
                    }, 5000);
                }
            }
        })
        if ($("select[name='exam-select'] option:selected").val() == undefined) {
            $(".exam-select-tip").css("display", "block")
        } else if ($("textarea[name='pd-examquestion']").val() == "") {
            $(".pd-examquestion-tip").css("display", "block")
        } else if ($("input[name='pd-examanswer']:checked").val() == undefined) {
            $(".pd-examanswer-tip").css("display", "block")
        } else {
            $.ajax({
                url: "/exam/addpd/",
                type: "post",
                data: {
                    "exam": $("select[name='exam-select'] option:selected").val(),
                    "pd-examquestion": $("textarea[name='pd-examquestion']").val(),
                    "pd-examanswer": $("input[name='pd-examanswer']:checked").val(),
                    "csrfmiddlewaretoken": $("input[name='csrfmiddlewaretoken']").val(),
                },
                success: function (data) {
                    if (data["status"] == "success") {
                        $("textarea[name='pd-examquestion']").val("");
                        $("input[name='pd-examanswer']").removeAttr("checked");
                        $(".add-examquestion-error").css("display", "none");
                        $(".add-examquestion-success").css("display", "block");
                        setTimeout(function () {
                            $(".add-examquestion-success").css("display", "none");
                        }, 5000);
                    } else if (data["status"] == "error") {
                        $(".add-examquestion-success").css("display", "none");
                        $(".add-examquestion-error").css("display", "block");
                        setTimeout(function () {
                            $(".add-examquestion-error").css("display", "none");
                        }, 5000);
                    }
                }
            })
        }
    });
    $("select[name='exam-select']").change(function () {
        $(".exam-select-tip").css("display", "none")
    });
    $("textarea[name='pd-examquestion']").change(function () {
        $(".pd-examquestion-tip").css("display", "none")
    });
    $("input[name='pd-examanswer']").change(function () {
        $(".pd-examanswer-tip").css("display", "none")
    });

    //增加选择题
    $(".add-xz-examquestion").click(function () {
        var xz_examquestion = $("textarea[name='xz-examquestion']").val();
        var xz_examanswer_A = $("input[name='xz-examanswer-A']").val();
        var xz_examanswer_B = $("input[name='xz-examanswer-B']").val();
        var xz_examanswer_C = $("input[name='xz-examanswer-C']").val();
        var xz_examanswer_D = $("input[name='xz-examanswer-D']").val();
        
        
        
        if ($("select[name='exam-select'] option:selected").val() == undefined) {
            $(".exam-select-tip").css("display", "block")
        } else if (xz_examquestion == "") {
            $(".xz-examquestion-tip").css("display", "block")
        } else if (xz_examanswer_A == "") {
            $(".xz-examanswer-A-tip").css("display", "block")
        } else if (xz_examanswer_B == "") {
            $(".xz-examanswer-B-tip").css("display", "block")
        } else if (xz_examanswer_C == "") {
            $(".xz-examanswer-C-tip").css("display", "block")
        } else if (xz_examanswer_D == "") {
            $(".xz-examanswer-D-tip").css("display", "block")
        } else if ($("input[name='xz-examanswer']:checked").val() == undefined) {
            $(".xz-examanswer-tip").css("display", "block")
        } else {
            $.ajax({
                url: "/exam/addxz/",
                type: "post",
                data: {
                    "exam": $("select[name='exam-select'] option:selected").val(),
                    "xz-examquestion": xz_examquestion,
                    "xz-examanswer-A": xz_examanswer_A,
                    "xz-examanswer-B": xz_examanswer_B,
                    "xz-examanswer-C": xz_examanswer_C,
                    "xz-examanswer-D": xz_examanswer_D,
                    "xz-examanswer": $("input[name='xz-examanswer']:checked").val(),
                    "csrfmiddlewaretoken": $("input[name='csrfmiddlewaretoken']").val(),
                },
                success: function (data) {
                    if (data["status"] == "success") {
                        $("textarea[name='xz-examquestion']").val("");
                        $("input[name='xz-examanswer-A']").val("");
                        $("input[name='xz-examanswer-B']").val("");
                        $("input[name='xz-examanswer-C']").val("");
                        $("input[name='xz-examanswer-D']").val("");
                        $("input[name='xz-examanswer']").removeAttr("checked");
                        $(".add-examquestion-error").css("display", "none");
                        $(".add-examquestion-success").css("display", "block");
                        setTimeout(function () {
                            $(".add-examquestion-success").css("display", "none");
                        }, 5000);
                    } else if (data["status"] == "error") {
                        $(".add-examquestion-success").css("display", "none");
                        $(".add-examquestion-error").css("display", "block");
                        setTimeout(function () {
                            $(".add-examquestion-error").css("display", "none");
                        }, 5000);
                    }
                }
            })
        }
    });
    $("textarea[name='xz-examquestion']").change(function () {
        $(".xz-examquestion-tip").css("display", "none")
    });
    $("input[name='xz-examanswer-A']").change(function () {
        $(".xz-examanswer-A-tip").css("display", "none")
    });
    $("input[name='xz-examanswer-B']").change(function () {
        $(".xz-examanswer-B-tip").css("display", "none")
    });
    $("input[name='xz-examanswer-C']").change(function () {
        $(".xz-examanswer-C-tip").css("display", "none")
    });
    $("input[name='xz-examanswer-D']").change(function () {
        $(".xz-examanswer-D-tip").css("display", "none")
    });
    $("input[name='xz-examanswer']").change(function () {
        $(".xz-examanswer-tip").css("display", "none")
    });


    //填空题
    $(".add-tk-examquestion").click(function () {
        
        if ($("select[name='exam-select'] option:selected").val() == undefined) {
            $(".exam-select-tip").css("display", "block")
        } else if ($("textarea[name='tk-examquestion']").val() == "") {
            $(".tk-examquestion-tip").css("display", "block")
        } else {
            $.ajax({
                url: "/exam/addtk/",
                type: "post",
                data: {
                    "exam": $("select[name='exam-select'] option:selected").val(),
                    "tk-examquestion": $("textarea[name='tk-examquestion']").val(),
                    "tk-examanswer": $("textarea[name='tk-examanswer']").val(),
                    "csrfmiddlewaretoken": $("input[name='csrfmiddlewaretoken']").val(),
                },
                success: function (data) {
                    if (data["status"] == "success") {
                        $("textarea[name='tk-examquestion']").val("");
                        $("textarea[name='tk-examanswer']").val("");
                        $(".add-examquestion-error").css("display", "none");
                        $(".add-examquestion-success").css("display", "block");
                        setTimeout(function () {
                            $(".add-examquestion-success").css("display", "none");
                        }, 5000);
                    } else if (data["status"] == "error") {
                        $(".add-examquestion-success").css("display", "none");
                        $(".add-examquestion-error").css("display", "block");
                        setTimeout(function () {
                            $(".add-examquestion-error").css("display", "none");
                        }, 5000);
                    }
                }
            })
        }
    });
    $("textarea[name='tk-examquestion']").change(function () {
        $(".tk-examquestion-tip").css("display", "none")
    });

    $("select[name='course-select']").change(function () {
        $(".option-tip").css("display", "none");
        $(".option-tip2").css("display", "inline-block");
    });
    $("input[name='video-name']").change(function () {
        $(".video-name-tip").css("display", "none");
    });
    $("input[name='video-file']").change(function () {
        $(".video-file-tip").css("display", "none");
    });
    $("input[name='course-name']").change(function () {
        $(".course-name-tip").css("display", "none");
    });
    $("input[name='course-file']").change(function () {
        $(".course-file-tip").css("display", "none");
    });
    $("input[name='courseware-name']").change(function () {
        $(".courseware-name-tip").css("display", "none")
    });
    $("input[name='courseware-file']").change(function () {
        $(".courseware-file-tip").css("display", "none")
    });
    $("input[name='exam-name']").change(function () {
        $(".exam-name-tip").css("display", "none")
    });

// 简答题
    $(".add-jd-examquestion").click(function () {
        
        if ($("select[name='exam-select'] option:selected").val() == undefined) {
            $(".exam-select-tip").css("display", "block")
        } else if ($("textarea[name='jd-examquestion']").val() == "") {
            $(".jd-examquestion-tip").css("display", "block")
        } else {
            $.ajax({
                url: "/exam/addjd/",
                type: "post",
                data: {
                    "exam": $("select[name='exam-select'] option:selected").val(),
                    "jd-examquestion": $("textarea[name='jd-examquestion']").val(),
                    "jd-examanswer": $("textarea[name='jd-examanswer']").val(),
                    "csrfmiddlewaretoken": $("input[name='csrfmiddlewaretoken']").val(),
                },
                success: function (data) {
                    if (data["status"] == "success") {
                        $("textarea[name='jd-examquestion']").val("");
                        $("textarea[name='jd-examanswer']").val("");
                        $(".add-examquestion-error").css("display", "none");
                        $(".add-examquestion-success").css("display", "block");
                        setTimeout(function () {
                            $(".add-examquestion-success").css("display", "none");
                        }, 5000);
                    } else if (data["status"] == "error") {
                        $(".add-examquestion-success").css("display", "none");
                        $(".add-examquestion-error").css("display", "block");
                        setTimeout(function () {
                            $(".add-examquestion-error").css("display", "none");
                        }, 5000);
                    }
                }
            })
        }
    });
    $("textarea[name='jd-examquestion']").change(function () {
        $(".jd-examquestion-tip").css("display", "none")
    });

    $("select[name='course-select']").change(function () {
        $(".option-tip").css("display", "none");
        $(".option-tip2").css("display", "inline-block");
    });
    $("input[name='video-name']").change(function () {
        $(".video-name-tip").css("display", "none");
    });
    $("input[name='video-file']").change(function () {
        $(".video-file-tip").css("display", "none");
    });
    $("input[name='course-name']").change(function () {
        $(".course-name-tip").css("display", "none");
    });
    $("input[name='course-file']").change(function () {
        $(".course-file-tip").css("display", "none");
    });
    $("input[name='courseware-name']").change(function () {
        $(".courseware-name-tip").css("display", "none")
    });
    $("input[name='courseware-file']").change(function () {
        $(".courseware-file-tip").css("display", "none")
    });
    $("input[name='exam-name']").change(function () {
        $(".exam-name-tip").css("display", "none")
    });


    //增加的题目类型标题颜色和显示内容
    $(".pd").click(function () {
        $(this).css("color", "#12a7ff");
        $(".xz").css("color", "#333333");
        $(".jd").css("color", "#333333");
        $(".mine-item-xz").attr("hidden", "hidden");
        $(".mine-item-jd").attr("hidden", "hidden");
        $(".mine-item-pd").removeAttr("hidden")
    });
    $(".xz").click(function () {
        $(this).css("color", "#12a7ff");
        $(".pd").css("color", "#333333");
        $(".jd").css("color", "#333333");
        $(".mine-item-pd").attr("hidden", "hidden");
        $(".mine-item-jd").attr("hidden", "hidden");
        $(".mine-item-xz").removeAttr("hidden")
    });
    $(".jd").click(function () {
        $(this).css("color", "#12a7ff");
        $(".pd").css("color", "#333333");
        $(".xz").css("color", "#333333");
        $(".mine-item-pd").attr("hidden", "hidden");
        $(".mine-item-xz").attr("hidden", "hidden");
        $(".mine-item-jd").removeAttr("hidden")
    });

//增加的题目类型标题颜色和显示内容
    $(".pd").click(function () {
        $(this).css("color", "#12a7ff");
        $(".xz").css("color", "#333333");
        $(".tk").css("color", "#333333");
        $(".jd").css("color", "#333333");
        $(".mine-item-xz").attr("hidden", "hidden");
        $(".mine-item-tk").attr("hidden", "hidden");
        $(".mine-item-jd").attr("hidden", "hidden");
        $(".mine-item-pd").removeAttr("hidden")
    });
    $(".xz").click(function () {
        $(this).css("color", "#12a7ff");
        $(".pd").css("color", "#333333");
        $(".tk").css("color", "#333333");
        $(".jd").css("color", "#333333");
        $(".mine-item-pd").attr("hidden", "hidden");
        $(".mine-item-tk").attr("hidden", "hidden");
        $(".mine-item-jd").attr("hidden", "hidden");
        $(".mine-item-xz").removeAttr("hidden")
    });
    $(".tk").click(function () {
        $(this).css("color", "#12a7ff");
        $(".pd").css("color", "#333333");
        $(".xz").css("color", "#333333");
        $(".jd").css("color", "#333333");
        $(".mine-item-pd").attr("hidden", "hidden");
        $(".mine-item-xz").attr("hidden", "hidden");
        $(".mine-item-jd").attr("hidden", "hidden");
        $(".mine-item-tk").removeAttr("hidden")
    });
    $(".jd").click(function () {
        $(this).css("color", "#12a7ff");
        $(".pd").css("color", "#333333");
        $(".xz").css("color", "#333333");
        $(".tk").css("color", "#333333");
        $(".mine-item-pd").attr("hidden", "hidden");
        $(".mine-item-xz").attr("hidden", "hidden");
        $(".mine-item-tk").attr("hidden", "hidden");
        $(".mine-item-jd").removeAttr("hidden")
    });


    $(".release-homework").click(function () {
        $.ajax({
            url: "/homework/release/",
            type: "post",
            data: {
                "homeworkid": $(this).val(),
                "csrfmiddlewaretoken": $("input[name='csrfmiddlewaretoken']").val()
            },
            success: function (data) {
                if (data["status"] == "success") {
                    alert("发布成功");
                    window.location.href = "http://localhost:8000/mine/"
                } else {
                    alert("发布失败，请重新发布")
                }
            }
        })
    });
    $(".release-exam").click(function () {
        $.ajax({
            url: "/exam/release/",
            type: "post",
            data: {
                "examid": $(this).val(),
                "csrfmiddlewaretoken": $("input[name='csrfmiddlewaretoken']").val()
            },
            success: function (data) {
                if (data["status"] == "success") {
                    alert("发布成功");
                    window.location.href = "http://localhost:8000/mine/"
                } else {
                    alert("发布失败，请重新发布")
                }
            }
        })
    });
});

