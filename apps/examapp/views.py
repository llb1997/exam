
from django.core import serializers
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.shortcuts import render, redirect

# Create your views here.
from django.urls import reverse
from django.views import View

from examapp.models import *


class ExamView(View):

    def get(self, request):
        try:
            page_number = request.GET.get('page', default='1')
            number = request.session['user']['number']
            identity = request.session['user']['identity']
            # 挑选出已发布的所有考试
            if identity == 'student':
                specialty = StudentProfile.objects.filter(number=number).first().specialty
                all_exam = Exam.objects.filter(specialty=specialty).all()
            elif identity == 'teacher':
                all_exam = Exam.objects.filter(teacher_id=number, release=True).all()
            all_exam_list = []
            for h in all_exam:
                if h.examquestions_set.all():
                    all_exam_list.append(h)
            paginator = Paginator(all_exam_list, 10)  # 实例化分页器对象，第一个参数是数据源，第二个参数是每页显示的条数
            page = paginator.page(page_number)  # 返回page_number页的数据，以Page对象的方式封装该页数据
            return render(request, 'exam.html', locals())
        except Exception as e:
            print(e)
            return render(request, 'exam.html')

    def post(self, request):
        pass


# 该考试中的所有题目
class ExamDetails(View):

    def get(self, request):
        h_id = request.GET.get('list')
        questions = ExamQuestions.objects.filter(exam_id=h_id)  # 根据考试id挑选出当前考试的所有问题
        pd_list = []
        xz_list = []
        tk_list = []
        jd_list = []
        for q in questions:
            if q.question_type == 'pd':
                pd_list.append(q)
            elif q.question_type == 'xz':
                xz_list.append(q)
            elif q.question_type == 'tk':
                tk_list.append(q)
            elif q.question_type == 'jd':
                jd_list.append(q)
        return render(request, 'exam_details.html', locals())

    def post(self, request):
        pass


class ExamJudge(View):

    def get(self, request):
        pass

    def post(self, request):
        try:
            exam_id = request.POST.get('h')  # 获取考试id
            student_number = request.session['user']['number']  # 获取登录学生学号
            exam_student_score = ExamStudentScore.objects.filter(student_id=student_number,
                                                        exam_id=exam_id).first()  # 判断是否已提交考试
            if exam_student_score is None:  # 未提交才可执行
                exam_obj = Exam.objects.filter(id=exam_id)  # 根据考试id挑选出当前考试对象
                questions = ExamQuestions.objects.filter(exam=exam_obj.first()).all()  # 根据考试对象挑选出当前考试的所有问题
                exam_score = ExamSocre.objects.filter(exam=exam_obj.first()).first()
                pd = questions.filter(question_type='pd').all()  # 挑选出所有判断题
                xz = questions.filter(question_type='xz').all()  # 挑选出所有选择题
                tk = questions.filter(question_type='tk').all()  # 挑选出所有填空题
                jd = questions.filter(question_type='jd').all()  # 挑选出所有简答题
                pd_score = 0
                if exam_score is None:
                    exam_score = ExamSocre.objects.create(exam=exam_obj.first())  # 没有设置考试分数时
                for i, p in enumerate(pd):
                    pd_a = request.POST.get(str(p.id))  # 根据题目id获取学生的答案
                    pd_obj = pd[i]
                    if pd_obj.answer == pd_a:
                        pd_score += 1
                        # 添加做题日志
                        pd_log = ExamStudentAnswerLog.objects.create(student_id=student_number, exam_id=exam_id,
                                                                 question=pd_obj, answer=pd_a,
                                                                 score=exam_score.pd_score, question_type='pd')
                        pd_log.save()
                    else:
                        pd_score += 0
                        pd_log1 = ExamStudentAnswerLog.objects.create(student_id=student_number, exam_id=exam_id,
                                                                  question=pd_obj, answer=pd_a, score=0,
                                                                  question_type='pd')
                        pd_log1.save()
                pd_score *= exam_score.pd_score  # 判断题总分
                print("aaaa")

                xz_score = 0
                for j, x in enumerate(xz):
                    xz_a = request.POST.get(str(x.id))  # 根据题目id获取学生的答案
                    xz_obj = xz[j]
                    if xz_obj.answer == xz_a:
                        xz_score += 1
                        xz_log1 = ExamStudentAnswerLog.objects.create(student_id=student_number, exam_id=exam_id,
                                                                  question=xz_obj, answer=xz_a,
                                                                  score=exam_score.xz_score, question_type='xz')
                        xz_log1.save()
                    else:
                        xz_score += 0
                        xz_log2 = ExamStudentAnswerLog.objects.create(student_id=student_number, exam_id=exam_id,
                                                                  question=xz_obj, answer=xz_a, score=0,
                                                                  question_type='xz')
                        xz_log2.save()
                xz_score *= exam_score.xz_score  # 选择题总分

                for q, n in enumerate(tk):
                    tk_a = request.POST.get(str(n.id))  # 根据题目id获取学生的答案
                    tk_obj = tk[q]
                    tk_log = ExamStudentAnswerLog.objects.create(student_id=student_number, exam_id=exam_id,
                                                             question=tk_obj, answer=tk_a, question_type='tk')
                    tk_log.save()

                for k, j in enumerate(jd):
                    jd_a = request.POST.get(str(j.id))  # 根据题目id获取学生的答案
                    jd_obj = jd[k]
                    jd_log = ExamStudentAnswerLog.objects.create(student_id=student_number, exam_id=exam_id,
                                                             question=jd_obj, answer=jd_a, question_type='jd')
                    jd_log.save()
                total = pd_score + xz_score  # 判断题加选择分数
                s = ExamStudentScore.objects.create(student_id=student_number, exam=exam_obj.first(),
                                                pd_score=pd_score, xz_score=xz_score, total=total)

                if s:
                    s.save()
                    exam_update_obj = exam_obj.update(answer_nums=int(exam_obj.first().answer_nums) + 1)
                    return redirect(reverse('exam:exam'))
            else:
                return redirect(reverse('exam:exam'))

        except Exception as e:
            print(e)
            return redirect(reverse('exam:exam'))


