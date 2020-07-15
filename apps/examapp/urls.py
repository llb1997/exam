from django.urls import path

from examapp.views import *

app_name = 'examapp'

urlpatterns = [
    path('', ExamView.as_view(), name='exam'),
    path('details/', ExamDetails.as_view(), name='details'),
    path('judge/', ExamJudge.as_view(), name='judge'),
    path('check/', ExamCheck.as_view(), name='check'),
    path('upload/', UploadExam.as_view(), name='upload'),
    path('addpd/', ExamAddPDQuestion.as_view(), name='addpd'),
    path('addxz/', ExamAddXZQuestion.as_view(), name='addxz'),
    path('addtk/', ExamAddTKQuestion.as_view(), name='addtk'),
    path('addjd/', ExamAddJDQuestion.as_view(), name='addjd'),
    path('release/', ExamRelease.as_view(), name='release'),
    path('correct_student/', ExamReleaseStudent.as_view(), name='correct_student'),
    path('correct/', ExamCorrect.as_view(), name='correct'),
    path('answer/', ExamAnswer.as_view(), name='answer'),
    path('modification/', ExamModification.as_view(), name='modification'),
    path('deletequestion/', ExamDeleteQuestion.as_view(), name='deletequestion'),
    path('deleteexam/', DeleteExam.as_view(), name='deleteexam'),
]
