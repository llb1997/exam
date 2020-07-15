# -*- coding: utf-8 -*-
import xadmin
from examapp.models import *


class ExamAdmin:
    list_display = ['name','describe', 'add_time', 'answer_nums', 'teacher', 'release']  # 设置列表可显示的字段
    list_per_page = 10  # 每页显示条目数
    ordering = ('name', '-add_time',)  # 按发布日期排序
    model_icon = 'fa fa-book'


class ExamQuestionsAdmin:
    list_display = ['exam', 'question_type', 'context', 'answer', 'add_time', 'teacher']
    list_per_page = 10
    ordering = ('exam', '-add_time')
    model_icon = 'fa fa-question-circle'


class ExamSocreAdmin:
    list_display = ['exam', 'pd_score', 'xz_score', 'tk_score', 'jd_score']
    list_per_page = 10
    ordering = ('exam',)
    model_icon = 'fa fa-star'


class ExamStudentAnswerLogAdmin:
    list_display = ['student', 'exam', 'question', 'answer', 'score']
    list_per_page = 10
    ordering = ('student', '-score')
    model_icon = 'fa fa-tags'


class ExamStudentScoreAdmin:
    list_display = ['student', 'exam', 'pd_score', 'xz_score', 'tk_score','jd_score', 'total', 'add_time']
    list_filter = ('add_time',)
    list_per_page = 10
    ordering = ('student', '-total', '-add_time')
    model_icon = 'fa fa-star-half-o'


xadmin.site.register(Exam, ExamAdmin)
xadmin.site.register(ExamQuestions, ExamQuestionsAdmin)
xadmin.site.register(ExamSocre, ExamSocreAdmin)
xadmin.site.register(ExamStudentAnswerLog, ExamStudentAnswerLogAdmin)
xadmin.site.register(ExamStudentScore, ExamStudentScoreAdmin)