# 检查学生是否已提交考试
class ExamCheck(View):

    def get(self, request):
        exam_id = request.GET.get('h')  # 获取考试id
        number = request.session['user']['number']  # 获取已登录学生id
        s = ExamStudentScore.objects.filter(student_id=number, exam_id=exam_id)  # 判断是否已提交考试
        if s:
            return JsonResponse({'status': True})
        else:
            return JsonResponse({'status': False})

    def post(self, request):
        pass


# 增加考试
class UploadExam(View):

    def get(self, request):
        pass

    def post(self, request):
        try:
            exam_name = request.POST.get('exam-name')
            exam_desc = request.POST.get('exam-desc')
            specialty = request.POST.get('exam-specialty-select')
            teacher = request.session['user']['number']
            if exam_desc == '':
                exam_desc = '无'
            exam_obj = Exam.objects.create(name=exam_name, describe=exam_desc,
                                                   teacher_id=teacher, specialty_id=specialty)
            if exam_obj:
                exam_obj.save()
                return JsonResponse({'status': 'success'})
            else:
                exam_obj.delete()
                return JsonResponse({'status': 'error'})
        except Exception as e:
            print(e)
            return JsonResponse({'status': 'error'})


# 增加判断题
class ExamAddPDQuestion(View):

    def get(self, request):
        pass

    def post(self, request):
        try:
            exam_id = request.POST.get('exam')
            pd_examquestion = request.POST.get('pd-examquestion')
            pd_examanswer = request.POST.get('pd-examanswer')
            teacher = request.session['user']['number']
            questions_obj = ExamQuestions.objects.create(exam_id=exam_id, teacher_id=teacher, question_type='pd',
                                                     context=pd_examquestion, choice_a='', choice_b='',
                                                     choice_c='', choice_d='', answer=pd_examanswer)
            if questions_obj:
                questions_obj.save()
                return JsonResponse({'status': 'success'})
            else:
                questions_obj.delete()
                return JsonResponse({'status': 'error'})
        except Exception as e:
            print(e)
            return JsonResponse({'status': 'error'})


# 增加选择题
class ExamAddXZQuestion(View):

    def get(self, request):
        pass

    def post(self, request):
        try:
            exam_id = request.POST.get('exam')
            xz_examquestion = request.POST.get('xz-examquestion')  # 获取题目
            xz_examanswer_A = request.POST.get('xz-examanswer-A')  # 获取选项内容
            xz_examanswer_B = request.POST.get('xz-examanswer-B')
            xz_examanswer_C = request.POST.get('xz-examanswer-C')
            xz_examanswer_D = request.POST.get('xz-examanswer-D')
            xz_examanswer = request.POST.get('xz-examanswer')  # 获取答案
            teacher = request.session['user']['number']
            questions_obj = ExamQuestions.objects.create(exam_id=exam_id, teacher_id=teacher, question_type='xz',
                                                     context=xz_examquestion, choice_a=xz_examanswer_A, choice_b=xz_examanswer_B,
                                                     choice_c=xz_examanswer_C, choice_d=xz_examanswer_D, answer=xz_examanswer)
            if questions_obj:
                questions_obj.save()
                return JsonResponse({'status': 'success'})
            else:
                questions_obj.delete()
                return JsonResponse({'status': 'error'})
        except Exception as e:
            return JsonResponse({'status': 'error'})


# 增加填空题
class ExamAddTKQuestion(View):

    def get(self, request):
        pass

    def post(self, request):
        try:
            exam_id = request.POST.get('exam')
            tk_examquestion = request.POST.get('tk-examquestion')
            tk_examanswer = request.POST.get('tk-examanswer')
            teacher = request.session['user']['number']
            questions_obj = ExamQuestions.objects.create(exam_id=exam_id, teacher_id=teacher, question_type='tk',
                                                     context=tk_examquestion, choice_a='', choice_b='',
                                                     choice_c='', choice_d='', answer=tk_examanswer)
            if questions_obj:
                questions_obj.save()
                return JsonResponse({'status': 'success'})
            else:
                questions_obj.delete()
                return JsonResponse({'status': 'error'})
        except Exception as e:
            return JsonResponse({'status': 'error'})

# 增加简答题
class ExamAddJDQuestion(View):

    def get(self, request):
        pass

    def post(self, request):
        try:
            exam_id = request.POST.get('exam')
            jd_examquestion = request.POST.get('jd-examquestion')
            jd_examanswer = request.POST.get('jd-examanswer')
            teacher = request.session['user']['number']
            questions_obj = ExamQuestions.objects.create(exam_id=exam_id, teacher_id=teacher, question_type='jd',
                                                     context=jd_examquestion, choice_a='', choice_b='',
                                                     choice_c='', choice_d='', answer=jd_examanswer)
            if questions_obj:
                questions_obj.save()
                return JsonResponse({'status': 'success'})
            else:
                questions_obj.delete()
                return JsonResponse({'status': 'error'})
        except Exception as e:
            return JsonResponse({'status': 'error'})

# 发布考试
class ExamRelease(View):

    def get(self, request):
        pass

    def post(self, request):
        try:
            exam_id = request.POST.get('examid')
            exam_obj = Exam.objects.filter(id=exam_id)
            if exam_obj:
                exam_update_obj = exam_obj.update(release=1)
                if exam_update_obj:
                    return JsonResponse({'status': 'success'})
                else:
                    return JsonResponse({'status': 'error'})
            else:
                return JsonResponse({'status': 'error'})
        except Exception as e:
            print(e)
            return JsonResponse({'status': 'error'})


# 获取已提交考试的学生
class ExamReleaseStudent(View):

    def get(self, request):
        exam_id = request.GET.get('exam-id')
        studentscore = ExamStudentScore.objects.filter(exam_id=int(exam_id)).all()
        data = []
        for s in studentscore:
            sp = StudentProfile.objects.filter(number=s.student_id).first()
            data.append(sp)
        return JsonResponse({'data': serializers.serialize('json', data)})

    def post(self, request):
        pass


# 批改简答题
class ExamCorrect(View):

    def get(self, request):
        student_id = request.GET.get('studentid')
        exam_id = request.GET.get('examid')
        SAL_obj = ExamStudentAnswerLog.objects.filter(student_id=student_id, exam_id=exam_id)
        pd_list = []
        xz_list = []
        tk_list = []
        jd_list = []
        for sal in SAL_obj:
            if sal.question_type == 'pd':
                pd_list.append(sal)
            elif sal.question_type == 'xz':
                xz_list.append(sal)
            elif sal.question_type == 'tk':
                tk_list.append(sal)
            elif sal.question_type == 'jd':
                jd_list.append(sal)
        return render(request, 'exam_correct.html', locals())

    def post(self, request):
        try:
            studentid = request.POST.get('studentid')
            exam_id = request.POST.get('examid')
            all_studentanswerlog = ExamStudentAnswerLog.objects.filter(student_id=studentid,
                                                                   exam_id=exam_id).all()  # 获取学生答题记录对象
            tk_score = 0  # 填空题总分
            for p, q in enumerate(all_studentanswerlog):
                if q.question_type == 'tk':
                    tid = request.POST.get(str(q.question_id))
                    tscore = request.POST.get('score' + str(q.question_id))  # 接收所得分数
                    question_obj = all_studentanswerlog.filter(question_id=tid)  # 获取题目对象
                    if question_obj:
                        question_update_obj = question_obj.update(score=tscore)  # 更新填空分数
                        tk_score += int(tscore)

            jd_score = 0  # 简答题总分
            for i, s in enumerate(all_studentanswerlog):
                if s.question_type == 'jd':
                    qid = request.POST.get(str(s.question_id))
                    qscore = request.POST.get('score' + str(s.question_id))  # 接收所得分数
                    question_obj = all_studentanswerlog.filter(question_id=qid)  # 获取题目对象
                    if question_obj:
                        question_update_obj = question_obj.update(score=qscore)  # 更新简答题分数
                        jd_score += int(qscore)
            
            studentscore_obj = ExamStudentScore.objects.filter(student_id=studentid, exam_id=exam_id)  # 获取学生分数对象
            if studentscore_obj:
                studentscore_update_obj = studentscore_obj.update(tk_score=tk_score,jd_score=jd_score)
                if studentscore_update_obj:
                    studentscore = studentscore_obj.first()
                    studentscore_update_obj = studentscore_obj.update(
                        total=int(studentscore.pd_score) + int(studentscore.xz_score) + int(studentscore.tk_score)+ int(studentscore.jd_score),
                        correct=1)  # 更新考试总分和公布答案
            return redirect(reverse('exam:exam'))
        except Exception as e:
            print(e)
            return redirect(reverse('mine:mine'))


# 公布答案
class ExamAnswer(View):

    def get(self, request):
        exam_id = request.GET.get('hid')
        student_id = request.session['user']['number']
        questions_obj = ExamQuestions.objects.filter(exam_id=exam_id)
        examstudentanswerlog_obj = ExamStudentAnswerLog.objects.filter(exam_id=exam_id, student_id=student_id)
        pd_list = []  # 正确答案
        xz_list = []
        tk_list = []
        jd_list = []
        my_pd_list = []  # 我的答案
        my_xz_list = []
        my_tk_list = []
        my_jd_list = []
        for question in questions_obj:
            my_answer = examstudentanswerlog_obj.filter(question_id=question.id).first().answer
            if question.question_type == 'pd':
                pd_list.append(question)  # 题目及答案
                my_pd_list.append(my_answer)  # 学生答案
            elif question.question_type == 'xz':
                xz_list.append(question)
                my_xz_list.append(my_answer)
            elif question.question_type == 'tk':
                tk_list.append(question)
                my_tk_list.append(my_answer)
            elif question.question_type == 'jd':
                jd_list.append(question)
                my_jd_list.append(my_answer)
        return render(request, 'examanswer.html', locals())

    def post(self, request):
        pass


# 修改题目
class ExamModification(View):

    def get(self, request):
        exam_id = request.GET.get('id')
        questions_obj = ExamQuestions.objects.filter(exam_id=exam_id).all()
        pd_question_list = []
        xz_question_list = []
        tk_question_list = []
        jd_question_list = []
        for question in questions_obj:
            if question.question_type == 'pd':
                pd_question = []
                pd_question.extend((question.id, question.context, question.answer))
                pd_question_list.append(pd_question)
            elif question.question_type == 'xz':
                xz_question = []
                xz_question.extend((question.id, question.context, question.choice_a, question.choice_b,
                                    question.choice_c, question.choice_d, question.answer))
                xz_question_list.append(xz_question)

            elif question.question_type == 'tk':
                tk_question = []
                tk_question.extend((question.id, question.context, question.answer))
                tk_question_list.append(tk_question)

            elif question.question_type == 'jd':
                jd_question = []
                jd_question.extend((question.id, question.context, question.answer))
                jd_question_list.append(jd_question)
        return render(request, 'exam_modification.html', locals())

    def post(self, request):
        exam_id = request.POST.get('exam-id')
        questions = ExamQuestions.objects.filter(exam_id=exam_id)
        for key in request.POST:
            if key.isdigit():
                question = questions.filter(id=key)
                if question.first().question_type == 'pd':
                    q = question.first()
                    if request.POST.get(key) != q.context or request.POST.get('answer' + key) != q.answer:
                        question.update(id=key, context=request.POST.get(key), answer=request.POST.get('answer' + key))
                elif question.first().question_type == 'xz':
                    q = question.first()
                    if request.POST.get(key) != q.context or request.POST.get(
                            'question' + key + "1") != q.choice_a or request.POST.get(
                        'question' + key + "2") != q.choice_a or request.POST.get(
                        'question' + key + "3") != q.choice_a or request.POST.get(
                        'question' + key + "4") != q.choice_a or request.POST.get('answer' + key) != q.answer:
                        question.update(id=key, context=request.POST.get(key), choice_a=request.POST.get(
                            'question' + key + "1"), choice_b=request.POST.get(
                            'question' + key + "2"), choice_c=request.POST.get(
                            'question' + key + "3"), choice_d=request.POST.get(
                            'question' + key + "4"), answer=request.POST.get('answer' + key))
                elif question.first().question_type == 'tk':
                    t = question.first()
                    if request.POST.get(key) != t.context or request.POST.get('answer' + key) != t.answer:
                        question.update(id=key, context=request.POST.get(key), answer=request.POST.get('answer' + key))

                elif question.first().question_type == 'jd':
                    q = question.first()
                    if request.POST.get(key) != q.context or request.POST.get('answer' + key) != q.answer:
                        question.update(id=key, context=request.POST.get(key), answer=request.POST.get('answer' + key))
        return redirect(reverse('mine:mine'))


# 删除问题
class ExamDeleteQuestion(View):

    def get(self, request):
        pass

    def post(self, request):
        try:
            exam_id = request.POST.get('exam-id')
            question_id = request.POST.get("question-id")
            question_delete_obj = ExamQuestions.objects.filter(exam_id=exam_id, id=question_id).delete()
            print(question_delete_obj)
            if question_delete_obj[1]:
                return JsonResponse({"status": "success"})
            else:
                return JsonResponse({"status": "error"})
        except Exception as e:
            print('DeleteQuestion error:', e)
            return JsonResponse({"status": "error"})


# 删除考试
class DeleteExam(View):

    def get(self, request):
        pass

    def post(self, request):
        try:
            exam_id = request.POST.get('exam-id')
            exam_delete_obj = Exam.objects.filter(id=exam_id).delete()
            if exam_delete_obj[1]:
                return JsonResponse({'status': 'success'})
            else:
                return JsonResponse({'status': 'error'})
        except Exception as e:
            print('DeleteExam error:', e)
            return JsonResponse({'status': 'error'})
